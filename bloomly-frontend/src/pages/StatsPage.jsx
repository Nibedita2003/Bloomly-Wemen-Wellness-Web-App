import React from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Stats from '../components/Stats';
import PeriodCalendar from '../components/PeriodCalendar';
import { useTheme } from '../context/ThemeContext';

const StatsPage = ({ user, onLogout }) => {
  const { style } = useTheme();

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000`}>
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <TopBar pathname="/stats" />

        <header className="mb-10">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">
            Wellness Metrics
          </p>
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
            Track the numbers that matter
          </h1>
        </header>

        <div className="mb-8">
          <Stats />
        </div>

        <PeriodCalendar />
      </main>
    </div>
  );
};

export default StatsPage;
