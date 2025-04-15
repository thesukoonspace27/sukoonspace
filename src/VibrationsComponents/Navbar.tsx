import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-5 bg-neutral-800">
      <div className="text-xl font-medium">The Sukoon Space</div>
      <div className="space-x-4">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Vibrations</a>
      </div>
    </nav>
  );
};

export default Navbar;