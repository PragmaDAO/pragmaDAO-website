import React, { useState } from 'react';
import SolidityEditor from '../components/SolidityEditor';
import { CompiledOutput, TestCase } from '../types';

const LessonSolidity101: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(null);
    const [testResults, setTestResults] = useState<TestCase[]>([]);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);
    const [activeHint, setActiveHint] = useState<number | null>(null);

    const handleCheckboxClick = (index: number) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const runTests = () => {
        if (!compiledResult || compiledResult.errors) {
            setTestResults([{ description: "Compilation must pass before tests can run.", passed: false }]);
            return;
        }
        
        const contract = compiledResult.contracts['contract.sol']?.HelloWorld;
        const contractExistsTest: TestCase = { 
            description: "A contract named 'HelloWorld' is defined", 
            passed: !!contract 
        };
        let greetFunctionExistsTest: TestCase = { description: "Contract contains a public state variable or function named 'greet'", passed: false };
        let greetFunctionReturnsStringTest: TestCase = { description: "'greet' function should return a string", passed: false };

        if (contract) {
            const abi = contract.abi;
            const greetFunction = abi.find((func) => func.name === 'greet');
            greetFunctionExistsTest.passed = !!greetFunction;
            greetFunctionReturnsStringTest.passed = !!greetFunction && greetFunction.outputs[0].type === 'string';
        }
        
        setTestResults([ contractExistsTest, greetFunctionExistsTest, greetFunctionReturnsStringTest ]);
    };

    const instructions = [
        { text: `In the editor on the right, define a contract named <code>HelloWorld</code>.`, hint: `<code>contract MyContract { ... }</code>` },
        { text: `Inside the contract, create a public state variable of type <code>string</code> named <code>greet</code>.`, hint: `<code>string public myString;</code>` },
        { text: `Initialize the <code>greet</code> variable with the value <code>"Hello World!"</code>.`, hint: `<code>string public myString = "initial value";</code>` },
        { text: `Click the "Compile" button. If there are no errors, click "Run Tests" to check your work!`, hint: `Once the 'Compile' button shows a success message, you're ready to run the tests!` }
    ];

    const applySyntaxHighlightingToHint = (text: string) => {
        return text.replace(/<code>(.*?)<\/code>/g, (match, codeContent) => {
            const keywords = `\\b(contract|string|public)\\b`;
            const regex = new RegExp(`(${keywords})`, 'g');
            const highlighted = codeContent.replace(regex, `<span class="hl-keyword">$1</span>`);
            return `<code>${highlighted}</code>`;
        });
    };

    return (
        <main className="pt-32 pb-20">
            <section className="container mx-auto px-6">
                <button onClick={() => setCurrentPage('lessons')} className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8">&larr; Back to Lessons</button>
                <div className="lesson-container">
                    <div className="lesson-instructions">
                        <h2>Lesson 1: Your First Smart Contract</h2>
                        <p>Welcome to Solidity! In this first lesson, you'll write and compile your very first smart contract. This is the "Hello, World!" of the blockchain world.</p>
                        <h3>Objectives</h3>
                        <ul>
                            <li>Understand the basic structure of a Solidity file.</li>
                            <li>Declare a contract.</li>
                            <li>Create a public state variable.</li>
                            <li>Compile your contract and see the output.</li>
                        </ul>
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
                    <div className="flex flex-col gap-4">
                        <div className="h-[400px]"><SolidityEditor onCompile={setCompiledResult} initialCode={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Your contract will go here
`} /></div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Test Cases</h3>
                                <button onClick={runTests} disabled={!compiledResult || !!compiledResult.errors} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Run Tests</button>
                            </div>
                            <div>
                                {testResults.map((result, i) => (
                                    <div key={i} className={`test-case-row ${result.passed ? 'passed' : 'failed'}`}>
                                        <span>{result.passed ? '✅' : '❌'}</span>
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
