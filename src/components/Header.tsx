import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface NavLinkProps {
    children: React.ReactNode;
    onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ onClick, children }) => (
    <button type="button" onClick={onClick} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer text-white">
        {children}
    </button>
);

const Header: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
    const { user, logout } = useAuth(); // Use the useAuth hook

    return (
        <header className="fixed w-full top-0 z-50 glass-effect">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => setCurrentPage('home')} className="text-2xl font-bold tracking-tighter bg-transparent border-none cursor-pointer text-white">PragmaDAO</button>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink onClick={() => setCurrentPage('lessons')}>Lessons</NavLink>
                    <NavLink onClick={() => setCurrentPage('community')}>Community</NavLink>
                    {user ? (
                        <>
                            <NavLink onClick={() => setCurrentPage('profile')}>Profile</NavLink>
                            <span className="text-white">Welcome, {user.username}!</span>
                            <NavLink onClick={logout}>Logout</NavLink>
                        </>
                    ) : (
                        <>
                            {/* Assuming you'll have login/register pages/modals */}
                            <NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>
                            <NavLink onClick={() => setCurrentPage('register')}>Register</NavLink>
                        </>
                    )}
                </nav>
                <a href="https://discord.gg/KspzcBMysa" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Join Now
                </a>
            </div>
        </header>
    );
};

export default Header;
