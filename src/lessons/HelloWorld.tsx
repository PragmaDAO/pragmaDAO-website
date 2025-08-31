import React, { useState, useRef, useEffect } from "react";
import SolidityEditor from "../components/SolidityEditor";
import { CompiledOutput, TestCase } from "../types";
import { runHelloWorldTests } from "./__tests__/hello-world.test";
import Lesson from "../components/Lesson";
import ScrollIndicator from "../components/ScrollIndicator";

const HelloWorld: React.FC<{
  setCurrentPage: (page: string) => void;
}> = ({ setCurrentPage }) => {
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const testResultsContainerRef = useRef<HTMLDivElement>(null);

  const runTests = () => {
    const results = runHelloWorldTests(compiledResult);
    setTestResults(results);
  };

  useEffect(() => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isNowScrollable = container.scrollHeight > container.clientHeight;
      setIsScrollable(isNowScrollable);
      setShowScrollIndicator(isNowScrollable);
    }
  }, [testResults]);

  const handleScroll = () => {
    const container = testResultsContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
      setShowScrollIndicator(!isAtBottom);
    }
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
          <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/hello-world.md" />
          <div className="flex flex-col gap-4 min-h-[800px]">
            <SolidityEditor
              onCompile={setCompiledResult}
              solidityFilePath="/pragmaDAO-website/lessons/solidity/HelloWorld.sol"
              lessonId="HelloWorld"
            />
            <div className="bg-gray-800/50 rounded-lg p-4 relative">
              <h3 className="text-lg font-bold mb-4">Test Cases</h3>
              <button
                onClick={runTests}
                disabled={!compiledResult || !!compiledResult.errors}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full mb-4"
              >
                Run Tests
              </button>
              <div className="test-results-container" ref={testResultsContainerRef} onScroll={handleScroll}>
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
              {isScrollable && showScrollIndicator && <ScrollIndicator />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;
