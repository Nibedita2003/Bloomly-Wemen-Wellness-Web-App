// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';
// import Navbar from '../components/Navbar'; // Top navigation
// import TopBar from '../components/TopBar';
// import CycleCard from '../components/CycleCard';
// import Stats from '../components/Stats';
// import MusicPlayer from '../components/MusicPlayer';
// import TodayStatus from '../components/TodayStatus';

// const Dashboard = ({ user, onLogout }) => {
//   const { style } = useTheme();

//   return (
//     <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000`}>
//       {/* Top Navbar jo aapne pehle implement kiya tha */}
//       <Navbar user={user} onLogout={onLogout} />

//       <main className="max-w-4xl mx-auto px-6 mt-10">
//         <TopBar pathname="/" />

//         <header className="mb-8">
//           <h3 className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Welcome back,</h3>
//           <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
//             Hii {user?.name || 'Beautiful'} <span className="text-rose-400">.</span>
//           </h1>
//         </header>

//         {/* Track Your Cycle Shortcut */}
//         <Link to="/log" className="block mb-8 group">
//           <div className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-rose-300 hover:bg-rose-50/30 transition-all shadow-sm">
//             <div className="flex items-center gap-4">
//               <div className={`w-12 h-12 rounded-2xl ${style.button} text-white flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform`}>
//                 <span className="text-2xl font-bold">+</span>
//               </div>
//               <div>
//                 <h3 className="font-bold text-gray-800">Track Your Cycle</h3>
//                 <p className="text-xs text-gray-400 uppercase tracking-tighter font-bold">Open Calendar & Log Period</p>
//               </div>
//             </div>
//             <span className="text-[10px] text-gray-300 group-hover:text-rose-400 transition-colors font-black mr-2 tracking-widest">OPEN</span>
//           </div>
//         </Link>

//         <div className="mb-8">
//           <CycleCard />
//         </div>

//         <TodayStatus />

//         {/* Stats Section */}
//         <div className="mb-8">
//           <Stats />
//         </div>

//         {/* Music Player Section */}
//         <div className="mb-8">
//           <MusicPlayer />
//         </div>

//         <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
//           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
//             Bloomly Women's Wellness • 2026
//           </p>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar'; 
import TopBar from '../components/TopBar';
import Stats from '../components/Stats';
import MusicPlayer from '../components/MusicPlayer';
import TodayStatus from '../components/TodayStatus';

const Dashboard = ({ user, onLogout }) => {
  const { style } = useTheme();

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000`}>
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <TopBar pathname="/" />

        <header className="mb-8">
          <h3 className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Welcome back,</h3>
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
            Hii {user?.displayName || 'Nibedita'} <span className="text-rose-400">.</span>
          </h1>
        </header>

        {/* Track Your Cycle Shortcut */}
        <Link to="/log" className="block mb-8 group">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-rose-300 hover:bg-rose-50/30 transition-all shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${style.button} text-white flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform`}>
                <span className="text-2xl font-bold">+</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Track Your Cycle</h3>
                <p className="text-xs text-gray-400 uppercase tracking-tighter font-bold">Open Calendar & Log Period</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-300 group-hover:text-rose-400 transition-colors font-black mr-2 tracking-widest">OPEN</span>
          </div>
        </Link>

        {/* Calendar (CycleCard) yahan se hata diya gaya hai */}

        <TodayStatus />

        <div className="mb-8">
          <Stats />
        </div>

        <div className="mb-8">
          <MusicPlayer />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
            Bloomly Women's Wellness • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;