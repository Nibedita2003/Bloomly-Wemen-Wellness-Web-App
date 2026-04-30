import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { Leaf, Target, ArrowLeft, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import 'react-calendar/dist/Calendar.css';

const LogPage = () => {
  const { style } = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const cycleLength = 28;

  const handleSaveCycle = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('bloomly_user'));
      const response = await fetch('http://localhost:5000/api/cycle/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, lastPeriodDate: selectedDate }),
      });
      if (response.ok) alert('Cycle updated successfully!');
    } catch (err) {
      console.error('Failed to save cycle');
    } finally {
      setLoading(false);
    }
  };

  const renderTileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const diffTime = date.getTime() - selectedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const cycleDay = ((diffDays % cycleLength) + cycleLength) % cycleLength;

    if (cycleDay === 14) return <div className="flex justify-center mt-1"><Target size={14} className="text-purple-500 animate-bounce" /></div>;
    if (cycleDay >= 9 && cycleDay < 14) return <div className="flex justify-center mt-1"><Leaf size={14} className="text-emerald-500" /></div>;
    return null;
  };

  return (
    <div className={`min-h-screen ${style.bg} p-6`}>
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-800 font-bold">
        <ArrowLeft size={20} /> Dashboard
      </button>

      <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-gray-800">Update Cycle</h1>
          <p className="text-sm text-gray-400">Select the first day of your last period.</p>
        </header>

        <div className="bloomly-calendar-wrapper">
          <Calendar onChange={setSelectedDate} value={selectedDate} tileContent={renderTileContent} />
        </div>

        <button
          onClick={handleSaveCycle}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
        >
          <Save size={18} /> {loading ? 'Saving...' : 'Save Cycle Data'}
        </button>

        <div className="mt-8 grid grid-cols-1 gap-3">
          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <Leaf size={16} className="text-emerald-500" />
            <p className="text-sm text-emerald-600 font-medium">Fertility Phase (High chance)</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <Target size={16} className="text-purple-500" />
            <p className="text-sm text-purple-600 font-medium">Ovulation Day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPage;