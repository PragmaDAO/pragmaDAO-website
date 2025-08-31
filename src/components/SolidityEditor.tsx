import React, { useState, useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { solidity } from '@replit/codemirror-lang-solidity';

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


const SolidityEditor: React.FC<{ onCompile?: (result: CompiledOutput | null) => void,
     initialCode?: string, solidityFilePath?: string, lessonId?: string }> = ({ onCompile,
     initialCode, solidityFilePath, lessonId }) => {
    const [code, setCode] = useState(initialCode || `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Your contract will go here

`);
    const [output, setOutput] = useState<string>('Initializing compiler worker...');
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCompilerReady, setIsCompilerReady] = useState<boolean>(false);
    const [isOutputExpanded, setIsOutputExpanded] = useState<boolean>(false);
    const workerRef = useRef<Worker | null>(null);
    const editorRef = useRef<HTMLDivElement>(null); // Ref for CodeMirror editor container
    const viewRef = useRef<EditorView | null>(null); // Ref for EditorView instance

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                solidity,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        setCode(update.state.doc.toString());
                    }
                })
            ]
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current
        });

        viewRef.current = view;

        return () => {
            view.destroy();
        };
    }, []); // Empty dependency array to run only once on mount

    // Update CodeMirror doc when initialCode changes (e.g., loading a new lesson)
    useEffect(() => {
        if (viewRef.current && initialCode !== undefined && viewRef.current.state.doc.toString() !== initialCode) {
            viewRef.current.dispatch({
                changes: { from: 0, to: viewRef.current.state.doc.length, insert: initialCode }
            });
        }
    }, [initialCode]);

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
    
    useEffect(() => {
        const soljsonUrl = window.location.origin + process.env.PUBLIC_URL + '/soljson.js';
        const workerCode = `
            var solc; // Declare solc globally
            var Module; // Declare Module globally
            importScripts('${soljsonUrl}'); // Import soljson.js directly

            function checkCompilerReady() {
                if (typeof Module !== 'undefined' && typeof Module.cwrap === 'function') {
                    solc = {
                        compile: function(input) {
                            return Module.cwrap('solidity_compile', 'string', ['string'])(input);
                        }
                    };
                    self.postMessage({ type: 'SOLC_LOADED' });
                } else {
                    // If not ready, try again after a short delay
                    setTimeout(checkCompilerReady, 100);
                }
            }

            // Start checking if the compiler is ready
            checkCompilerReady();
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
                case 'SOLC_LOADED': setIsCompilerReady(true); setOutput('Compiler ready.'); setIsError(false); break;
                case 'COMPILED':
                    console.log('Main Thread: Received COMPILED payload:', payload);
                    let compiled: CompiledOutput;
                    try {
                        compiled = JSON.parse(payload);
                        console.log('Main Thread: Parsed compiled object:', compiled);
                        onCompile?.(compiled);
                    } catch (parseError) {
                        console.error('Main Thread: Error parsing compiled payload:', parseError, payload);
                        setOutput('Error: Failed to parse compiler output. Check console for details.');
                        setIsError(true);
                        setIsLoading(false);
                        onCompile?.(null);
                        break;
                    }
                    if (compiled.errors) {
                        const errorMessages = compiled.errors.filter((err) => err.severity === 'error').map((err) => err.formattedMessage).join ('\n');
                        setOutput(errorMessages.length > 0 ? errorMessages : "Compiled with warnings.");
                        setIsError(errorMessages.length > 0);
                    } else {
                        setOutput("Compilation successful!\n\n" + JSON.stringify(compiled.contracts['contract.sol'], null, 2));
                        setIsError(false);
                    }
                    setIsLoading(false);
                    break;
                case 'ERROR': setOutput(payload); setIsError(true); setIsLoading(false); 
                onCompile?.(null); break;
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

    const handleRunTests = async () => {
        setIsLoading(true);
        setIsError(false);
        setOutput('Running Solidity tests...');

        try {
            const response = await fetch('/api/test-solidity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, lessonId: lessonId || 'default-lesson' }),
            });

            const data = await response.json();

            if (response.ok) {
                setOutput(data.output);
                setIsError(!data.success);
            } else {
                setOutput(`Error: ${data.error || 'Unknown error'}`);
                setIsError(true);
            }
        } catch (error: any) {
            setOutput(`Network error: ${error.message}`);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="solidity-editor-container h-[800px]">
            <div className="editor-wrapper" ref={editorRef}> 
                {/* CodeMirror editor will be mounted here */}
            </div>
            <div className="flex items-center justify-between mt-2 flex-shrink-0">
                <span className="text-xs text-gray-400 pl-2">Solidity v0.8.26 (Mock)</span>
                <div className="flex space-x-2">
                    <button onClick={handleCompile} disabled={isLoading || !isCompilerReady} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        {isLoading ? 'Compiling...' : 'Compile'}
                    </button>
                    <button onClick={handleRunTests} disabled={isLoading} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        {isLoading ? 'Running Tests...' : 'Run Tests'}
                    </button>
                </div>
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
