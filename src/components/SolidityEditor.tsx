import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS (Moved from types.ts to fix import error) ---
interface AbiItem {
    inputs: { internalType: string; name: string; type: string }[];
    name: string;
    outputs: { internalType: string; name: string; type: string }[];
    stateMutability: string;
    type: string;
}

interface CompiledContract {
    abi: AbiItem[];
    evm: {
        bytecode: {
            object: string;
        };
    };
}

interface CompiledOutput {
    contracts: {
        'contract.sol': {
            [contractName: string]: CompiledContract;
        };
    };
    errors?: { severity: string; formattedMessage: string }[];
}


const SolidityEditor: React.FC<{ onCompile: (result: CompiledOutput | null) => void, initialCode?: string, solidityFilePath?: string }> = ({ onCompile, initialCode, solidityFilePath }) => {
    const [code, setCode] = useState(initialCode || `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Your contract will go here

`);
    useEffect(() => {
        if (solidityFilePath) {
            fetch(solidityFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    setCode(text);
                })
                .catch(error => {
                    console.error("Could not load solidity file:", error);
                    setCode(`// Error loading file from ${solidityFilePath}
// Please check the path and ensure the file exists.

` + initialCode);
                });
        }
    }, [solidityFilePath, initialCode]);
    const [highlightedCode, setHighlightedCode] = useState('');
    const [output, setOutput] = useState<string>('Initializing compiler worker...');
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCompilerReady, setIsCompilerReady] = useState<boolean>(false);
    const [isOutputExpanded, setIsOutputExpanded] = useState<boolean>(false);
    const workerRef = useRef<Worker | null>(null);
    const preRef = useRef<HTMLPreElement>(null);

    const applySyntaxHighlighting = (text: string) => {
        const keywords = `\\b(pragma|solidity|contract|function|constructor|returns|public|private|internal|external|view|pure|payable|if|else|for|while|require|revert|event|emit|mapping|struct|memory|storage|calldata|true|false)\\b`;
        const types = `\\b(string|uint|uint[0-9]*|int|int[0-9]*|address|bool|bytes|bytes[0-9]*)\\b`;
        const comments = `(\\/\\/.*)|(\\/\\*[\\s\\S]*?\\*\\/)`;
        const strings = `(\".*?\")|(\'.*?\')`;
        const numbers = `\\b([0-9]+)\\b`;
        const regex = new RegExp(`(${keywords})|(${types})|${comments}|${strings}|(${numbers})`, 'g');
        
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(regex, (match: string, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string) => {
            if (p1) return `<span class=\"hl-keyword\">${p1}</span>`;
            if (p2) return `<span class=\"hl-type\">${p2}</span>`;
            if (p3 || p4) return `<span class=\"hl-comment\">${match}</span>`;
            if (p5 || p6) return `<span class=\"hl-string\">${match}</span>`;
            if (p7) return `<span class=\"hl-number\">${p7}</span>`;
            return match;
        });
        };

    useEffect(() => {
        setHighlightedCode(applySyntaxHighlighting(code));
    }, [code]);
    
    useEffect(() => {
        const workerCode = `
            // Dynamically fetch and eval soljson.js
            let solc;
            fetch('/soljson.js')
            .then(response => response.text())
            .then(scriptText => {
            
                // Create a function to execute the script in the worker's scope
            const scriptFunction = new Function(scriptText);
            scriptFunction(); // Execute soljson.js
            
            // solc should now be available globally or via Module
            if (typeof Module !=='undefined' && typeof Module.cwrap === 'function') {
                solc = {
                    compile: function(input) {
                        return Module.cwrap('solidity_compile', 'string', ['string'])(input);
                    }
                };
                
                    self.postMessage({ type: 'SOLC_LOADED' });
                } else {
                    self.postMessage({ type:'ERROR', payload: 'Critical Error: solc.js failed to initialize.' });
                    }
                }).catch(error => {
                    self.postMessage({ type:'ERROR', payload: 'Error loading soljson.js: ' + error.message });
                });
                self.onmessage = function(e) {
                    const { type, payload } = e.data;
                    if (type === 'COMPILE') {
                    if (typeof solc === 'undefined') { 
                        self.postMessage({ type: 'ERROR',
                        payload: 'Compiler not ready.' 
            }); 
            return; }
            try {
                const compiled = solc.compile(JSON.stringify(payload.input));
                self.postMessage({ type:'COMPILED', payload: compiled });
            } catch (error) {
                self.postMessage({ type:'ERROR', payload: 'Compilation error: ' + error.
            message });
                    }
                }
            }
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        workerRef.current = new Worker(URL.createObjectURL(blob));

        workerRef.current.onmessage = (e) => {
            const { type, payload } = e.data;
            switch (type) {
                case 'SOLC_LOADED': setIsCompilerReady(true); setOutput('Mock compiler ready.'); setIsError(false); break;
                case 'COMPILED':
                    console.log('Main Thread: Received COMPILED payload:', payload);
                    let compiled: CompiledOutput;
                    try {
                        compiled = JSON.parse(payload);
                        console.log('Main Thread: Parsed compiled object:', compiled);
                    } catch (parseError) {
                        console.error('Main Thread: Error parsing compiled payload:', parseError, payload);
                        setOutput('Error: Failed to parse compiler output. Check console for details.');
                        setIsError(true);
                        setIsLoading(false);
                        onCompile(null);
                        break;
                    }
                    onCompile(compiled);
                    if (compiled.errors) {
                        const errorMessages = compiled.errors.filter((err) => err.severity === 'error').map((err) => err.formattedMessage).join('\\n');
                        setOutput(errorMessages.length > 0 ? errorMessages : "Compiled with warnings.");
                        setIsError(errorMessages.length > 0);
                    } else {
                        setOutput("Compilation successful!\\n\\n" + JSON.stringify(compiled.contracts['contract.sol'], null, 2));
                        setIsError(false);
                    }
                    setIsLoading(false);
                    break;
                case 'ERROR': setOutput(payload); setIsError(true); setIsLoading(false); onCompile(null); break;
                default: break;
            }
        };

        workerRef.current.postMessage({ type: 'INIT' });

        return () => workerRef.current?.terminate();
    }, [onCompile]);

    const handleCompile = () => {
        if (!isCompilerReady || !workerRef.current) return;
        setIsLoading(true);
        const input = { language: 'Solidity', sources: { 'contract.sol': { content: code } }, settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } } } };
        workerRef.current.postMessage({ type: 'COMPILE', payload: { input } });
    };

    const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const target = e.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const newCode = code.substring(0, start) + "    " + code.substring(end);
            setCode(newCode);
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = start + 4;
            }, 0);
        }
    };

    const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        if (preRef.current) {
            preRef.current.scrollTop = target.scrollTop;
            preRef.current.scrollLeft = target.scrollLeft;
        }
    };

    return (
        <div className="solidity-editor-container h-full">
            <div className="editor-wrapper">
                <textarea 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    onScroll={syncScroll} 
                    onKeyDown={handleTab}
                    className="solidity-editor-textarea" 
                    spellCheck="false" 
                />
                <pre ref={preRef} className="solidity-editor-pre" aria-hidden="true"><code dangerouslySetInnerHTML={{ __html: highlightedCode }} /></pre>
            </div>
            <div className="flex items-center justify-between mt-2 flex-shrink-0">
                <span className="text-xs text-gray-400 pl-2">Solidity v0.8.26 (Mock)</span>
                <button onClick={handleCompile} disabled={isLoading || !isCompilerReady} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    {isLoading ? 'Compiling...' : 'Compile'}
                </button>
            </div>
            {output && (
                <div className="mt-2 flex-shrink-0 output-container">
                    <div className="output-header flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Output</span>
                        <button onClick={() => setIsOutputExpanded(!isOutputExpanded)} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                            {isOutputExpanded ? 'COLLAPSE' : 'EXPAND'}
                        </button>
                    </div>
                    <pre className={`solidity-output ${isError ? 'output-error' : 'output-success'} ${isOutputExpanded ? 'expanded' : ''}`}>{output}</pre>
                </div>
            )}
        </div>
    );
};

export default SolidityEditor;
