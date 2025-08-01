import React from 'react';

interface NavLinkProps {
    children: React.ReactNode;
    onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ onClick, children }) => (
    <button onClick={onClick} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer text-white">
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
                <a href="https://discord.gg/KspzcBMysa" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Join Now
                </a>
            </div>
        </header>
    );
};

export default Header;
