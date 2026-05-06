import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Theme import kiya
import { Home, Calendar, Plus, Heart, BarChart3 } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { style } = useTheme(); // Current theme style nikaala

  const isActive = (path) => location.pathname === path;

  // Theme ke hisab se active color decide karein
  const activeColor = style.button.replace('bg-', 'text-'); 

  return (
    <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
      <button onClick={() => navigate('/')} 
        className={`flex flex-col items-center gap-1 transition-all ${isActive('/') ? activeColor : 'text-gray-300'}`}>
        <Home size={24} />
        <span className="text-[8px] font-black uppercase">Home</span>
      </button>

      <button onClick={() => navigate('/log')} 
        className={`flex flex-col items-center gap-1 relative transition-all ${isActive('/log') ? activeColor : 'text-gray-300'}`}>
        <Calendar size={24} />
        <span className="text-[8px] font-black uppercase">Log</span>
        {isActive('/log') && <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${style.button}`}></div>}
      </button>
      
      <div className="relative -top-8 px-2">
        <button
          onClick={() => navigate('/log')}
          className={`w-14 h-14 ${style.button} rounded-full flex items-center justify-center text-white shadow-xl border-[4px] border-[#FDFCFM] active:scale-95 transition-all`}
          title="Quick log"
        >
          <Plus size={28} strokeWidth={3} />
        </button>
      </div>

      <button onClick={() => navigate('/care')} 
        className={`flex flex-col items-center gap-1 transition-all ${isActive('/care') ? activeColor : 'text-gray-300'}`}>
        <Heart size={24} />
        <span className="text-[8px] font-black uppercase">Care</span>
      </button>

      <button onClick={() => navigate('/stats')} 
        className={`flex flex-col items-center gap-1 transition-all ${isActive('/stats') ? activeColor : 'text-gray-300'}`}>
        <BarChart3 size={24} />
        <span className="text-[8px] font-black uppercase">Stats</span>
      </button>
    </nav>
  );
};

export default BottomNav;
