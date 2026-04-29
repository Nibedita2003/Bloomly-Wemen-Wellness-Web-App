import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { Leaf, Target, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import 'react-calendar/dist/Calendar.css';

const LogPage = () => {
  const { style } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const cycleLength = 28;

  const renderTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    // Standard JS math to find the difference in days
    const diffTime = date.getTime() - selectedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Create the repeating cycle effect
    const cycleDay = ((diffDays % cycleLength) + cycleLength) % cycleLength;

    // Ovulation Day (Day 14 of cycle)
    if (cycleDay === 14) {
      return (
        <div className="flex justify-center mt-1">
          <Target size={14} className="text-purple-500 animate-bounce" />
        </div>
      );
    }
    
    // Fertility Window (Days 9 to 13)
    if (cycleDay >= 9 && cycleDay < 14) {
      return (
        <div className="flex justify-center mt-1">
          <Leaf size={14} className="text-emerald-500" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${style.bg} p-6 transition-colors duration-500`}>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-800 transition-colors font-bold"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-gray-800 tracking-tighter">Update Cycle</h1>
          <p className="text-sm text-gray-400 font-medium">The calendar will project your fertility phases automatically.</p>
        </header>
        
        <div className="bloomly-calendar-wrapper">
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            tileContent={renderTileContent}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3">
          <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="bg-emerald-500 p-2 rounded-lg text-white"><Leaf size={16} /></div>
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Fertility Phase</p>
              <p className="text-sm text-emerald-600 font-medium">High chance of conception</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
            <div className="bg-purple-500 p-2 rounded-lg text-white"><Target size={16} /></div>
            <div>
              <p className="text-xs font-bold text-purple-800 uppercase tracking-widest">Ovulation Day</p>
              <p className="text-sm text-purple-600 font-medium">Estimated release of ovule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPage;