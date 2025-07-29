import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

interface LessonProps {
  markdownPath: string;
}

const Lesson: React.FC<LessonProps> = ({ markdownPath }) => {
  const [staticMarkdownContent, setStaticMarkdownContent] = useState('');
  const [instructions, setInstructions] = useState<any[]>([]);
  const [activeHint, setActiveHint] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    const cacheBuster = new Date().getTime();
    console.log(`Lesson: Attempting to fetch markdown from: ${markdownPath}?${cacheBuster}`);
    fetch(`${markdownPath}?${cacheBuster}`, { cache: 'no-store' })
      .then((res) => {
        console.log(`Lesson: Fetch response status for ${markdownPath}: ${res.status}`);
        if (!res.ok) {
          console.error(`Lesson: Fetch failed for ${markdownPath}: ${res.statusText}`);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        console.log(`Lesson: Markdown fetched successfully for ${markdownPath}. Content length: ${text.length}`);
        const parts = text.split('### Instructions');
        const staticContent = parts[0];
        const instructionsText = parts.length > 1 ? parts[1] : '';

        setStaticMarkdownContent(staticContent);

        // Corrected: Escaping backticks for string literal in RegExp constructor
        const instructionRegex = new RegExp("^-   ([^\\n]+)(?:\\n\\s*Hint:\\s*(.*))?", "gm");
        const parsedInstructions = Array.from(instructionsText.matchAll(instructionRegex)).map(
          (match) => ({ text: match[1].trim(), hint: `<code>${match[2]}</code>` }),
        );
        setInstructions(parsedInstructions);
        setCheckedItems(new Array(parsedInstructions.length).fill(false));
      });
  }, [markdownPath]);

  const handleCheckboxClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const applySyntaxHighlightingToHint = (text: string) => {
    return text.replace(/<code>(.*?)<\/code>/g, (match, codeContent) => {
        const keywords = `\\b(contract|string|public|uint|bool|true|false|uint8|uint256|address|mapping)\\b`;
        // Corrected: Proper escaping for string literal in RegExp constructor
        const comments = "(\\\\/\\\/.*)";
        const strings = `(".*?")`;
        const numbers = `\\b([0-9]+)\\b`;
        const regex = new RegExp(
          `(${keywords})|(${comments})|(${strings})|(${numbers})`,
          "g",
        );
        const highlighted = codeContent.replace(
          regex,
          (m: string, p1: string, p2: string, p3: string, p4: string) => {
            if (p1) return `<span class="hl-keyword">${p1}<\/span>`;
            if (p2) return `<span class="hl-comment">${p2}<\/span>`;
            if (p3) return `<span class="hl-string">${p3}<\/span>`;
            if (p4) return `<span class="hl-number">${p4}<\/span>`;
            return m;
          },
        );
        return `<pre style="margin:0; background:transparent; padding:0; font-family: inherit; font-size: inherit; line-height: 1.5;"><code>${highlighted}<\/code><\/pre>`;
    });
  };

  return (
    <div className="lesson-instructions markdown-body">
      <ReactMarkdown>{staticMarkdownContent}</ReactMarkdown>

      <h3>Instructions</h3>
      <ul className="instruction-list">
          {instructions.map((item, index) => (
              <li key={index}>
                  <span className={`instruction-checkbox ${checkedItems[index] ? 'checked' : ''}`} onClick={() => handleCheckboxClick(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div className="flex-1">
                      <div className="flex items-center w-full">
                          <div className="flex-1" dangerouslySetInnerHTML={{ __html: item.text }} />
                          <button onClick={() => setActiveHint(activeHint === index ? null : index)} className="hint-button">Hint</button>
                      </div>
                      {activeHint === index && (
                          <div className="hint-box">
                              <p className="text-base" dangerouslySetInnerHTML={{ __html: applySyntaxHighlightingToHint(item.hint) }} />
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