import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CycleCard from '../components/CycleCard';

const LogPage = () => {
  const { style } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSaveCycle = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('bloomly_user'));

      // Calculate a 7-day period if end date isn't manually specified
      // Start Date + 6 days = 7 total days of period
      const endDate = new Date(selectedDate);
      endDate.setDate(selectedDate.getDate() + 6);

      const response = await fetch('http://localhost:5000/api/cycle/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          lastPeriodDate: selectedDate,
          predictedEndDate: endDate
        }),
      });

      if (response.ok) {
        alert('Cycle updated! We marked a 7-day window for you.');
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to save cycle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${style.bg} p-6 transition-colors duration-1000`}>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 mb-8 hover:text-rose-400 font-bold transition-colors"
      >
        <ArrowLeft size={20} /> DASHBOARD
      </button>

      <div className="max-w-md mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-rose-400" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Manual Logger
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">Log Period</h1>
          <p className="text-gray-400 text-sm mt-1">
            Pick your start date. We'll automatically mark a 7-day period for you.
          </p>
        </header>

        {/* Interactive Calendar Component */}
        <CycleCard onDateChange={setSelectedDate} />

        <button
          onClick={handleSaveCycle}
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-3xl font-black shadow-xl hover:bg-black transition-all active:scale-95"
        >
          <Save size={18} /> {loading ? 'SAVING...' : 'CONFIRM DATES'}
        </button>

        <div className="mt-8 p-6 bg-white/60 rounded-[2rem] border border-dashed border-gray-200">
          <p className="text-xs text-gray-500 italic">
            Note: Bloomly predicts a 7-day duration by default. You can adjust this in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogPage;