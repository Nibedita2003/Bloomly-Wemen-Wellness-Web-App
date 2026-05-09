

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTheme } from '../context/ThemeContext';
import { getDetailedCycleData } from '../utils/healthCalculations';

const CycleCard = () => {
  const { style } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cycleInfo, setCycleInfo] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Generate the highlights based on your calculations file
    const data = getDetailedCycleData(date);
    setCycleInfo(data);
  };

  // Assign classes to tiles for CSS styling
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && cycleInfo) {
      const dateStr = date.toDateString();
      if (cycleInfo.periodDays.includes(dateStr)) return 'bloom-period';
      if (cycleInfo.ovulationDate === dateStr) return 'bloom-ovulation';
      if (cycleInfo.fertileDays.includes(dateStr)) return 'bloom-fertile';
    }
    return null;
  };

  return (
    <div className={`p-8 rounded-[3rem] bg-white border ${style.border} shadow-2xl shadow-rose-100/30 transition-all`}>
      <header className="mb-6">
        <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          Bloomly Cycle Tracker
        </h2>
        <p className="text-xl font-black text-gray-800 italic">
          {cycleInfo ? "Cycle Mapped Successfully" : "Tap to Mark Period Start"}
        </p>
      </header>

      <div className="bloomly-calendar-container">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          tileClassName={tileClassName}
          className="border-none w-full"
        />
      </div>

      {cycleInfo && (
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <p className="text-[10px] font-black text-rose-400 uppercase mb-1">Next Period</p>
            <p className="text-sm font-bold text-gray-800">{cycleInfo.nextPeriodDate.toLocaleDateString()}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <p className="text-[10px] font-black text-purple-400 uppercase mb-1">Ovulation</p>
            <p className="text-sm font-bold text-gray-800">{new Date(cycleInfo.ovulationDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Scoped CSS for the Calendar Highlights */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .react-calendar { width: 100%; border: none; font-family: inherit; }
        .react-calendar__navigation button { color: #fb7185; font-weight: bold; }
        .react-calendar__tile { padding: 1.25em 0.5em !important; font-weight: 700; color: #4b5563; }
        
        /* Period (7 Days) */
        .bloom-period { background: #fb7185 !important; color: white !important; border-radius: 12px; }
        /* Ovulation (Day 14) */
        .bloom-ovulation { background: #a855f7 !important; color: white !important; border-radius: 12px; }
        /* Fertile Window */
        .bloom-fertile { background: #ffe4e6 !important; color: #fb7185 !important; border-radius: 12px; }
        
        .react-calendar__tile--active { background: #fecdd3 !important; color: #e11d48 !important; border-radius: 12px; }
      `}} />
    </div>
  );
};

export default CycleCard;