import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar as CalIcon, Plus, Heart, BarChart3 } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Current page ko highlight karne ke liye logic
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-50 px-6 py-4 flex justify-between items-center z-50">
      
      {/* 1. Dashboard/Home Button */}
      <button 
        onClick={() => navigate('/')} 
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all active:scale-90 ${isActive('/') ? 'text-rose-500' : 'text-gray-300'}`}
      >
        <Home size={24} />
        <span className="text-[8px] font-black mt-1 uppercase">Home</span>
      </button>

      {/* 2. Calendar/Log Button (Current Page) */}
      <button 
        onClick={() => navigate('/log')} 
        className={`flex flex-col items-center justify-center w-16 h-12 relative transition-all active:scale-90 ${isActive('/log') ? 'text-rose-500' : 'text-gray-300'}`}
      >
        <CalIcon size={24} />
        <span className="text-[8px] font-black mt-1 uppercase">Calendar</span>
        {/* Active Indicator Dot */}
        {isActive('/log') && (
          <div className="absolute -bottom-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
        )}
      </button>
      
      {/* 3. Floating Action Button (Plus) */}
      <div className="relative -top-8 px-2">
        <button 
          onClick={() => console.log('Open Add Modal')}
          className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-2xl shadow-rose-200 border-[6px] border-[#FDFCFM] active:scale-95 transition-all"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
      </div>

      {/* 4. Care Button */}
      <button 
        onClick={() => console.log('Navigate to Care')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all active:scale-90 ${isActive('/care') ? 'text-rose-500' : 'text-gray-300'}`}
      >
        <Heart size={24} />
        <span className="text-[8px] font-black mt-1 uppercase">Care</span>
      </button>

      {/* 5. Analysis/Stats Button */}
      <button 
        onClick={() => console.log('Navigate to Stats')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all active:scale-90 ${isActive('/stats') ? 'text-rose-500' : 'text-gray-300'}`}
      >
        <BarChart3 size={24} />
        <span className="text-[8px] font-black mt-1 uppercase">Analysis</span>
      </button>

    </nav>
  );
};

export default BottomNav;