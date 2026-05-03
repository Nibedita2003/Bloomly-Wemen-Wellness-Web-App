// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import { ThemeProvider, useTheme } from './context/ThemeContext';

// // Pages & Components
// import LogPage from './pages/LogPage';
// import LoginPage from './pages/LoginPage';
// import Navbar from './components/Navbar';
// import Stats from './components/Stats';
// import MusicPlayer from './components/MusicPlayer';

// const Dashboard = ({ user, onLogout }) => {
//   const { style } = useTheme();

//   return (
//     <div className={`min-h-screen ${style.bg} pb-20 transition-colors duration-1000`}>
//       <Navbar user={user} onLogout={onLogout} />

//       <main className="max-w-4xl mx-auto px-6 mt-10">
//         <header className="mb-10">
//           <h3 className="text-gray-400 font-medium tracking-wide">Welcome back,</h3>
//           <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter">
//             Hii {user?.name || 'Beautiful'}
//           </h1>
//         </header>

//         {/* This shortcut leads to the specialized LogPage */}
//         <Link to="/update-period" className="block mb-8 group">
//           <div className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex justify-between items-center hover:border-rose-300 hover:bg-rose-50/30 transition-all">
//             <div className="flex items-center gap-4">
//               <div className={`w-12 h-12 rounded-2xl ${style.button} text-white flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform`}>
//                 <span className="text-2xl font-bold">+</span>
//               </div>
//               <div>
//                 <h3 className="font-bold text-gray-800">Track Your Cycle</h3>
//                 <p className="text-sm text-gray-400">Log your 6-day period starting from Day 1</p>
//               </div>
//             </div>
//             <span className="text-gray-300 group-hover:text-rose-400 transition-colors font-black mr-2">OPEN CALENDAR</span>
//           </div>
//         </Link>

//         {/* CycleCard is removed from here to clean the UI and stop errors */}

//         <div className="mb-8">
//           <Stats />
//         </div>

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

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('bloomly_user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         localStorage.removeItem('bloomly_user');
//       }
//     }
//   }, []);

//   return (
//     <ThemeProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={user ? <Dashboard user={user} onLogout={() => { localStorage.removeItem('bloomly_user'); setUser(null); }} /> : <Navigate to="/login" />} />
//           <Route path="/update-period" element={user ? <LogPage /> : <Navigate to="/login" />} />
//           <Route path="/login" element={<LoginPage onLogin={(u) => { localStorage.setItem('bloomly_user', JSON.stringify(u)); setUser(u); }} />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Pages & Components
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BottomNav from './components/BottomNav';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bloomly_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('bloomly_user');
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[#FDFCFM]">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Dashboard user={user} onLogout={() => { localStorage.removeItem('bloomly_user'); setUser(null); }} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/log" 
              element={user ? <LogPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={<LoginPage onLogin={(u) => { localStorage.setItem('bloomly_user', JSON.stringify(u)); setUser(u); }} />} 
            />
          </Routes>

          {/* FIX: BottomNav sirf tab dikhega jab user login ho (user != null) */}
          {user && <BottomNav />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;