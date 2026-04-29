import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. Context & Styles
import { ThemeProvider, useTheme } from './context/ThemeContext';

// 2. Main Page Components
import Navbar from './components/Navbar';
import CycleCard from './components/CycleCard';
import Stats from './components/Stats';
import MusicPlayer from './components/MusicPlayer';

// 3. Dedicated Pages
import LogPage from './pages/LogPage';

// --- DASHBOARD COMPONENT ---
const Dashboard = () => {
  const { style } = useTheme();

  return (
    <div className={`min-h-screen ${style.bg} pb-20 transition-colors duration-1000`}>
      {/* Navigation Bar */}
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 mt-10">
        {/* Welcome Header */}
        <header className="mb-10">
          <h3 className="text-gray-400 font-medium tracking-wide">Welcome back,</h3>
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
            Your Bloomly Dashboard
          </h1>
        </header>

        {/* Action: Link to Calendar Page */}
        <Link to="/update-period" className="block mb-8 group">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-rose-300 hover:bg-rose-50/30 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${style.button} text-white flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform`}>
                <span className="text-2xl font-bold">+</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Track Your Cycle</h3>
                <p className="text-sm text-gray-400">Update dates, see fertility & ovulation icons</p>
              </div>
            </div>
            <span className="text-gray-300 group-hover:text-rose-400 transition-colors font-black mr-2">OPEN CALENDAR</span>
          </div>
        </Link>

        {/* Cycle Prediction Section */}
        <div className="mb-8">
          <CycleCard />
        </div>

        {/* Health Stats (Hydration & BMI/Weight) */}
        <div className="mb-8">
          <Stats />
        </div>

        {/* Music Therapy Section */}
        <div className="mb-8">
          <MusicPlayer />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
            Bloomly Women's Wellness • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

// --- MAIN APP WRAPPER ---
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Dedicated Calendar Page Route */}
          <Route path="/update-period" element={<LogPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;