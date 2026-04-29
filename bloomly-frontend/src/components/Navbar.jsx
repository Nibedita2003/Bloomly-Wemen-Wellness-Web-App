import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme, moodStyles } from '../context/ThemeContext';

const Navbar = () => {
  // We pull the current mood and the "setMood" function from our Context
  const { mood, setMood, style } = useTheme();

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-white/30 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-xl ${style.button} text-white shadow-lg transition-colors`}>
          <Sparkles size={20} />
        </div>
        <h1 className="text-xl font-black text-gray-800 tracking-tight">Bloomly</h1>
      </div>
      
      {/* Mood Switcher Section */}
      <div className="flex bg-gray-200/50 p-1 rounded-full shadow-inner">
        {Object.keys(moodStyles).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              mood === m 
                ? `${style.button} text-white shadow-md scale-105` 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;