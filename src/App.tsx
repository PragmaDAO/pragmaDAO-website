import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface FeatureCardProps {
    title: string;
    description: string;
}

interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
}

interface NavLinkProps {
    children: React.ReactNode;
    onClick: () => void;
}

interface LessonRowProps {
    index: number;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    onClick: () => void;
}

interface CommunityCardProps {
    title: string;
    description: string;
    date?: string;
    imageUrl?: string;
}

interface TestCase {
    description: string;
    passed: boolean;
}

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


// --- STYLES COMPONENT ---
const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Inter', sans-serif;
        }
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hero-glow {
            box-shadow: 0 0 80px 20px rgba(79, 70, 229, 0.5);
        }
        .feature-card:hover, .community-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        /* Styles for the Solidity Editor */
        .solidity-editor-container {
            background: #161b22;
            border-radius: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .editor-wrapper {
            position: relative;
            flex: 1 1 auto;
            min-height: 0;
        }
        .solidity-editor-textarea, .solidity-editor-pre {
            margin: 0;
            padding: 1rem;
            border: none;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            white-space: pre-wrap;
            word-wrap: break-word;
            text-align: left;
        }
        .solidity-editor-textarea {
            z-index: 1;
            color: transparent;
            background: transparent;
            caret-color: white;
            resize: none;
        }
        .solidity-editor-pre {
            z-index: 0;
            color: #c9d1d9;
        }
        .output-container {
            flex-shrink: 0;
        }
        .output-header {
            background: #0d1117;
            padding: 0.25rem 1rem;
            border-radius: 0.5rem 0.5rem 0 0;
            border-bottom: 1px solid #30363d;
        }
        .solidity-output {
            background: #0d1117;
            padding: 1rem;
            border-radius: 0 0 0.5rem 0.5rem;
            font-size: 0.8rem;
            color: #c9d1d9;
            max-height: 70px;
            overflow-y: auto;
            white-space: pre-wrap;
            word-break: break-all;
            text-align: left;
            transition: max-height 0.3s ease-in-out;
        }
        .solidity-output.expanded {
            max-height: 200px;
        }
        .output-error { color: #f85149; }
        .output-success { color: #3fb950; }
        
        /* Syntax Highlighting Styles */
        .hl-keyword { color: #c678dd; }
        .hl-comment { color: #7f848e; font-style: italic; }
        .hl-string { color: #98c379; }
        .hl-number { color: #d19a66; }
        .hl-type { color: #56b6c2; }
        .hl-pragma { color: #abb2bf; }

        /* Lesson Page Styles */
        .lesson-row {
            border-bottom: 1px solid #374151;
            padding: 1.5rem 1rem;
            transition: background-color 0.2s ease-in-out;
        }
        .lesson-row:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        .difficulty-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .difficulty-Beginner { background-color: #10b981; color: #d1fae5; }
        .difficulty-Intermediate { background-color: #f59e0b; color: #fef3c7; }
        .difficulty-Advanced { background-color: #ef4444; color: #fee2e2; }
        
        /* Community Page Styles */
        .community-card {
            background: #1f2937;
            border-radius: 0.75rem;
            padding: 1.5rem;
            transition: all 0.3s ease;
            border: 1px solid #374151;
        }
        .community-card img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 1rem;
        }
        
        /* Individual Lesson Page Styles */
        .lesson-container {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .lesson-container {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        .lesson-instructions {
            background: #1f2937;
            border-radius: 0.75rem;
            padding: 2rem;
            max-height: 80vh;
            overflow-y: auto;
        }
        .lesson-instructions h2 { font-size: 1.875rem; font-weight: 800; margin-bottom: 1rem; }
        .lesson-instructions h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .lesson-instructions p, .lesson-instructions li { color: #9ca3af; margin-bottom: 1rem; line-height: 1.6; }
        .lesson-instructions ul { list-style-position: inside; }
        .lesson-instructions code { background: #111827; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; }
        
        .instruction-list {
            list-style: none;
            padding: 0;
        }
        .instruction-list li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
        }
        .instruction-checkbox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            border: 2px solid #4f46e5; /* indigo-600 */
            border-radius: 4px;
            margin-right: 0.75rem;
            flex-shrink: 0;
            margin-top: 5px;
            transition: background-color 0.2s ease;
            cursor: pointer;
        }
        .instruction-checkbox.checked {
            background-color: #4f46e5;
        }
        .instruction-checkbox svg {
            width: 12px;
            height: 12px;
            stroke: white;
            stroke-width: 3;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        .instruction-checkbox.checked svg {
            opacity: 1;
        }
        .hint-button {
            background: none;
            border: 1px solid #4b5563;
            color: #9ca3af;
            padding: 0.1rem 0.5rem;
            font-size: 0.7rem;
            border-radius: 0.25rem;
            cursor: pointer;
            margin-left: auto; /* Pushes button to the right */
        }
        .hint-box {
            background-color: #111827;
            border-radius: 0.5rem;
            padding: 0.75rem;
            margin-top: 0.5rem;
            width: 100%;
        }
        .hint-box pre {
            margin: 0;
            background: transparent !important;
            padding: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: 1.5;
            white-space: pre-wrap;
        }
        
        .test-case-row {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .test-case-row.passed { background-color: rgba(16, 185, 129, 0.1); }
        .test-case-row.failed { background-color: rgba(239, 68, 68, 0.1); }

    `}</style>
);


// --- UI COMPONENTS ---

const NavLink: React.FC<NavLinkProps> = ({ onClick, children }) => (
    <button onClick={onClick} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer">
        {children}
    </button>
);

const Header: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    return (
        <header className="fixed w-full top-0 z-50 glass-effect">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => setCurrentPage('home')} className="text-2xl font-bold tracking-tighter bg-transparent border-none cursor-pointer text-white">PragmaDAO</button>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink onClick={() => setCurrentPage('home')}>Hello, World</NavLink>
                    <NavLink onClick={() => setCurrentPage('lessons')}>Lessons</NavLink>
                    <NavLink onClick={() => setCurrentPage('community')}>Community</NavLink>
                </nav>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Join Now
                </button>
            </div>
        </header>
    );
};

// --- WEB WORKER BASED SOLIDITY EDITOR ---
const SolidityEditor: React.FC<{ onCompile: (result: CompiledOutput | null) => void, initialCode?: string }> = ({ onCompile, initialCode }) => {
    const [code, setCode] = useState(initialCode || `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Your contract will go here

`);
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
        const strings = `(".*?")|('.*?')`;
        const numbers = `\\b([0-9]+)\\b`;
        const regex = new RegExp(`(${keywords})|(${types})|${comments}|${strings}|(${numbers})`, 'g');
        
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(regex, (match: string, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string) => {
            if (p1) return `<span class="hl-keyword">${p1}</span>`;
            if (p2) return `<span class="hl-type">${p2}</span>`;
            if (p3 || p4) return `<span class="hl-comment">${match}</span>`;
            if (p5 || p6) return `<span class="hl-string">${match}</span>`;
            if (p7) return `<span class="hl-number">${p7}</span>`;
            return match;
        });
    };

    useEffect(() => {
        setHighlightedCode(applySyntaxHighlighting(code));
    }, [code]);
    
    useEffect(() => {
        const workerCode = `
            const solc = {
                compile: function(input) {
                    const parsedInput = JSON.parse(input);
                    const contractCode = parsedInput.sources['contract.sol'].content;
                    if (contractCode.toLowerCase().includes('error')) {
                         return JSON.stringify({ errors: [{ severity: 'error', formattedMessage: 'Error: Simulated compilation error found in code.' }] });
                    }
                    const contractNameMatch = contractCode.match(/contract\\s+([\\w_]+)/);
                    const contractName = contractNameMatch ? contractNameMatch[1] : "MyContract";
                    let abi = [];
                    const publicVars = contractCode.matchAll(/(\\w+)\\s+public\\s+(\\w+)/g);
                    for (const match of publicVars) {
                        abi.push({"inputs":[],"name":match[2],"outputs":[{"internalType":match[1],"name":"","type":match[1]}],"stateMutability":"view","type":"function"});
                    }
                    const mappings = contractCode.matchAll(/mapping\\(address\\s+=>\\s+(\\w+)\\)\\s+public\\s+(\\w+)/g);
                    for (const match of mappings) {
                        abi.push({"inputs":[{"internalType":"address","name":"","type":"address"}],"name":match[2],"outputs":[{"internalType":match[1],"name":"","type":match[1]}],"stateMutability":"view","type":"function"});
                    }
                    const contracts = { 'contract.sol': {} };
                    contracts['contract.sol'][contractName] = { abi, evm: { bytecode: { object: '60806040...' } } };
                    return JSON.stringify({ contracts });
                }
            };
            self.onmessage = function(e) {
                const { type, payload } = e.data;
                if (type === 'INIT') {
                    if (solc) { self.postMessage({ type: 'SOLC_LOADED' }); } 
                    else { self.postMessage({ type: 'ERROR', payload: 'Critical Error: Mock compiler failed to initialize.' }); }
                } else if (type === 'COMPILE') {
                    if (!solc) { self.postMessage({ type: 'ERROR', payload: 'Compiler not ready.' }); return; }
                    const compiled = solc.compile(JSON.stringify(payload.input));
                    self.postMessage({ type: 'COMPILED', payload: compiled });
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
                    const compiled: CompiledOutput = JSON.parse(payload);
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
                <span className="text-xs text-gray-400 pl-2">Solidity v0.8.7 (Mock)</span>
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

const Hero: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <section id="hero" className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Learn Solidity</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10">PragmaDAO is dedicating to teaching developers practical web3 skills. Learn about Solidity, security and more.</p>
            <div className="flex justify-center space-x-4">
                <button onClick={() => setCurrentPage('lessons')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">Start Learning</button>
            </div>
        </div>
        <div className="mt-20 relative hero-glow w-full max-w-5xl mx-auto h-[600px] md:h-[550px] rounded-2xl overflow-hidden p-4">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50"></div>
             <div className="relative z-10 h-full"><SolidityEditor onCompile={() => {}} initialCode={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract HelloWorld {
    string public greet = "Hello World!";

    function updateGreet(string memory _newGreet) public {
        greet = _newGreet;
    }
}`} /></div>
        </div>
    </section>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg feature-card transition-all duration-300">
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-gray-400">{description}</p>
    </div>
);

const Features: React.FC = () => (
    <section id="features" className="py-20">
        <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-12">Our Lessons</h3>
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard title="Growing Technical Content" description="Learn from constantly updated content and hands-on projects that build real-world skills." />
                <FeatureCard title="Practical Skills" description="Focus on in-demand technologies like Solidity, smart contract security, and dApp development." />
                <FeatureCard title="Vibrant Community" description="Join a community of learners and builders to collaborate, ask questions, and grow together." />
            </div>
        </div>
    </section>
);

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => (
    <div>
        <div className="bg-indigo-600 w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">{stepNumber}</div>
        <h4 className="text-2xl font-bold mb-2">{title}</h4>
        <p className="text-gray-400">{description}</p>
    </div>
);

const GetStarted: React.FC = () => (
    <section id="start" className="py-20">
        <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-12">Get Started in 3 Easy Steps</h3>
            <div className="grid md:grid-cols-3 gap-12 text-center">
                <StepCard stepNumber={1} title="Explore Lessons" description="Browse our catalog of courses on Solidity, DeFi, NFTs, and more to find your path." />
                <StepCard stepNumber={2} title="Join the Community" description="Connect with fellow developers and mentors in our exclusive Discord server." />
                <StepCard stepNumber={3} title="Start Building" description="Apply your new skills by contributing to open-source projects or creating your own." />
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <p>&copy; 2025 PragmaDAO. All rights reserved.</p>
        </div>
    </footer>
);

// --- PAGE COMPONENTS ---

const HomePage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <main className="pt-32 flex-grow">
        <Hero setCurrentPage={setCurrentPage} />
        <Features />
        <GetStarted />
    </main>
);

const LessonRow: React.FC<LessonRowProps> = ({ index, title, description, difficulty, onClick }) => (
    <div className="lesson-row grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-1 text-2xl font-bold text-gray-500">{String(index + 1).padStart(2, '0')}</div>
        <div className="md:col-span-8">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
        <div className="md:col-span-1 flex justify-start md:justify-center"><span className={`difficulty-badge difficulty-${difficulty}`}>{difficulty}</span></div>
        <div className="md:col-span-2 flex justify-end"><button onClick={onClick} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Start</button></div>
    </div>
);

const LessonsPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const lessons: Omit<LessonRowProps, 'index' | 'onClick'>[] = [
        { title: "Solidity 101: Your First Contract", description: "Learn the absolute basics of Solidity syntax and write a simple 'Hello World' smart contract.", difficulty: "Beginner" },
        { title: "Understanding Variables & Types", description: "Dive into value types, reference types, and data locations like storage, memory, and calldata.", difficulty: "Beginner" },
        { title: "ERC20 Token: Create Your Own Crypto", description: "A step-by-step guide to building a standard fungible token on the Ethereum blockchain.", difficulty: "Intermediate" },
    ];

    return (
        <main className="pt-32 pb-20 flex-grow">
            <section id="lessons" className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">PragmaDAO Lessons</h2>
                <p className="text-lg md:text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">Browse our collection of hands-on lessons to build practical Web3 development skills.</p>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700">
                    {lessons.map((lesson, index) => <LessonRow key={lesson.title} index={index} {...lesson} onClick={() => setCurrentPage(`lesson-${index + 1}`)} />)}
                </div>
            </section>
        </main>
    );
};

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, date, imageUrl }) => (
    <div className="community-card text-center">
        {imageUrl && <img src={imageUrl} alt={title} className="mx-auto" />}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {date && <p className="text-indigo-400 font-semibold mb-2">{date}</p>}
        <p className="text-gray-400">{description}</p>
    </div>
);

const CommunityPage: React.FC = () => (
    <main className="pt-32 pb-20 flex-grow">
        <section id="community-hero" className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Join the PragmaDAO Community</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">Connect with thousands of like-minded innovators, builders, and visionaries. Our community is the heart of PragmaDAO.</p>
            <div className="flex justify-center flex-wrap gap-4">
                <a href="https://discord.gg/jpuZwXNmGh" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Join Discord</a>
                <a href="#" className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Follow on Twitter</a>
            </div>
        </section>
        <section id="events" className="py-20">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-12">Upcoming Events</h3>
                <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
                    <CommunityCard title="Weekly Office Hours" date="TBD" description="Got questions about Solidity? Stuck on a lesson? Join our core contributors for a live Q&A session in the Discord." />
                </div>
            </div>
        </section>
        <section id="featured-members" className="py-20 bg-gray-800/50">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-12">Featured Members</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CommunityCard title="Alice" imageUrl="https://placehold.co/80x80/6366f1/ffffff?text=A" description="Alice is a core contributor to the PragmaDAO curriculum and an expert in smart contract security." />
                    <CommunityCard title="Bob" imageUrl="https://placehold.co/80x80/10b981/ffffff?text=B" description="Bob is a community moderator and runs the weekly office hours. He's always happy to help new developers." />
                    <CommunityCard title="Charlie" imageUrl="https://placehold.co/80x80/f59e0b/ffffff?text=C" description="Charlie is a recent graduate of our program who is now building his own DeFi protocol." />
                    <CommunityCard title="You" imageUrl="https://placehold.co/80x80/9ca3af/ffffff?text=?" description="Join our community, learn, give feedback and increase your skills." />
                </div>
            </div>
        </section>
    </main>
);

// --- LESSON PAGE COMPONENTS ---

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

const LessonVariables: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
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
        const contract = compiledResult.contracts['contract.sol']?.VariableTypes;
        if (!contract) {
            setTestResults([{ description: "Contract 'VariableTypes' not found.", passed: false }]);
            return;
        }
        const abi = contract.abi;
        const myUint = abi.find((v: AbiItem) => v.name === 'myUint');
        const myString = abi.find((v: AbiItem) => v.name === 'myString');
        const myBool = abi.find((v: AbiItem) => v.name === 'myBool');

        setTestResults([
            { description: "Contract must be named 'VariableTypes'", passed: !!contract },
            { description: "A public uint variable named 'myUint' exists", passed: !!myUint && myUint.outputs[0].type === 'uint256' },
            { description: "A public string variable named 'myString' exists", passed: !!myString && myString.outputs[0].type === 'string' },
            { description: "A public bool variable named 'myBool' exists", passed: !!myBool && myBool.outputs[0].type === 'bool' },
        ]);
    };

    const instructions = [
        { text: `Define a contract named <code>VariableTypes</code>.`, hint: `<code>contract VariableTypes {\n    // add your code here\n}</code>`},
        { text: `Create a public <code>uint</code> variable named <code>myUint</code> and set it to <code>123</code>.`, hint: `<code>uint public myUint = 123;</code>`},
        { text: `Create a public <code>string</code> variable named <code>myString</code> and set it to <code>"Pragma"</code>.`, hint: `<code>string public myString = "Pragma";</code>`},
        { text: `Create a public <code>bool</code> variable named <code>myBool</code> and set it to <code>true</code>.`, hint: `<code>bool public myBool = true;</code>`}
    ];
    
    const applySyntaxHighlightingToHint = (text: string) => {
        return text.replace(/<code>(.*?)<\/code>/gs, (match, codeContent) => {
            const keywords = `\\b(contract|string|public|uint|bool|true|false)\\b`;
            const comments = `(\\/\\/.*)`;
            const strings = `(".*?")`;
            const numbers = `\\b([0-9]+)\\b`;
            const regex = new RegExp(`(${keywords})|(${comments})|(${strings})|(${numbers})`, 'g');
            const highlighted = codeContent.replace(regex, (m: string, p1: string, p2: string, p3: string, p4: string) => {
                if (p1) return `<span class="hl-keyword">${p1}</span>`;
                if (p2) return `<span class="hl-comment">${p2}</span>`;
                if (p3) return `<span class="hl-string">${p3}</span>`;
                if (p4) return `<span class="hl-number">${p4}</span>`;
                return m;
            });
            return `<pre style="margin:0; background:transparent; padding:0; font-family: inherit; font-size: inherit; line-height: 1.5;"><code>${highlighted}</code></pre>`;
        });
    };

    return (
        <main className="pt-32 pb-20">
            <section className="container mx-auto px-6">
                <button onClick={() => setCurrentPage('lessons')} className="text-indigo-400 hover:text-indigo-300 font-semibold mb-8">&larr; Back to Lessons</button>
                <div className="lesson-container">
                    <div className="lesson-instructions">
                        <h2>Lesson 2: Understanding Variables & Types</h2>
                        <p>Smart contracts are all about managing state. In this lesson, you'll learn about the fundamental data types in Solidity.</p>
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
                                                <div className="text-base" dangerouslySetInnerHTML={{ __html: applySyntaxHighlightingToHint(item.hint) }} />
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


// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        if (currentPage.startsWith('lesson-')) {
            const lessonId = currentPage.split('-')[1];
            if (lessonId === '1') return <LessonSolidity101 setCurrentPage={setCurrentPage} />;
            if (lessonId === '2') return <LessonVariables setCurrentPage={setCurrentPage} />;
            if (lessonId === '3') return <LessonERC20 setCurrentPage={setCurrentPage} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'lessons':
                return <LessonsPage setCurrentPage={setCurrentPage} />;
            case 'community':
                return <CommunityPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-gray-900 text-white flex flex-col min-h-screen">
            <GlobalStyles />
            <Header setCurrentPage={setCurrentPage} />
            {renderPage()}
            <Footer />
        </div>
    );
}
