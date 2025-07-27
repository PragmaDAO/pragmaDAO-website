import React from 'react';
import { LessonRowProps } from '../types';

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
        <main className="pt-32 pb-20">
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

export default LessonsPage;
