import React, { useState } from "react";
import SolidityEditor from "../components/SolidityEditor";
import MarkdownLesson from "../components/MarkdownLesson";

import { CompiledOutput, TestCase, AbiItem } from "../types";

const LessonVariables: React.FC<{ setCurrentPage: (page: string) => void }> = ({
  setCurrentPage,
}) => {
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [activeHint, setActiveHint] = useState<number | null>(null);

  const handleCheckboxClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const runTests = () => {
    if (!compiledResult || compiledResult.errors) {
      setTestResults([
        {
          description: "Compilation must pass before tests can run.",
          passed: false,
        },
      ]);
      return;
    }
    const contract = compiledResult.contracts["contract.sol"]?.VariableTypes;
    if (!contract) {
      setTestResults([
        { description: "Contract 'VariableTypes' not found.", passed: false },
      ]);
      return;
    }
    const abi = contract.abi;
    const myUint = abi.find((v: AbiItem) => v.name === "myUint");
    const myString = abi.find((v: AbiItem) => v.name === "myString");
    const myBool = abi.find((v: AbiItem) => v.name === "myBool");

    setTestResults([
      {
        description: "Contract must be named 'VariableTypes'",
        passed: !!contract,
      },
      {
        description: "A public uint variable named 'myUint' exists",
        passed: !!myUint && myUint.outputs[0].type === "uint256",
      },
      {
        description: "A public string variable named 'myString' exists",
        passed: !!myString && myString.outputs[0].type === "string",
      },
      {
        description: "A public bool variable named 'myBool' exists",
        passed: !!myBool && myBool.outputs[0].type === "bool",
      },
    ]);
  };

  const instructions = [
    {
      text: `Define a contract named <code>VariableTypes</code>.`,
      hint: `<code>contract VariableTypes {\n    // add your code here\n}</code>`,
    },
    {
      text: `Create a public <code>uint</code> variable named <code>myUint</code> and set it to <code>123</code>.`,
      hint: `<code>uint public myUint = 123;</code>`,
    },
    {
      text: `Create a public <code>string</code> variable named <code>myString</code> and set it to <code>"Pragma"</code>.`,
      hint: `<code>string public myString = "Pragma";</code>`,
    },
    {
      text: `Create a public <code>bool</code> variable named <code>myBool</code> and set it to <code>true</code>.`,
      hint: `<code>bool public myBool = true;</code>`,
    },
  ];

  const applySyntaxHighlightingToHint = (text: string) => {
    return text.replace(/<code>(.*?)<\/code>/gs, (match, codeContent) => {
      const keywords = `\\b(contract|string|public|uint|bool|true|false)\\b`;
      const comments = `(\/\\/.*)`;
      const strings = `(".*?")`;
      const numbers = `\\b([0-9]+)\\b`;
      const regex = new RegExp(
        `(${keywords})|(${comments})|(${strings})|(${numbers})`,
        "g",
      );
      const highlighted = codeContent.replace(
        regex,
        (m: string, p1: string, p2: string, p3: string, p4: string) => {
          if (p1) return `<span class="hl-keyword">${p1}</span>`;
          if (p2) return `<span class="hl-comment">${p2}</span>`;
          if (p3) return `<span class="hl-string">${p3}</span>`;
          if (p4) return `<span class="hl-number">${p4}</span>`;
          return m;
        },
      );
      return `<pre style="margin:0; background:transparent; padding:0; font-family: inherit; font-size: inherit; line-height: 1.5;"><code>${highlighted}</code></pre>`;
    });
  };

  return (
    <main className="pt-32 pb-20 flex-grow">
      <section className="container mx-auto px-6">
        <button
          onClick={() => setCurrentPage("lessons")}
          className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8"
        >
          &larr; Back to Lessons
        </button>
        <div className="lesson-container">
          <div className="lesson-instructions">
            <MarkdownLesson markdownPath="/lessons/markdown/lesson2.md" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-[400px]">
              <SolidityEditor
                onCompile={setCompiledResult}
                initialCode={`// SPDX-License-Identifier: MIT\npragma solidity ^0.8.7;\n\n// Your contract will go here\n`}
              />
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Test Cases</h3>
              <button
                onClick={runTests}
                disabled={!compiledResult || !!compiledResult.errors}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full mb-4"
              >
                Run Tests
              </button>
              <div>
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    className={`test-case-row ${result.passed ? "passed" : "failed"}`}
                  >
                    <span>{result.passed ? "✅" : "❌"}</span>
                    <p className="ml-4 text-gray-300">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LessonVariables;
