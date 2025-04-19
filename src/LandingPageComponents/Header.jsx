import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ setShowHeader }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showHeader, setShowHeaderState] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state based on the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
  }, []);

  const handleAuth = () => {
    if (auth) {
      localStorage.removeItem('token');
      setAuth(false);
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeaderState(false);  // Hide header on scroll down
      } else {
        setShowHeaderState(true);   // Show header on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update parent component with showHeader state
  useEffect(() => {
    setShowHeader(showHeader);
  }, [showHeader, setShowHeader]);

  return (
    <header
      className={`p-4 bg-sukoon-cream shadow-md fixed top-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer font-bold">The Sukoon Space</h1>
        </div>
        <button
          className="block md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex space-x-4`}>
          <button onClick={handleAuth} className="hover:underline">
            {auth ? 'Logout' : 'Sign Up'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
