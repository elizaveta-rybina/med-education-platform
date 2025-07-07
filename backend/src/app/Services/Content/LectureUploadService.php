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
    public function processDocFile(array $data)
    {
        $file = $data['doc_file'];
        $lecture = Lecture::findOrFail($data['lecture_id']);

        $phpWord = IOFactory::load($file->getRealPath(), 'Word2007');

        // Сохраняем как HTML во временный файл
        $htmlPath = storage_path('app/temp_' . uniqid() . '.html');
        IOFactory::createWriter($phpWord, 'HTML')->save($htmlPath);

        $html = file_get_contents($htmlPath);
        unlink($htmlPath);

        // Добавляем новый контент к существующему
        $newContent = $lecture->content . $html;

        // Обновляем лекцию с новым HTML-контентом
        $lecture->update([
            'content' => $newContent,
            'content_type' => 'html',
        ]);

        // Сохраняем вложения и обновляем ссылки в HTML
        $htmlWithUpdatedImages = $this->extractAndStoreImages($file, $lecture->id, $newContent);

        // Обновляем лекцию с новым HTML, где ссылки на изображения заменены
        $lecture->update([
            'content' => $htmlWithUpdatedImages
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
