import React from 'react';
import { CommunityCardProps } from '../types';

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, date, imageUrl }) => (
    <div className="community-card text-center">
        {imageUrl && <img src={imageUrl} alt={title} className="mx-auto" />}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {date && <p className="text-indigo-400 font-semibold mb-2">{date}</p>}
        <p className="text-gray-400">{description}</p>
    </div>
);

const CommunityPage: React.FC = () => (
    <main className="pt-32 pb-20">
        <section id="community-hero" className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Join the PragmaDAO Community</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">Connect with thousands of like-minded innovators, builders, and visionaries. Our community is the heart of PragmaDAO.</p>
            <div className="flex justify-center flex-wrap gap-4">
                <a href="https://discord.gg/KspzcBMysa" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Join Discord</a>
                <a href="https://x.com/pragma64417" target="_blank" rel="noopener noreferrer" className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Follow on Twitter</a>
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

export default CommunityPage;
