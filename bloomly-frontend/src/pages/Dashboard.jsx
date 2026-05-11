import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar'; 
import TopBar from '../components/TopBar';
import Stats from '../components/Stats';
import MusicPlayer from '../components/MusicPlayer';
import TodayStatus from '../components/TodayStatus';
import { Droplets, Activity, ChevronRight, Settings, Bell, Sparkles } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const { style } = useTheme();

  const cycleInfo = {
    currentDay: 26,
    daysLeft: 6,
    nextPeriod: "May 17",
    nextFertile: "May 29",
    nextOvulation: "May 24", // New Section added
    status: "LOW - Chance of getting pregnant"
  };

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000 font-sans relative overflow-hidden`}>
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-[-10%] w-72 h-72 bg-rose-100/30 rounded-full blur-[80px] -z-10"></div>
      
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <TopBar pathname="/" />

        {/* --- HEADER WITH FADE-IN ANIMATION --- */}
        <div className="flex justify-between items-center mb-10 animate-in fade-in duration-700">
          <Settings className="text-gray-400 cursor-pointer hover:rotate-90 transition-transform duration-500" size={22} />
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Period</p>
            <h2 className="text-4xl font-black text-gray-800 italic tracking-tighter">
              {cycleInfo.daysLeft} DAYS LEFT
            </h2>
            <p className="text-[11px] font-bold text-gray-400 mt-1">{cycleInfo.nextPeriod} - Next Period</p>
          </div>
          <Bell className="text-gray-400 cursor-pointer hover:animate-bounce" size={22} />
        </div>

        {/* --- ACTION BUTTON WITH BOUNCE EFFECT --- */}
        <div className="flex justify-center mb-12 animate-in slide-in-from-bottom-4 duration-1000">
          <button className="bg-[#FF2D78] text-white px-12 py-4 rounded-full font-black text-lg shadow-xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-b-4 border-rose-600">
            Period Starts
          </button>
        </div>

        {/* --- PREDICTION CARDS (Now 4 Cards with Animation) --- */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide mb-10">
          {/* Card 1: Cycle Day */}
          <div className="bg-[#E8E6FF] min-w-[190px] p-6 rounded-[2.5rem] flex flex-col items-center shadow-sm hover:translate-y-[-5px] transition-transform duration-300">
             <span className="text-[10px] font-black text-[#5E52FF] uppercase self-start mb-4 leading-tight">Cycle<br/>Day</span>
             <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#D1CFFF" strokeWidth="5" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="#5E52FF" strokeWidth="5" fill="transparent" strokeDasharray="175" strokeDashoffset="45" className="animate-[dash_1.5s_ease-in-out]" />
                </svg>
                <span className="text-2xl font-black text-gray-800">{cycleInfo.currentDay}</span>
             </div>
          </div>

          {/* Card 2: Next Period */}
          <div className="bg-[#FFE6EC] min-w-[190px] p-6 rounded-[2.5rem] relative overflow-hidden shadow-sm hover:translate-y-[-5px] transition-transform duration-300">
             <h4 className="text-xl font-black text-gray-800 mb-1">{cycleInfo.nextPeriod}</h4>
             <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Next Period</p>
             <Droplets className="absolute bottom-2 right-2 text-[#FF85A1] opacity-40 animate-pulse" size={45} />
          </div>

          {/* Card 3: Next Ovulatory (Newly Added) */}
          <div className="bg-[#E0F2FE] min-w-[190px] p-6 rounded-[2.5rem] relative overflow-hidden shadow-sm hover:translate-y-[-5px] transition-transform duration-300 border-2 border-white">
             <h4 className="text-xl font-black text-gray-800 mb-1">{cycleInfo.nextOvulation}</h4>
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Ovulation</p>
             <Sparkles className="absolute bottom-2 right-2 text-blue-300 opacity-40 animate-spin-slow" size={45} />
          </div>

          {/* Card 4: Next Fertile */}
          <div className="bg-[#FFF9E6] min-w-[190px] p-6 rounded-[2.5rem] relative overflow-hidden shadow-sm hover:translate-y-[-5px] transition-transform duration-300">
             <h4 className="text-xl font-black text-gray-800 mb-1">{cycleInfo.nextFertile}</h4>
             <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">Next Fertile</p>
             <Activity className="absolute bottom-2 right-2 text-[#FFC107] opacity-40" size={45} />
          </div>
        </div>

        {/* --- TIMELINE PROGRESS SECTION --- */}
        <section className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] mb-10 shadow-sm border border-white/50 animate-in slide-in-from-left-4 duration-1000">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-800 text-sm tracking-tight">Today - Cycle Day {cycleInfo.currentDay}</h3>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">{cycleInfo.status}</span>
           </div>
           
           <div className="relative h-4 w-full bg-gray-100 rounded-full mb-8 overflow-hidden flex">
              <div className="h-full bg-[#FF85A1] w-[20%] animate-in slide-in-from-left duration-500"></div> 
              <div className="h-full bg-[#FFD54F] w-[35%] border-l-2 border-white animate-in slide-in-from-left duration-700"></div> 
              <div className="h-full bg-[#FFB3C1] flex-1 border-l-2 border-white animate-in slide-in-from-left duration-1000"></div> 
           </div>
           
           <div className="flex justify-between items-center relative px-1">
              <span className="text-[10px] font-black text-gray-300 italic tracking-widest uppercase">Apr 16</span>
              <div className="absolute left-[78%] -top-12 flex flex-col items-center">
                <div className="h-12 w-[2px] bg-[#312E81] animate-tall"></div>
                <div className="bg-[#312E81] text-white text-[10px] px-5 py-1.5 rounded-full font-black shadow-xl uppercase tracking-tighter hover:scale-110 transition-transform cursor-default">Today</div>
              </div>
           </div>
        </section>

        {/* --- OTHER SECTIONS --- */}
        <div className="space-y-10">
          <TodayStatus />
          <Stats />
          <MusicPlayer />
        </div>

        {/* --- FLOATING TRACK BUTTON --- */}
        <Link to="/log" className="block mt-12 mb-8 group">
          <div className="bg-white/50 p-6 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-rose-300 hover:bg-white transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${style.button} text-white flex items-center justify-center shadow-lg group-hover:rotate-[360deg] transition-all duration-700`}>
                <span className="text-2xl font-bold">+</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-rose-500 transition-colors">Daily Log</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">How are you feeling today?</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:translate-x-2 transition-transform" size={20} />
          </div>
        </Link>

        <footer className="mt-16 pb-8 text-center opacity-50">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em]">
            Bloomly • Made with love for Nibedita
          </p>
        </footer>
      </main>

      {/* Adding custom CSS for animations */}
      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 175; }
          to { stroke-dashoffset: 45; }
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-tall {
          animation: grow 1s ease-out;
        }
        @keyframes grow {
          from { height: 0; }
          to { height: 48px; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;