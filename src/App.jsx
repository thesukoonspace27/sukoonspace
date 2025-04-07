import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './LandingPageComponents/Header';
import LandingPage from './LandingPageComponents/LandingPage';
import Footer from './LandingPageComponents/Footer';

import VibrationsPage from './pages/VibrationsPage';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Pass count to Header */}
        <Header/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vibrations" element={<VibrationsPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
