import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isHome }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={`p-4 bg-sukoon-cream shadow-md fixed w-full z-10`}>
            {/* Add bg-transparent if isHome, else bg-white */}
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
                    ☰ {/* Hamburger icon */}
                </button>
                <nav
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:flex space-x-4`}
                >
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/vibrations" className="hover:underline">
                        Vibrations
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;