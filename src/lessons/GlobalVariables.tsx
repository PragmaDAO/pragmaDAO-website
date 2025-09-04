import React, { useState, useRef, useEffect } from "react";
import SolidityEditor from "../components/SolidityEditor";
import { CompiledOutput, TestCase } from "../types";
import { runGlobalVariablesTests } from "./__tests__/global-variables.test";
import Lesson from "../components/Lesson";
import ScrollIndicator from "../components/ScrollIndicator";

const GlobalVariables: React.FC<{
  setCurrentPage: (page: string) => void;
}> = ({ setCurrentPage }) => {
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );

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
          <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/global-variables.md" />
          <div className="flex flex-col gap-4 h-[700px]">
            <SolidityEditor
              onCompile={setCompiledResult}
              solidityFilePath="/pragmaDAO-website/lessons/solidity/GlobalVariables.sol"
              lessonId="GlobalVariables"
            />
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default GlobalVariables;