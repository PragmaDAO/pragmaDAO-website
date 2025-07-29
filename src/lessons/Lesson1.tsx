import React, { useState } from "react";
import SolidityEditor from "../components/SolidityEditor";
import { CompiledOutput, TestCase, AbiItem } from "../types";
import Lesson from "../components/Lesson";

const LessonSolidity101: React.FC<{
  setCurrentPage: (page: string) => void;
}> = ({ setCurrentPage }) => {
  const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    null,
  );
  const [testResults, setTestResults] = useState<TestCase[]>([]);

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

    const contract = compiledResult.contracts["contract.sol"]?.HelloWorld;
    
    const contractExistsTest: TestCase = {
      description: "A contract named 'HelloWorld' is defined",
      passed: !!contract,
    };
    let greetFunctionExistsTest: TestCase = {
      description:
        "Contract contains a public state variable or function named 'greet'",
      passed: false,
    };
    let greetFunctionReturnsStringTest: TestCase = {
      description: "'greet' function should return a string",
      passed: false,
    };
    if (contract) {
      const abi = contract.abi as AbiItem[];
      const greetFunction = abi.find((func) => func.name === "greet");
      greetFunctionExistsTest.passed = !!greetFunction;
      greetFunctionReturnsStringTest.passed = 
        !!greetFunction && greetFunction.outputs[0].type === "string";
    }
    setTestResults([
      contractExistsTest,
      greetFunctionExistsTest,
      greetFunctionReturnsStringTest,
    ]);
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
          <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/lesson1.md" />
          <div className="flex flex-col gap-4">
            <div className="h-[400px]">
              <SolidityEditor
                onCompile={setCompiledResult}
                solidityFilePath="/pragmaDAO-website/lessons/solidity/Lesson1.sol"
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

export default LessonSolidity101;
