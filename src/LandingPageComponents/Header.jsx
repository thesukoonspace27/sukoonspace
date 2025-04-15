import React, { useState, useEffect, use } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isHome }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
                setShowHeader(false); // Scroll down -> hide
            } else {
                setShowHeader(true); // Scroll up -> show
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`p-4 bg-sukoon-cream shadow-md fixed w-full z-50 transition-transform duration-300 ${
                showHeader ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="hover:cursor-pointer">
                        <h1 className="text-xl font-bold">The Sukoon Space</h1>
                    </Link>
                </div>
                <button
                    className="block md:hidden text-xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
                <nav
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:flex space-x-4`}
                >
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/signup" className="hover:underline">
                        {isLoggedIn ? 'Logout' : 'Sign Up'}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
