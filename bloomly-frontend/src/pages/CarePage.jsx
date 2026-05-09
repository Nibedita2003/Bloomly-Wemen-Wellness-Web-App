// import React from 'react';
// import Navbar from '../components/Navbar';
// import TopBar from '../components/TopBar';
// import MusicPlayer from '../components/MusicPlayer';
// import CycleCard from '../components/CycleCard';
// import TodayStatus from '../components/TodayStatus';
// import { useTheme } from '../context/ThemeContext';

// const CarePage = ({ user, onLogout }) => {
//   const { style } = useTheme();

//   return (
//     <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000`}>
//       <Navbar user={user} onLogout={onLogout} />

//       <main className="max-w-4xl mx-auto px-6 mt-10">
//         <TopBar pathname="/care" />

//         <header className="mb-10">
//           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">
//             Mood Care
//           </p>
//           <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
//             Recovery rituals for today
//           </h1>
//         </header>

//         <div className="mb-8">
//           <MusicPlayer />
//         </div>

//         <TodayStatus />

//         <div className="mb-8">
//           <CycleCard />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CarePage;
import React from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import MusicPlayer from '../components/MusicPlayer';
import TodayStatus from '../components/TodayStatus';
import { useTheme } from '../context/ThemeContext';

const CarePage = ({ user, onLogout }) => {
  const { style } = useTheme();

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000`}>
      <Navbar user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <TopBar pathname="/care" />

        <header className="mb-10">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">
            Mood Care
          </p>
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
            Recovery rituals for today
          </h1>
        </header>

        <div className="mb-8">
          <MusicPlayer />
        </div>

        <TodayStatus />

        {/* CycleCard (Calendar) yahan se bhi hata diya gaya hai */}
      </main>
    </div>
  );
};

export default CarePage;