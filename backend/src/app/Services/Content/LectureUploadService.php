<?php

namespace App\Services\Content;

use App\Models\Content\Lecture;
use App\Models\Content\LectureAttachment;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use DOMDocument;

class LectureUploadService
{
    /**
     * Обрабатывает загруженный DOCX-файл и добавляет его содержимое в лекцию.
     *
     * @param Lecture $lecture
     * @param \Illuminate\Http\UploadedFile $file
     * @return Lecture
     * @throws \RuntimeException
     */
    public function processDocFile(Lecture $lecture, \Illuminate\Http\UploadedFile $file): Lecture
    {
        if (!$file->isValid()) {
            throw new \RuntimeException('Файл не был загружен корректно');
        }

        try {
            // Загружаем DOCX
            $phpWord = IOFactory::load($file->getRealPath(), 'Word2007');

            // Сохраняем как HTML во временный файл
            $tempFile = tempnam(sys_get_temp_dir(), 'lecture_') . '.html';
            IOFactory::createWriter($phpWord, 'HTML')->save($tempFile);

            $html = file_get_contents($tempFile);
            if ($html === false) {
                throw new \RuntimeException('Не удалось прочитать временный HTML-файл');
            }

            // Удаляем временный файл
            if (file_exists($tempFile)) {
                unlink($tempFile);
            }

            // Обработка изображений
            $htmlWithUpdatedImages = $this->extractAndStoreImages($file, $lecture->id, $html);

            // Обновляем лекцию в транзакции
            DB::transaction(function () use ($lecture, $htmlWithUpdatedImages) {
                $lecture->update([
                    'content' => $lecture->content . $htmlWithUpdatedImages,
                    'content_type' => 'html',
                ]);
            });

            return $lecture;
        } catch (\Exception $e) {
            Log::error('Ошибка обработки DOCX-файла: ' . $e->getMessage());
            throw new \RuntimeException('Не удалось обработать файл лекции');
        }
    }

    /**
     * Извлекает изображения из HTML и сохраняет их в хранилище.
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param int $lectureId
     * @param string $html
     * @return string
     */
    protected function extractAndStoreImages($file, int $lectureId, string $html): string
    {
        $doc = new DOMDocument();
        @$doc->loadHTML($html); // @ для подавления предупреждений о невалидном HTML
        $images = $doc->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');
            if (strpos($src, 'data:image/') !== 0) {
                continue;
            }

            // Извлекаем тип и данные base64
            if (preg_match('/data:image\/([^;]+);base64,(.+)/', $src, $matches)) {
                $extension = $matches[1];
                $base64 = $matches[2];

                $imageContent = base64_decode($base64);
                if ($imageContent === false) {
                    Log::warning('Не удалось декодировать изображение base64 для лекции ID ' . $lectureId);
                    continue;
                }

                // Генерируем имя файла
                $fileName = Str::random(40) . '.' . $extension;
                $filePath = 'lectures/images/' . $fileName;

                // Сохраняем изображение
                Storage::disk('public')->put($filePath, $imageContent);
                $imageUrl = Storage::disk('public')->url($filePath);

                // Заменяем src в HTML
                $html = str_replace($src, $imageUrl, $html);

                // Сохраняем как вложение
                DB::transaction(function () use ($lectureId, $fileName, $filePath) {
                    LectureAttachment::create([
                        'lecture_id' => $lectureId,
                        'file_name' => $fileName,
                        'file_path' => $filePath,
                        'file_type' => mime_content_type(Storage::disk('public')->path($filePath)),
                        'file_size' => Storage::disk('public')->size($filePath),
                    ]);
                });
            }
        }

        return $html;
    }
}
