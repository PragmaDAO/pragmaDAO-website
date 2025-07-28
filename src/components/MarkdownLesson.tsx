import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownLessonProps {
  markdownPath: string;
}

const MarkdownLesson: React.FC<MarkdownLessonProps> = ({ markdownPath }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    console.log('MarkdownLesson: Fetching markdown from:', markdownPath);
    fetch(markdownPath)
      .then((response) => {
        console.log('MarkdownLesson: Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log('MarkdownLesson: Markdown fetched successfully.');
        setMarkdown(text);
      })
      .catch((error) => console.error('MarkdownLesson: Error fetching markdown:', error));
  }, [markdownPath]);

  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownLesson;
