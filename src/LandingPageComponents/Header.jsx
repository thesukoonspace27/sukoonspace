import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isHome }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate(); // To handle redirection after logout

    // Initialize auth state based on the token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(true); // User is authenticated
        } else {
            setAuth(false); // User is not authenticated
        }
    }, ); 

    const handleAuth = () => {
        if (auth) {
            // Logout: Remove token from localStorage and navigate to signup page
            localStorage.removeItem('token');
            setAuth(false); // Update state to reflect logout
            navigate('/signup'); // Redirect to signup page after logout
        } else {
            // Redirect to signup page for login/signup
            navigate('/signup');
        }
    };

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
                    <h1 className="text-xl font-bold">The Sukoon Space</h1>
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
                    <button
                        onClick={handleAuth}
                        className="hover:underline"
                    >
                        {auth ? 'Logout' : 'Sign Up'}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
