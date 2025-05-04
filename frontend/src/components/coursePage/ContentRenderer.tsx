import { ContentBlock, ContentBlockData } from 'data/content'
import React from 'react'
import { TextContent, MediaContent, QuizQuestion } from 'data/content';

interface ContentRendererProps {
  block: ContentBlock;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ block }) => {
  const renderContent = (data: ContentBlockData) => {
    if (!data) return null;

    switch (block.type) {
      case 'text':
        const textData = data as TextContent;
        return (
          <div className="text-block">
            <p>{textData.text}</p>
            {textData.subblocks?.map((subblock, index) => (
              <div key={index}>
                {subblock.type === 'list' && (
                  <ul>
                    {subblock.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {subblock.type === 'quote' && (
                  <blockquote>
                    <p>{subblock.content}</p>
                    {subblock.author && <cite>- {subblock.author}</cite>}
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        );

      case 'image':
        const imageData = data as MediaContent;
        return (
          <figure>
            <img src={imageData.url} alt={imageData.alt} />
            {imageData.caption && <figcaption>{imageData.caption}</figcaption>}
          </figure>
        );

      case 'video':
        const videoData = data as MediaContent;
        return (
          <div className="video-container">
            <video controls src={videoData.url} />
            {videoData.caption && <p>{videoData.caption}</p>}
          </div>
        );

      case 'quiz':
        const quizData = data as QuizQuestion;
        return (
          <div className="quiz-block">
            <h3>{quizData.question}</h3>
            <ul>
              {quizData.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        );

      case 'divider':
        return <hr />;

      default:
        return null;
    }
  };

  return <div className="content-block">{renderContent(block.data)}</div>;
};

export default ContentRenderer;