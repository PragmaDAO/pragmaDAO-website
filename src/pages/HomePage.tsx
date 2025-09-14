import React from 'react';
import SolidityEditor from '../components/SolidityEditor';
import { FeatureCardProps, StepCardProps } from '../types';
// eslint-disable-next-line import/no-webpack-loader-syntax
import helloWorldSolidity from '!!raw-loader!../lessons/assets/solidity/HelloWorld.sol';

console.log('HomePage.tsx - Imported HelloWorld solidity:');
console.log('Length:', helloWorldSolidity ? helloWorldSolidity.length : 'undefined');
console.log('Preview:', helloWorldSolidity ? helloWorldSolidity.substring(0, 100) + '...' : 'N/A');

const Hero: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <section id="hero" className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Learn Solidity</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10">PragmaDAO is a community-driven platform dedicated to teaching developers practical web3 skills. Learn about Solidity, security and more.</p>
            <div className="flex justify-center space-x-4">
                <button onClick={() => setCurrentPage('lessons')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">Start Learning</button>
            </div>
        </div>
        <div className="mt-20 relative hero-glow w-full max-w-5xl mx-auto h-[750px] md:h-[690px] rounded-2xl overflow-hidden p-4">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50"></div>
             <div className="relative z-10 h-full"><SolidityEditor onCompile={() => {}} initialCode={helloWorldSolidity} lessonId="HelloWorld" onTestResults={() => {}} onAllTestsPassed={() => {}} /></div>
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

const HomePage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <main className="pt-32">
        <Hero setCurrentPage={setCurrentPage} />
        <Features />
        <GetStarted />
    </main>
);

export default HomePage;