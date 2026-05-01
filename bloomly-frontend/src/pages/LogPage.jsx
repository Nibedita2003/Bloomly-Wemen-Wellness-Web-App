import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import 'react-calendar/dist/Calendar.css';

const LogPage = () => {
  const { style } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menstrualDays, setMenstrualDays] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic: The date you click is Day 1. We highlight 6 total days (Day 1 + 5 more).
  useEffect(() => {
    const start = new Date(selectedDate);
    const window = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toDateString();
    });
    setMenstrualDays(window);
  }, [selectedDate]);

  const handleSaveCycle = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('bloomly_user'));
      const response = await fetch('http://localhost:5000/api/cycle/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          lastPeriodDate: selectedDate
        }),
      });

      if (response.ok) {
        alert('6-day cycle window confirmed!');
        navigate('/');
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTileClass = ({ date, view }) => {
    if (view === 'month' && menstrualDays.includes(date.toDateString())) {
      return 'menstrual-highlight';
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${style.bg} p-6 transition-colors duration-1000`}>
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 mb-8 font-bold hover:text-rose-400 transition-colors">
        <ArrowLeft size={20} /> DASHBOARD
      </button>

      <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-rose-400" />
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Wellness Logger</span>
          </div>
          <h1 className="text-3xl font-black text-gray-800 italic tracking-tighter">Log Period</h1>
          <p className="text-sm text-gray-400">Click your start date (Day 1). We'll mark 6 days total.</p>
        </header>

        <div className="bloomly-calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={getTileClass}
            className="bloomly-main-cal"
          />
        </div>

        <button
          onClick={handleSaveCycle}
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-3xl font-black shadow-lg hover:bg-black transition-all active:scale-95"
        >
          <Save size={18} /> {loading ? 'SAVING...' : 'CONFIRM 6-DAY WINDOW'}
        </button>

        <div className="mt-8 p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-400"></div>
          <p className="text-xs text-rose-600 font-bold uppercase tracking-tighter">
            Menstrual Window Marked (6 Days)
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .bloomly-main-cal { width: 100% !important; border: none !important; font-family: inherit !important; }
        .react-calendar__navigation button { color: #fb7185; font-weight: 900; }
        .react-calendar__tile { padding: 1.2em 0.5em !important; font-weight: 700; color: #4b5563; }
        
        .menstrual-highlight { 
            background: #fb7185 !important; 
            color: white !important; 
            border-radius: 12px; 
        }
        
        .react-calendar__tile--active { background: #fecdd3 !important; color: #e11d48 !important; border-radius: 12px; }
      `}} />
    </div>
  );
};

export default LogPage;