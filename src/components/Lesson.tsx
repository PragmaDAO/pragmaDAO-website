import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LessonProps {
  markdownContent: string;
}

const Lesson: React.FC<LessonProps> = ({ markdownContent }) => {
  const [staticMarkdownContent, setStaticMarkdownContent] = useState('');
  const [instructions, setInstructions] = useState<any[]>([]);
  const [activeHint, setActiveHint] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (markdownContent) {
        const parts = markdownContent.split('### Instructions');
        const staticContent = parts[0];
        const instructionsText = parts.length > 1 ? parts[1] : '';

        setStaticMarkdownContent(staticContent);

        const instructionRegex = new RegExp("^-   ([^\\n]+)(?:\\n\\s*Hint:\\s*(.*))?", "gm");
        const parsedInstructions = Array.from(instructionsText.matchAll(instructionRegex)).map(
          (match) => ({ text: match[1].trim(), hint: match[2] || '' }),
        );
        setInstructions(parsedInstructions);
        setCheckedItems(new Array(parsedInstructions.length).fill(false));
    }
  }, [markdownContent]);

  const handleCheckboxClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="lesson-instructions markdown-body flex-1">
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={{ ...vscDarkPlus, 'code[class*="language-"]': { ...vscDarkPlus['code[class*="language-"]'], background: '#161b22' }, 'pre[class*="language-"]': { ...vscDarkPlus['pre[class*="language-"]'], background: '#161b22' } }}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code>
                {children}
              </code>
            );
          },
        }}
      >
        {staticMarkdownContent}
      </ReactMarkdown>

      <h3>Instructions</h3>
      <ul className="instruction-list">
        {instructions.map((item, index) => (
          <li key={index}>
            <span
              className={`instruction-checkbox ${checkedItems[index] ? 'checked' : ''}`}
              onClick={() => handleCheckboxClick(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <div className="flex-1">
              <div className="flex items-center w-full">
                <div
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                <button
                  onClick={() => setActiveHint(activeHint === index ? null : index)}
                  className="hint-button"
                >
                  Hint
                </button>
              </div>
              {activeHint === index && (
                <div className="hint-box">
                  <SyntaxHighlighter language="solidity" style={{ ...vscDarkPlus, 'code[class*="language-"]': { ...vscDarkPlus['code[class*="language-"]'], background: '#161b22' }, 'pre[class*="language-"]': { ...vscDarkPlus['pre[class*="language-"]'], background: '#161b22' } }}>
                    {item.hint}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lesson;
