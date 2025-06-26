import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './LandingPageComponents/Header';
import LandingPage from './pages/LandingPage';
import Footer from './LandingPageComponents/Footer';
import Auth from './pages/Auth';
import VibrationsPage from './pages/VibrationsPage';
import CourseDetails from './pages/CoursePayment';
import YogaCoursesPage from './pages/YogaCoursesPage';


function App() {
  const [showHeader, setShowHeader] = useState(true); // State to track header visibility

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Pass the showHeader state to Header */}
        <Header setShowHeader={setShowHeader} />

        {/* Apply margin-top dynamically based on showHeader state */}
        <main
          className="flex-grow"
          style={{
            marginTop: showHeader ? '64px' : '0px', // Adjust the margin-top based on header visibility
          }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vibrations" element={<VibrationsPage />} />
            <Route path="/yoga-courses" element={<YogaCoursesPage />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/course/:courseId/" element={<CourseDetails />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
