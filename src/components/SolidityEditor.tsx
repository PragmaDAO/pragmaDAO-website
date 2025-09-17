import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { solidity } from '@replit/codemirror-lang-solidity';
import { indentWithTab } from '@codemirror/commands';
import { indentUnit } from '@codemirror/language';
import { useAuth } from '../context/AuthContext';
import { CompiledOutput, TestCase } from '../types';

const SolidityEditor: React.FC<{ onCompile?: (result: CompiledOutput | null) => void,
     initialCode?: string, lessonId?: string, onTestResults: (testCases: TestCase[]) => void, onAllTestsPassed: (passed: boolean) => void, onCodeChange?: (code: string) => void }> = ({ onCompile,
     initialCode, lessonId, onTestResults, onAllTestsPassed, onCodeChange }) => {
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
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { user, token } = useAuth();
    
    // Resizable panels state
    const [editorHeight, setEditorHeight] = useState<number>(() => {
        const saved = localStorage.getItem(`editor_height_${lessonId}`);
        return saved ? parseInt(saved) : 50; // Default 50%
    });
    const [isDragging, setIsDragging] = useState(false);

    // Track if code has changed since last database save
    const [lastSavedToDatabase, setLastSavedToDatabase] = useState('');

    // Debounced localStorage save
    useEffect(() => {
        if (!lessonId) return;
        
        const timeoutId = setTimeout(() => {
            localStorage.setItem(`lesson_code_${lessonId}`, code);
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [code, lessonId]);

    // Notify parent component of code changes for navigation-away saving
    useEffect(() => {
        if (onCodeChange) {
            onCodeChange(code);
        }
    }, [code, onCodeChange]);

    // Save to database when component unmounts (user navigates away)
    useEffect(() => {
        return () => {
            // Save to database if code has changed
            if (code && code !== lastSavedToDatabase && user && token && lessonId) {
                addToBatchSaveQueue(lessonId, code);
                console.log('Added to batch queue on unmount:', lessonId);
            }
        };
    }, [code, lastSavedToDatabase, user, token, lessonId]);

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                solidity,
                keymap.of([indentWithTab]),
                indentUnit.of("    "), // Set tab size to 4 spaces
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
        const loadCode = async () => {
            console.log('=== CODE LOADING DEBUG ===');
            console.log('Lesson ID:', lessonId);
            console.log('User:', user ? 'logged in' : 'not logged in');
            console.log('Token:', token ? 'exists' : 'missing');
            console.log('Initial Code:', initialCode ? `${initialCode.length} chars` : 'undefined/empty');
            console.log('Initial Code Preview:', initialCode ? initialCode.substring(0, 100) + '...' : 'N/A');

            // 1. First, check backend database for saved user code
            if (user && token && lessonId) {
                const savedCodeLoaded = await loadSavedCode();
                if (savedCodeLoaded) {
                    console.log('✅ Loaded saved user code from database for lesson:', lessonId);
                    return;
                }
                console.log('⚠️ No saved code found in database');
            } else {
                console.log('⚠️ Skipping database check - user not authenticated');
            }

            // 2. Then, check localStorage for temporary saves
            if (lessonId) {
                const localCode = localStorage.getItem(`lesson_code_${lessonId}`);
                console.log('LocalStorage code:', localCode ? `${localCode.length} chars` : 'none');

                if (localCode && localCode.trim().length > 200) { // Only use localStorage if it has meaningful content (raised from 50)
                    setCode(localCode);
                    if (viewRef.current) {
                        viewRef.current.dispatch({
                            changes: { from: 0, to: viewRef.current.state.doc.length, insert: localCode }
                        });
                    }
                    console.log('✅ Loaded code from localStorage for lesson:', lessonId);
                    return;
                }
                console.log('⚠️ LocalStorage code too short or empty');
            }

            // 3. Finally, use initialCode as the default template for new users
            if (initialCode && initialCode.trim().length > 10) {
                setCode(initialCode);
                if (viewRef.current) {
                    viewRef.current.dispatch({
                        changes: { from: 0, to: viewRef.current.state.doc.length, insert: initialCode }
                    });
                }
                console.log('✅ Loaded default template code from initialCode for lesson:', lessonId);
                return;
            }

            // 4. Last resort: use default template
            const defaultCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

// Your contract will go here

`;
            setCode(defaultCode);
            if (viewRef.current) {
                viewRef.current.dispatch({
                    changes: { from: 0, to: viewRef.current.state.doc.length, insert: defaultCode }
                });
            }
            console.log('⚠️ Using fallback default code - initialCode was empty/invalid');
            console.log('=== END CODE LOADING DEBUG ===');
        };

        loadCode();
    }, [initialCode, user, token, lessonId]);

    const loadSavedCode = async (): Promise<boolean> => {
        if (!user || !token || !lessonId) return false;

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
            const response = await fetch(`${backendUrl}/api/code/${lessonId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const savedCode = data.code;
                setCode(savedCode);
                if (viewRef.current) {
                    viewRef.current.dispatch({
                        changes: { from: 0, to: viewRef.current.state.doc.length, insert: savedCode }
                    });
                }
                console.log('Loaded saved code for lesson:', lessonId);
                return true;
            } else if (response.status === 404) {
                console.log('No saved code found for lesson:', lessonId);
                return false;
            } else {
                console.error('Failed to load saved code:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error loading saved code:', error);
            return false;
        }
    };

    const saveCodeToDatabase = async () => {
        if (!user || !token || !lessonId) return;
        if (code === lastSavedToDatabase) return; // No changes

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
            const response = await fetch(`${backendUrl}/api/code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    lessonId,
                    code
                })
            });

            if (response.ok) {
                console.log('Code saved to database for lesson:', lessonId);
                setLastSavedToDatabase(code);
            } else {
                console.error('Failed to save code to database:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving code to database:', error);
        }
    };

    // Queue for batch saves (shared across all editors)
    const addToBatchSaveQueue = (lessonId: string, code: string) => {
        if (!user || !token) return;

        // Add to global queue
        const saveItem = { lessonId, code, timestamp: Date.now() };
        const existingQueue = JSON.parse(localStorage.getItem('batchSaveQueue') || '[]');

        // Remove any existing save for this lesson (replace with latest)
        const filteredQueue = existingQueue.filter((item: any) => item.lessonId !== lessonId);
        filteredQueue.push(saveItem);

        localStorage.setItem('batchSaveQueue', JSON.stringify(filteredQueue));
        console.log('Added to batch save queue:', lessonId);
    };

    // Save editor height to localStorage
    useEffect(() => {
        if (lessonId) {
            localStorage.setItem(`editor_height_${lessonId}`, editorHeight.toString());
        }
    }, [editorHeight, lessonId]);

    // Resize handling functions
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        setIsDragging(true);
        document.body.style.userSelect = 'none';
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const mouseY = e.clientY - containerRect.top;
        
        // Calculate new height percentage with constraints (20% - 80%)
        let newHeightPercentage = (mouseY / containerHeight) * 100;
        newHeightPercentage = Math.max(20, Math.min(80, newHeightPercentage));
        
        setEditorHeight(Math.round(newHeightPercentage));
    }, [isDragging]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const touchY = e.touches[0].clientY - containerRect.top;
        
        // Calculate new height percentage with constraints (20% - 80%)
        let newHeightPercentage = (touchY / containerHeight) * 100;
        newHeightPercentage = Math.max(20, Math.min(80, newHeightPercentage));
        
        setEditorHeight(Math.round(newHeightPercentage));
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    }, []);

    // Add/remove global mouse and touch event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
    
    useEffect(() => {
        // Use local soljson.js for both development and production
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
                        const errorMessages = compiled.errors.filter((err: { severity: string; formattedMessage: string; }) => err.severity === 'error').map((err: { severity: string; formattedMessage: string; }) => err.formattedMessage).join ('\n');
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

    const handleCompile = async () => {
        if (!isCompilerReady || !workerRef.current) return;
        setIsLoading(true);
        const input = { language: 'Solidity', sources: { 'contract.sol': { content: code } }, settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } } } };
        workerRef.current.postMessage({ type: 'COMPILE', payload: { input } });

        // No database save on compile - only localStorage auto-save handles this
    };

    const handleRunTests = async () => {
        setIsLoading(true);
        setIsError(false);
        setOutput('Running Solidity tests...');

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
            console.log('🔍 Using backend URL:', backendUrl);
            const response = await fetch(`${backendUrl}/api/test-solidity-external`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, lessonId: lessonId || 'default-lesson' }),
            });

            const data = await response.json();
            console.log('SolidityEditor: Data received from backend:', data); // Add this line

            if (response.ok) {
                setOutput(data.output);
                setIsError(!data.success);
                // Parse the raw output to extract test cases
                const parsedTestCases: TestCase[] = parseForgeTestOutput(data.output);
                console.log('SolidityEditor: parsedTestCases', parsedTestCases); // Add this line
                onTestResults(parsedTestCases); // Pass parsed test cases to parent

                // Determine if all tests passed
                const allTestsPassed = parsedTestCases.length > 0 && parsedTestCases.every(test => test.passed);
                console.log('SolidityEditor: allTestsPassed', allTestsPassed); // Add this line
                onAllTestsPassed(allTestsPassed); // Notify parent about overall test status

                // No database save on test run - only localStorage auto-save handles this
            } else {
                const errorMessage = data.output || data.error || 'An unknown error occurred.';
                // The backend sends a string with '\n' for newlines, so we replace them with actual newlines
                // for correct rendering in a <pre> tag.
                const formattedError = String(errorMessage).replace(/\\n/g, '\n');
                setOutput(formattedError);
                setIsError(true);
                onTestResults([]); // Clear test results on error
            }
        } catch (error: any) {
            setOutput(`Network or JSON parsing error: ${error.message}`);
            setIsError(true);
            onTestResults([]); // Clear test results on error
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to parse forge test output
    const parseForgeTestOutput = (rawOutput: string): TestCase[] => {
        const testCaseRegex = /^\s*\[(PASS|FAIL)\]\s*(.*?)\s*\(gas: \d+\)/gm;
        const testCases: TestCase[] = [];
        let match;

        while ((match = testCaseRegex.exec(rawOutput)) !== null) {
            const status = match[1];
            const description = match[2].trim();
            // const gas = parseInt(match[3]); // Not currently used in TestCase interface

            testCases.push({
                description: description,
                passed: status === "PASS",
            });
        }

        // Handle skipped tests if forge output includes them
        const skippedRegex = /..[(]SKIP[)] (.*)/g;
        while ((match = skippedRegex.exec(rawOutput)) !== null) {
            const description = match[1].trim();
            testCases.push({
                description: description,
                passed: false, // Skipped tests are considered not passed for completion
            });
        }

        return testCases;
    };

    return (
        <div className="solidity-editor-container flex flex-col overflow-hidden" ref={containerRef}>
            <div 
                className="editor-wrapper flex-shrink-0 overflow-hidden"
                ref={editorRef} 
                style={{
                    height: `${editorHeight}%`,
                    overflowY: 'auto'
                }}
            >
                {/* CodeMirror editor will be mounted here */}
            </div>

            {/* Draggable resize handle */}
            <div 
                className={`resize-handle flex items-center justify-center cursor-ns-resize select-none transition-colors duration-200 ${ 
                    isDragging ? 'bg-indigo-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ height: '8px', minHeight: '8px' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                title="Drag to resize panels"
            >
                <div className="flex space-x-1">
                    <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-600'}`}></div>
                    <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-600'}`}></div>
                    <div className={`w-1 h-1 rounded-full ${isDragging ? 'bg-white' : 'bg-gray-600'}`}></div>
                </div>
            </div>

            <div 
                className="output-wrapper flex-shrink-0 flex flex-col overflow-hidden"
                style={{ height: `${100 - editorHeight}%` }}
            >
                <div className="flex items-center justify-between mt-2 mb-2 flex-shrink-0 px-2">
                    <span className="text-xs text-gray-400">Solidity v0.8.26 (Mock)</span>
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
                    <div className="output-container flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="output-header flex justify-between items-center py-1 flex-shrink-0 px-2 border-b border-gray-200">
                            <span className="text-xs font-semibold text-gray-400 uppercase">Output</span>
                        </div>
                        <pre 
                            className={`solidity-output ${isError ? 'output-error' : 'output-success'} flex-1 overflow-auto w-full p-3 m-0 whitespace-pre-wrap`}
                            style={{
                                minHeight: 0,
                                maxHeight: '100%',
                                height: '100%'
                            }}
                        >
                            {output}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolidityEditor;
