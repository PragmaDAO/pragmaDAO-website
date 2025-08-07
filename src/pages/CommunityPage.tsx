import React from 'react';
import { CommunityCardProps } from '../types';

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, date, imageUrl, linkUrl }) => (
    <div className={ `community-card text-center${linkUrl && ' cursor-pointer'}` }
        onClick={ () => linkUrl && window.location.assign(linkUrl)}>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                    <CommunityCard linkUrl="https://github.com/FaceyMcFacey" title="FaceyMcFacey" imageUrl="https://avatars.githubusercontent.com/u/223031114?v=4" description="Facey is the project founder and chief content creator. He also coordinates the discord community." />
                    <CommunityCard linkUrl="https://github.com/lusayo-nyondo" title="Lusayo" imageUrl="https://placehold.co/80x80/10b981/ffffff?text=B" description="Lusayo is a member of the community and a web and cross-platform engineer, currently hacking together our site." />
                    <a href="https://discord.gg/KspzcBMysa" target="_blank" rel="noopener noreferrer" className="community-card text-center !bg-blue-500 hover:bg-blue-600">
                        <img src="https://placehold.co/80x80/1e40af/ffffff?text=?" alt="You" className="mx-auto" />
                        <h3 className="text-xl font-bold text-white mb-2">You</h3>
                        <p className="text-white-400">Join our community, learn, give feedback and increase your skills.</p>
                    </a>                        
                </div>
            </div>
        </section>
    </main>
);

export default CommunityPage;
