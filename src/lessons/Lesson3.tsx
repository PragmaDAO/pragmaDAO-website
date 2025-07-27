import React, { useState } from 'react';
import SolidityEditor from '../components/SolidityEditor';
import { CompiledOutput, TestCase, AbiItem } from '../types';

const LessonERC20: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(null);
    const [testResults, setTestResults] = useState<TestCase[]>([]);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false, false]);
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

    const instructions = [
        { text: `Define a contract named <code>MyToken</code>.`, hint: `Just like the last lesson, use the <code>contract</code> keyword.`},
        { text: `Create a public <code>string</code> variable for the token's <code>name</code>.`, hint: `Example: <code>string public name = "My First Token";</code>`},
        { text: `Create a public <code>string</code> variable for the token's <code>symbol</code>.`, hint: `Symbols are usually short, like "MFT".`},
        { text: `Create a public <code>uint8</code> variable for <code>decimals</code> and set it to <code>18</code>.`, hint: `18 is the standard for most ERC20 tokens, as it matches Ether.`},
        { text: `Create a public <code>uint256</code> for the <code>totalSupply</code>.`, hint: `This will represent the total number of tokens in existence.`},
        { text: `Create a public <code>mapping</code> called <code>balanceOf</code> to track balances.`, hint: `The mapping should go from an <code>address</code> to a <code>uint256</code>.`}
    ];

    return (
        <main className="pt-32 pb-20">
            <section className="container mx-auto px-6">
                <button onClick={() => setCurrentPage('lessons')} className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8">&larr; Back to Lessons</button>
                <div className="lesson-container">
                    <div className="lesson-instructions">
                        <h2>Lesson 3: ERC20 Token</h2>
                        <p>The ERC20 standard is the foundation for most cryptocurrencies on Ethereum. In this lesson, you'll build the basic state variables for your own token.</p>
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
                                                <p className="text-base" dangerouslySetInnerHTML={{ __html: item.hint }} />
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
