import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { useTheme } from '../context/ThemeContext';
import { Edit2, Sparkles, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import PeriodCalendar from '../components/PeriodCalendar';
import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore"; 
import 'react-calendar/dist/Calendar.css';

const LogPage = () => {
  const { style } = useTheme(); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // --- Updated Firebase Logic with Duplicate Check ---
  const handleMarkPeriodStart = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first!");
      return;
    }

    setIsSaving(true);
    try {
      // Date string format: YYYY-MM-DD
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      // 1. Check if period already exists for this specific date
      const q = query(
        collection(db, "users", user.uid, "periods"),
        where("startDate", "==", dateStr)
      );
      
      const existingSnap = await getDocs(q);

      if (!existingSnap.empty) {
        alert("Is date ka period pehle se hi marked hai!");
        setIsSaving(false);
        return; 
      }

      // 2. Add document with same structure as PlusPage for syncing
      await addDoc(collection(db, "users", user.uid, "periods"), {
        startDate: dateStr,
        endDate: "", // Empty so it's treated as an active period
        status: "active",
        createdAt: serverTimestamp(),
        note: "Manually logged from LogPage"
      });

      alert(`Period marked for ${dateStr}!`);
    } catch (error) {
      console.error("Error saving period:", error);
      alert("Kuch error aaya, please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const lastPeriodStart = useMemo(() => {
    const d = new Date(selectedDate);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, [selectedDate]);

  const getThemeAccent = () => {
    if (style.button.includes('rose')) return { hex: '#FB7185', tailwind: 'rose' };
    if (style.button.includes('blue')) return { hex: '#60A5FA', tailwind: 'blue' };
    return { hex: '#34D399', tailwind: 'emerald' };
  };

  const theme = getThemeAccent();

  const getDayStatus = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = d - lastPeriodStart;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 28;
    const cycleDay = diffDays < 0 ? diffDays + 28 : diffDays;

    if (cycleDay >= 0 && cycleDay <= 5) {
      return { type: 'menstrual', status: 'LOW - Period Phase', color: `text-${theme.tailwind}-500`, bg: `bg-${theme.tailwind}-400`, symbol: cycleDay + 1 };
    }
    if (cycleDay >= 9 && cycleDay <= 12) {
      return { type: 'fertile', status: 'HIGH - Fertile Window', color: 'text-purple-500', bg: 'bg-purple-400', symbol: '🌱' };
    }
    if (cycleDay === 13) {
      return { type: 'ovulation', status: 'PEAK - Ovulation Day', color: 'text-purple-600', bg: 'bg-purple-500', symbol: '🥚' };
    }
    return { type: 'low', status: 'LOW - Minimal Chance', color: 'text-gray-400', bg: 'bg-gray-300', symbol: null };
  };

  const currentStatus = getDayStatus(selectedDate);

  return (
    <div className={`min-h-screen ${style.bg} pb-32 font-sans transition-colors duration-1000`}>
      <div className="px-8 pt-8">
        <TopBar pathname="/log" />
      </div>

      <header className="px-8 pb-8 text-center">
        <span className={`text-[11px] font-black opacity-60 uppercase tracking-[0.3em] block mb-1`}>
          {activeStartDate.getFullYear()}
        </span>
        <h1 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter">
          {activeStartDate.toLocaleString('default', { month: 'long' })}
        </h1>
      </header>

      <div className="px-5">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/40 overflow-hidden border border-white relative">
          <div className="flex justify-between p-4 absolute w-full z-10 pointer-events-none">
            <button
              onClick={() => setActiveStartDate((current) => {
                  const next = new Date(current);
                  next.setMonth(current.getMonth() - 1);
                  return next;
                })
              }
              className="pointer-events-auto p-2 text-gray-300 hover:text-gray-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setActiveStartDate((current) => {
                  const next = new Date(current);
                  next.setMonth(current.getMonth() + 1);
                  return next;
                })
              }
              className="pointer-events-auto p-2 text-gray-300 hover:text-gray-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
            showNavigation={false}
            tileClassName={({ date }) => {
              const info = getDayStatus(date);
              if (info.type === 'menstrual') return 'menstrual-tile-dynamic';
              if (info.type === 'fertile' || info.type === 'ovulation') return 'fertile-tile';
              return null;
            }}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const info = getDayStatus(date);
                if (typeof info.symbol === 'number') return <span className="mt-auto text-[10px] font-black opacity-40">{info.symbol}</span>;
                return <span className="absolute top-1 right-1 text-[10px]">{info.symbol}</span>;
              }
            }}
            className="bloomly-mini-grid"
          />
        </div>
      </div>

      <div className="px-8 mt-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className={currentStatus.color} />
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Prediction</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              {selectedDate.getDate()} <span className={currentStatus.color}>{selectedDate.toLocaleString('default', { month: 'short' })}</span>
            </h2>
          </div>
          <button className={`bg-white ${currentStatus.color} p-4 rounded-2xl shadow-sm hover:scale-105 border border-gray-50`}><Edit2 size={20} /></button>
        </div>

        {/* MARK PERIOD BUTTON with Sync Logic */}
        <button 
          onClick={handleMarkPeriodStart}
          disabled={isSaving}
          className={`w-full mb-4 flex items-center justify-center gap-3 p-6 rounded-[2.5rem] bg-rose-500 text-white shadow-lg shadow-rose-100 active:scale-95 transition-all disabled:opacity-50`}
        >
          <PlusCircle size={20} />
          <span className="font-black text-sm uppercase tracking-widest">
            {isSaving ? 'Saving...' : 'Mark Period Start'}
          </span>
        </button>

        <div className={`flex items-center gap-3 p-6 rounded-[2.5rem] bg-white border border-gray-50 shadow-sm ${currentStatus.color}`}>
          <div className={`w-3 h-3 rounded-full animate-pulse ${currentStatus.bg}`}></div>
          <span className="font-black text-sm uppercase tracking-tight">{currentStatus.status}</span>
        </div>
      </div>

      <div className="px-8 mt-8">
        <PeriodCalendar startDate={lastPeriodStart} />
      </div>

      <style>{`
        .bloomly-mini-grid { width: 100% !important; border: none !important; padding: 20px; }
        .react-calendar__tile { 
          height: 65px; display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.9rem; color: #4A5568; position: relative;
        }
        .menstrual-tile-dynamic { 
          background-color: ${theme.hex}15 !important; 
          color: ${theme.hex} !important; 
        }
        .react-calendar__tile--active { 
          background: transparent !important; 
          border: 3px solid ${theme.hex} !important; 
          border-radius: 16px; z-index: 20; 
          color: ${theme.hex} !important;
        }
        .react-calendar__tile--now { 
          background: #f8fafc; 
          border-radius: 12px; 
        }
        .fertile-tile { background: #FEFCE8 !important; }
        .react-calendar__month-view__weekdays {
          text-transform: uppercase; font-weight: 900; font-size: 0.7rem; color: #CBD5E0;
          padding-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default LogPage;