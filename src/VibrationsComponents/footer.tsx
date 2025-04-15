import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 py-4 px-6">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-sm text-gray-400">
          © 2025 The Sukoon Space
        </div>
        
        <div className="flex space-x-4 text-sm text-gray-400">
          <a href="#" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Contact Us</a>
          <a href="#" className="hover:text-white">Sign Up as a Teacher</a>
        </div>
        
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">FB</a>
          <a href="#" className="text-gray-400 hover:text-white">TW</a>
          <a href="#" className="text-gray-400 hover:text-white">IG</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;