<?php

namespace App\Services\Content;

use App\Models\Content\Lecture;
use App\Models\Content\LectureAttachment;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use League\HTMLToMarkdown\HtmlConverter;
use Illuminate\Support\Str;
use ZipArchive;

class LectureUploadService
{
    public function processDocFile(Lecture $lecture, \Illuminate\Http\UploadedFile $file)
    {
        if (!$file->isValid()) {
            throw new \RuntimeException('Файл не был загружен корректно');
        }
        $phpWord = IOFactory::load($file->getRealPath(), 'Word2007');

        // Сохраняем как HTML во временный файл
        $htmlPath = storage_path('app/temp_' . uniqid() . '.html');
        IOFactory::createWriter($phpWord, 'HTML')->save($htmlPath);

        $html = file_get_contents($htmlPath);
        unlink($htmlPath);

        // Добавляем HTML к существующему контенту
        $newContent = $lecture->content . $html;

        // Обновляем лекцию
        $lecture->update([
            'content' => $newContent,
            'content_type' => 'html',
        ]);

        // Обработка и сохранение изображений
        $htmlWithUpdatedImages = $this->extractAndStoreImages($file, $lecture->id, $newContent);

        // Обновляем контент ещё раз, уже с новыми ссылками
        $lecture->update([
            'content' => $htmlWithUpdatedImages,
        ]);

        return $lecture;
    }

    protected function extractAndStoreImages($file, int $lectureId, string $html): string
    {
        // Найдём все base64-изображения
        $matches = [];
        preg_match_all('/<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/i', $html, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $extension = $match[1];
            $base64 = $match[2];

            $imageContent = base64_decode($base64);
            $fileName = Str::random(40) . '.' . $extension;
            $filePath = 'lectures/images/' . $fileName;

            // Сохраняем файл
            Storage::disk('public')->put($filePath, $imageContent);
            $imageUrl = Storage::disk('public')->url($filePath);

            // Заменяем в HTML ссылку на новую
            $html = str_replace($match[0], '<img src="' . $imageUrl . '" />', $html);

            // Сохраняем как вложение
            LectureAttachment::create([
                'lecture_id' => $lectureId,
                'file_name' => $fileName,
                'file_path' => $filePath,
                'file_type' => mime_content_type(Storage::disk('public')->path($filePath)),
                'file_size' => Storage::disk('public')->size($filePath),
            ]);
        }

        return $html;
    }
}
