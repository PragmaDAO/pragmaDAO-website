import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import CommunityPage from './pages/CommunityPage';
import Lesson1 from './lessons/Lesson1';
import Lesson2 from './lessons/Lesson2';
import Lesson3 from './lessons/Lesson3';
import './index.css'; // Assuming global styles are here

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
        .lesson-instructions code { background: #161b22; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; }
        
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
            background-color: #161b22;
            border-radius: 0.5rem;
            padding: 0.75rem;
            margin-top: 0.5rem;
            width: 100%;
        }
        .hint-box pre {
            margin: 0;
            background: #161b22 !important;
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

// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        if (currentPage.startsWith('lesson-')) {
            const lessonId = currentPage.split('-')[1];
            if (lessonId === '1') return <Lesson1 setCurrentPage={setCurrentPage} />;
            if (lessonId === '2') return <Lesson2 setCurrentPage={setCurrentPage} />;
            if (lessonId === '3') return <Lesson3 setCurrentPage={setCurrentPage} />;
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
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <GlobalStyles />
            <Header setCurrentPage={setCurrentPage} />
            <div className="flex-grow">
                {renderPage()}
            </div>
            <Footer />
        </div>
    );
}
