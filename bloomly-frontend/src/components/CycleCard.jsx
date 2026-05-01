// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useTheme } from '../context/ThemeContext';
// import { getDetailedCycleData } from '../utils/healthCalculations';

// const CycleCard = () => {
//   const { style } = useTheme();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [cycleInfo, setCycleInfo] = useState(null);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     // Generate all highlighted dates based on the clicked start date
//     const data = getDetailedCycleData(date);
//     setCycleInfo(data);
//   };

//   // Logic to inject custom CSS classes into the calendar tiles
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month' && cycleInfo) {
//       const dateStr = date.toDateString();

//       if (cycleInfo.periodDays.includes(dateStr)) return 'bloomly-period';
//       if (cycleInfo.ovulationDate === dateStr) return 'bloomly-ovulation';
//       if (cycleInfo.fertileDays.includes(dateStr)) return 'bloomly-fertile';
//     }
//     return null;
//   };

//   return (
//     <div className={`p-8 rounded-[3rem] bg-white border ${style.border} shadow-2xl shadow-rose-100/40`}>
//       <header className="mb-6 flex justify-between items-start">
//         <div>
//           <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
//             Manual Tracker
//           </h2>
//           <p className="text-2xl font-black text-gray-800 italic">
//             {cycleInfo ? "Cycle Mapped" : "Mark Start Date"}
//           </p>
//         </div>
//         {cycleInfo && (
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-rose-400 uppercase">Next Prediction</p>
//             <p className="text-sm font-black text-gray-700">
//               {cycleInfo.nextPeriodDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//             </p>
//           </div>
//         )}
//       </header>

//       <div className="bloomly-calendar-wrapper">
//         <Calendar
//           onChange={handleDateClick}
//           value={selectedDate}
//           tileClassName={tileClassName}
//           className="border-none w-full font-sans"
//         />
//       </div>

//       {/* Legend and Key */}
//       <div className="mt-8 flex justify-around items-center border-t border-gray-50 pt-6">
//         <div className="flex flex-col items-center gap-1">
//           <div className="w-8 h-2 rounded-full bg-rose-400"></div>
//           <span className="text-[9px] font-black text-gray-400 uppercase">Period</span>
//         </div>
//         <div className="flex flex-col items-center gap-1">
//           <div className="w-8 h-2 rounded-full bg-rose-100"></div>
//           <span className="text-[9px] font-black text-gray-400 uppercase">Fertile</span>
//         </div>
//         <div className="flex flex-col items-center gap-1">
//           <div className="w-8 h-2 rounded-full bg-purple-500"></div>
//           <span className="text-[9px] font-black text-gray-400 uppercase">Ovulation</span>
//         </div>
//       </div>

//       {/* Custom Scoped Styles */}
//       <style dangerouslySetInnerHTML={{
//         __html: `
//         .react-calendar { border: none !important; width: 100% !important; }
//         .react-calendar__navigation button { color: #fb7185; font-weight: 900; font-size: 1.1rem; }
//         .react-calendar__tile { padding: 1.2em 0.5em !important; font-weight: 700; color: #4b5563; }
//         .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none; font-size: 0.7rem; color: #d1d5db; }

//         /* Highlight Classes */
//         .bloomly-period { background: #fb7185 !important; color: white !important; border-radius: 12px; }
//         .bloomly-ovulation { background: #a855f7 !important; color: white !important; border-radius: 12px; }
//         .bloomly-fertile { background: #ffe4e6 !important; color: #fb7185 !important; border-radius: 12px; }

//         /* Overriding active/current day styles */
//         .react-calendar__tile--active { background: #fecdd3 !important; color: #e11d48 !important; border-radius: 12px; }
//         .react-calendar__tile--now { background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; }
//       `}} />
//     </div>
//   );
// };

// export default CycleCard;

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