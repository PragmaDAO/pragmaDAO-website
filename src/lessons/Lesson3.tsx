import React, { useState } from 'react';
import SolidityEditor from '../components/SolidityEditor';
import MarkdownLesson from '../components/MarkdownLesson';

import { CompiledOutput, TestCase, AbiItem } from '../types';

const LessonERC20: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(null);
    const [testResults, setTestResults] = useState<TestCase[]>([]);
    

    const runTests = () => {
        if (!compiledResult || compiledResult.errors) {
            setTestResults([{ description: "Compilation must pass before tests can run.", passed: false }]);
            return;
        }
        const contract = compiledResult.contracts['contract.sol']?.MyToken;
        if (!contract) {
            setTestResults([{ description: "Contract 'MyToken' not found.", passed: false }]);
            return;
        }
        const abi = contract.abi;
        const name = abi.find((v: AbiItem) => v.name === 'name');
        const symbol = abi.find((v: AbiItem) => v.name === 'symbol');
        const decimals = abi.find((v: AbiItem) => v.name === 'decimals');
        const totalSupply = abi.find((v: AbiItem) => v.name === 'totalSupply');
        const balanceOf = abi.find((v: AbiItem) => v.name === 'balanceOf');

        setTestResults([
            { description: "Contract must be named 'MyToken'", passed: !!contract },
            { description: "A public string variable 'name' exists", passed: !!name && name.outputs[0].type === 'string' },
            { description: "A public string variable 'symbol' exists", passed: !!symbol && symbol.outputs[0].type === 'string' },
            { description: "A public uint8 variable 'decimals' exists", passed: !!decimals && decimals.outputs[0].type === 'uint8' },
            { description: "A public uint variable 'totalSupply' exists", passed: !!totalSupply && totalSupply.outputs[0].type === 'uint256' },
            { description: "A public mapping 'balanceOf' exists", passed: !!balanceOf && balanceOf.inputs[0].type === 'address' && balanceOf.outputs[0].type === 'uint256' },
        ]);
    };

    

    return (
        <main className="pt-32 pb-20 flex-grow">
            <section className="container mx-auto px-6">
                <button onClick={() => setCurrentPage('lessons')} className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8">&larr; Back to Lessons</button>
                <div className="lesson-container">
                    <div className="lesson-instructions">
                        <MarkdownLesson markdownPath="/lessons/markdown/lesson3.md" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="h-[400px]"><SolidityEditor onCompile={setCompiledResult} initialCode={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Your contract will go here
`} /></div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-4">Test Cases</h3>
                            <button onClick={runTests} disabled={!compiledResult || !!compiledResult.errors} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full mb-4">Run Tests</button>
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

export default LessonERC20;
