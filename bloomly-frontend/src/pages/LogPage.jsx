import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { Settings, Edit2, Plus, Calendar as CalIcon, Heart, BarChart3, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const LogPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // Month track karne ke liye

  // Maan lijiye user ne Day 1 select kiya hai (Isse backend/localStorage se connect kar sakte hain)
  const lastPeriodStart = useMemo(() => {
    const d = new Date(selectedDate);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, [selectedDate]);

  // --- PREDICTION ENGINE (Based on your Table) ---
  const getDayStatus = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = d - lastPeriodStart;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 28; // 28-day cycle assumption
    
    const cycleDay = diffDays < 0 ? diffDays + 28 : diffDays;

    // 1. Menstrual: Days 0-5 (Total 6 days)
    if (cycleDay >= 0 && cycleDay <= 5) {
      return { type: 'menstrual', status: 'LOW - Period Phase', color: 'text-rose-500', bg: 'bg-rose-400', symbol: cycleDay + 1 };
    }
    // 2. Follicular: Days 6-8
    if (cycleDay >= 6 && cycleDay <= 8) {
      return { type: 'low', status: 'LOW - Minimal Chance', color: 'text-gray-400', bg: 'bg-gray-300', symbol: null };
    }
    // 3. Fertile: Days 9-12 (Leading to ovulation)
    if (cycleDay >= 9 && cycleDay <= 12) {
      return { type: 'fertile', status: 'HIGH - Fertile Window', color: 'text-purple-500', bg: 'bg-purple-400', symbol: '🌱' };
    }
    // 4. Ovulation: Day 13 (Day 14 of cycle)
    if (cycleDay === 13) {
      return { type: 'ovulation', status: 'PEAK - Ovulation Day', color: 'text-purple-600', bg: 'bg-purple-500', symbol: '🥚' };
    }
    // 5. Luteal: Days 14-27
    return { type: 'low', status: 'LOW - Minimal Chance', color: 'text-gray-400', bg: 'bg-gray-300', symbol: null };
  };

  const currentStatus = getDayStatus(selectedDate);

  return (
    <div className="min-h-screen bg-[#FDFCFM] pb-32 font-sans">
      {/* Header with Month Name */}
      <header className="p-5 flex justify-between items-center">
        <button className="text-gray-400"><Settings size={22} /></button>
        <div className="text-center">
          <span className="text-[10px] font-black text-rose-300 uppercase tracking-widest block">
            {activeStartDate.toLocaleString('default', { year: 'numeric' })}
          </span>
          <h1 className="text-xl font-black text-gray-800 italic uppercase tracking-tighter">
            {activeStartDate.toLocaleString('default', { month: 'long' })}
          </h1>
        </div>
        <button className="text-gray-400 rotate-90"><Settings size={22} /></button>
      </header>

      {/* Floating 12-Month Navigation Calendar */}
      <div className="px-5">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-rose-100/40 overflow-hidden border border-rose-50/50 relative">
          
          {/* Custom Navigation for Month Switching */}
          <div className="flex justify-between p-4 absolute w-full z-10 pointer-events-none">
            <button 
              onClick={() => setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() - 1)))}
              className="pointer-events-auto p-2 bg-white/50 rounded-full text-gray-400"
            ><ChevronLeft size={20}/></button>
            <button 
              onClick={() => setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() + 1)))}
              className="pointer-events-auto p-2 bg-white/50 rounded-full text-gray-400"
            ><ChevronRight size={20}/></button>
          </div>

          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
            showNavigation={false} // Custom navigation used above
            tileClassName={({ date }) => {
              const info = getDayStatus(date);
              if (info.type === 'menstrual') return 'menstrual-tile-active';
              if (info.type === 'fertile' || info.type === 'ovulation') return 'fertile-tile';
              return null;
            }}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const info = getDayStatus(date);
                if (typeof info.symbol === 'number') return <span className="mt-auto text-[10px] font-black opacity-60">{info.symbol}</span>;
                return <span className="absolute top-1 right-1 text-[10px]">{info.symbol}</span>;
              }
            }}
            className="bloomly-mini-grid"
          />
        </div>
      </div>

      {/* Prediction Details */}
      <div className="px-8 mt-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-rose-400" />
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Prediction</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 italic">
              {selectedDate.getDate()} <span className="text-rose-400">{selectedDate.toLocaleString('default', { month: 'short' })}</span>
            </h2>
          </div>
          <button className="bg-rose-50 text-rose-500 p-4 rounded-full shadow-sm hover:scale-105 transition-all"><Edit2 size={20} /></button>
        </div>

        <div className={`flex items-center gap-3 p-5 rounded-[2rem] bg-white border border-gray-50 shadow-sm ${currentStatus.color}`}>
          <div className={`w-3 h-3 rounded-full animate-pulse ${currentStatus.bg}`}></div>
          <span className="font-black text-sm uppercase tracking-tight">{currentStatus.status}</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50">
        <div className="flex flex-col items-center text-gray-300"><Settings size={22} /><span className="text-[8px] font-black mt-1 uppercase text-center">Today</span></div>
        <div className="flex flex-col items-center text-rose-500 relative"><CalIcon size={22} /><span className="text-[8px] font-black mt-1 uppercase">Calendar</span><div className="absolute -bottom-2 w-1 h-1 bg-rose-500 rounded-full"></div></div>
        <div className="relative -top-10"><button className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-xl border-[6px] border-[#FDFCFM]"><Plus size={30} strokeWidth={3} /></button></div>
        <div className="flex flex-col items-center text-gray-300"><Heart size={22} /><span className="text-[8px] font-black mt-1 uppercase text-center">Care</span></div>
        <div className="flex flex-col items-center text-gray-300"><BarChart3 size={22} /><span className="text-[8px] font-black mt-1 uppercase text-center">Logs</span></div>
      </nav>

      <style>{`
        .bloomly-mini-grid { width: 100% !important; border: none !important; padding: 15px; }
        .react-calendar__month-view__weekdays {
          text-align: center; font-size: 0.75rem; font-weight: 900; color: #1a202c !important;
          text-transform: uppercase; padding-bottom: 12px; border-bottom: 1px solid #f7fafc;
        }
        .react-calendar__tile { 
          height: 60px; border-right: 1px solid #FFF5F7 !important; border-bottom: 1px solid #FFF5F7 !important;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.85rem; color: #4A5568; position: relative;
        }
        .menstrual-tile-active { background: #FFF1F2 !important; color: #F43F5E !important; }
        .fertile-tile { background: #FEFCE8 !important; }
        .react-calendar__tile--active { background: transparent !important; border: 3px solid #D6BCFA !important; border-radius: 12px; z-index: 20; }
        .react-calendar__tile--now { background: #FFF5F7; color: #F43F5E; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LogPage;