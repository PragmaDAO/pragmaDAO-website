import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownLessonProps {
  markdownPath: string;
}

const MarkdownLesson: React.FC<MarkdownLessonProps> = ({ markdownPath }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownPath)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch((error) => console.error('Error fetching markdown:', error));
  }, [markdownPath]);

  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownLesson;
