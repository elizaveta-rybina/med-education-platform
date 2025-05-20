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
