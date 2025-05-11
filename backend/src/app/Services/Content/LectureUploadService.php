<?php

namespace App\Services\Content;

use App\Models\Content\LectureAttachment;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use League\HTMLToMarkdown\HtmlConverter;
use Illuminate\Support\Str;
use ZipArchive;

class LectureUploadService
{
    public function __construct(
        protected LectureService $lectureService,
    ) {}

    public function processDocFile(array $data)
    {
        $file = $data['doc_file'];
        $phpWord = IOFactory::load($file->getRealPath(), 'Word2007');

        // Сохраняем как HTML во временный файл
        $htmlPath = storage_path('app/temp_' . uniqid() . '.html');
        IOFactory::createWriter($phpWord, 'HTML')->save($htmlPath);

        $html = file_get_contents($htmlPath);
        unlink($htmlPath);

        // Создаем лекцию с HTML-контентом
        $lecture = $this->lectureService->create([
            'topic_id' => $data['topic_id'],
            'title' => $data['title'],
            'content' => $html, // Сохраняем чистый HTML
            'content_type' => 'html',
            'order_number' => $data['order_number'],
        ]);

        // Сохраняем вложения и обновляем ссылки в HTML
        $htmlWithUpdatedImages = $this->extractAndStoreImages($file, $lecture->id, $html);

        // Обновляем лекцию с новым HTML, где ссылки на изображения заменены
        $lecture->update([
            'content' => $htmlWithUpdatedImages
        ]);

        return $lecture;
    }

    protected function extractAndStoreImages($file, int $lectureId, string $html): string
    {
        $zip = new ZipArchive;
        if ($zip->open($file->getRealPath()) === true) {
            $mediaDir = 'word/media/';
            $mediaFiles = [];

            // Извлекаем все изображения из папки word/media/
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $entry = $zip->getNameIndex($i);
                if (strpos($entry, $mediaDir) === 0) {
                    $mediaFiles[] = $entry;
                }
            }

            // Сохраняем изображения в хранилище
            foreach ($mediaFiles as $mediaFile) {
                $imageContent = $zip->getFromName($mediaFile);
                $extension = pathinfo($mediaFile, PATHINFO_EXTENSION);
                $fileName = Str::random(40) . '.' . $extension;
                $filePath = 'lectures/images/' . $fileName;

                Storage::disk('public')->put($filePath, $imageContent);

                // Получаем URL для доступа к изображению
                $imageUrl = Storage::disk('public')->url($filePath);

                // Получаем оригинальное имя файла из архива
                $originalName = basename($mediaFile);

                // Заменяем в HTML ссылки на изображения
                $html = str_replace(
                    'src="' . $mediaDir . $originalName . '"',
                    'src="' . $imageUrl . '"',
                    $html
                );

                // Создаем запись о вложении
                LectureAttachment::create([
                    'lecture_id' => $lectureId,
                    'file_name' => $fileName,
                    'file_path' => $filePath,
                    'file_type' => mime_content_type(Storage::disk('public')->path($filePath)),
                    'file_size' => Storage::disk('public')->size($filePath),
                ]);
            }

            $zip->close();
        }

        return $html;
    }
}
