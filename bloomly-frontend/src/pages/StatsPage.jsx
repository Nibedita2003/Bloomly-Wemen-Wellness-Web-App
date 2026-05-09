import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; 
import { doc, onSnapshot, setDoc, collection, query, orderBy } from "firebase/firestore"; 
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Stats from '../components/Stats';
import PeriodCalendar from '../components/PeriodCalendar';
import { useTheme } from '../context/ThemeContext';
import { Settings, ChevronRight, Camera, X, ArrowLeft } from 'lucide-react';

const StatsPage = ({ user, onLogout }) => {
  const { style } = useTheme();
  const [currentView, setCurrentView] = useState('analysis');
  const [periods, setPeriods] = useState([]);
  
  // --- DYNAMIC STATS STATE ---
  const [avgStats, setAvgStats] = useState({ period: 0, cycle: 0 });

  const femaleAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie&mouth=smile",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella&mouth=smile",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe&mouth=smile",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy&mouth=smile",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&mouth=smile"
  ];

  const [profilePhoto, setProfilePhoto] = useState(femaleAvatars[0]);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const activeUid = user?.uid || auth.currentUser?.uid;
    const activeEmail = user?.email || auth.currentUser?.email || "nibedita@gmail.com";
    setUserEmail(activeEmail);

    if (activeUid) {
      const unsubProfile = onSnapshot(doc(db, "users", activeUid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.photoURL) setProfilePhoto(data.photoURL);
        }
      });

      const q = query(collection(db, 'users', activeUid, 'periods'), orderBy('startDate', 'desc'));
      const unsubPeriods = onSnapshot(q, (snapshot) => {
        const rawData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const uniquePeriods = [];
        const seenMonths = new Set();

        rawData.forEach(item => {
          if (item.startDate) {
            const monthYear = item.startDate.substring(0, 7);
            if (!seenMonths.has(monthYear)) {
              uniquePeriods.push(item);
              seenMonths.add(monthYear);
            }
          }
        });

        setPeriods(uniquePeriods);

        // --- DYNAMIC CALCULATION LOGIC ---
        if (uniquePeriods.length > 0) {
          let totalP = 0, pCount = 0, totalC = 0, cCount = 0;

          uniquePeriods.forEach((item, index) => {
            // Period Length Calculation
            if (item.startDate && item.endDate) {
              const d = Math.ceil(Math.abs(new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24)) + 1;
              if (d > 0 && d < 15) { totalP += d; pCount++; }
            }
            // Cycle Length Calculation
            if (index < uniquePeriods.length - 1) {
              const c = Math.ceil(Math.abs(new Date(item.startDate) - new Date(uniquePeriods[index+1].startDate)) / (1000 * 60 * 60 * 24));
              if (c > 15 && c < 45) { totalC += c; cCount++; }
            }
          });

          setAvgStats({
            period: pCount > 0 ? Math.round(totalP / pCount) : 0,
            cycle: cCount > 0 ? Math.round(totalC / cCount) : 28
          });
        }
      });

      return () => {
        unsubProfile();
        unsubPeriods();
      };
    }
  }, [user]);

  const getPeriodWidth = (start, end) => {
    if (!start) return '0%';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(); 
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const width = (diffDays / (avgStats.cycle || 28)) * 100;
    return `${Math.min(width, 80)}%`; 
  };

  const handlePhotoSelect = async (photo) => {
    setProfilePhoto(photo);
    setIsEditingPhoto(false);
    const activeUid = user?.uid || auth.currentUser?.uid;
    if (activeUid) {
      try {
        await setDoc(doc(db, "users", activeUid), {
          uid: activeUid,
          email: userEmail,
          photoURL: photo,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  if (currentView === 'history') {
    return (
      <div className={`min-h-screen ${style.bg} p-6 pb-24 font-sans`}>
        <button onClick={() => setCurrentView('analysis')} className="mb-4 flex items-center gap-2 text-gray-500 font-bold active:scale-90 transition-transform">
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="text-2xl font-black text-gray-800 mb-6 italic uppercase tracking-tighter">Cycle History</h2>
        <div className="space-y-8">
          {periods.length > 0 ? periods.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>{item.startDate} {item.endDate ? `- ${item.endDate}` : '(Active Now)'}</span>
                <span className="text-rose-500 font-black">{avgStats.cycle} Days Cycle</span>
              </div>
              <div className="h-5 w-full bg-gray-100 rounded-full flex overflow-hidden p-1 shadow-sm border border-white">
                <div 
                  className="bg-rose-400 h-full rounded-full transition-all duration-1000" 
                  style={{width: getPeriodWidth(item.startDate, item.endDate)}}
                ></div>
                <div className="bg-orange-200 h-full rounded-full opacity-30 ml-4" style={{width: '15%'}}></div>
              </div>
            </div>
          )) : (
            <p className="text-gray-400 font-bold text-center mt-20">No cycles logged yet.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000 font-sans`}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-4xl mx-auto px-4 mt-6">
        <TopBar pathname="/stats" />

        <div className="flex justify-between items-center mb-6 px-2">
          <Settings className="text-gray-400 cursor-pointer" size={24} />
          <h1 className="text-xl font-black text-gray-800 tracking-tight italic uppercase">Analysis</h1>
          <div className="w-6" />
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-50 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-rose-50">
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setIsEditingPhoto(!isEditingPhoto)} className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-1.5 border-2 border-white text-white shadow-lg"><Camera size={12} /></button>
            </div>
            <div>
              <h2 className="font-black text-gray-800 text-lg">Nibedita</h2>
              <p className="text-[11px] text-gray-400 font-bold tracking-tight">{userEmail}</p>
              <p className="text-[10px] text-rose-400 font-black mt-1 uppercase italic tracking-tighter">Unified Sync Active</p>
            </div>
          </div>
          <ChevronRight className="text-gray-200" size={20} />
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-50 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-black italic text-xl">o</div>
                <h3 className="font-black text-gray-800 uppercase text-sm tracking-widest">Current cycle</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-rose-50 p-5 rounded-[2rem] border border-rose-100 text-center">
                <h4 className="text-2xl font-black text-rose-500">{avgStats.period || '--'} Days</h4>
                <p className="text-[10px] font-bold text-rose-300 uppercase tracking-tighter">Avg Period</p>
              </div>
              <div className="bg-orange-50 p-5 rounded-[2rem] border border-orange-100 text-center">
                <h4 className="text-2xl font-black text-orange-500">{avgStats.cycle || '--'} Days</h4>
                <p className="text-[10px] font-bold text-orange-300 uppercase tracking-tighter">Avg Cycle</p>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-50">
             {periods.slice(0, 1).map((item) => ( 
               <div key={item.id} className="h-5 w-full bg-gray-100 rounded-full flex overflow-hidden p-1 shadow-inner">
                 <div 
                   className="bg-rose-400 h-full rounded-full transition-all duration-1000" 
                   style={{width: getPeriodWidth(item.startDate, item.endDate)}}
                 ></div>
                 <div className="bg-orange-300 h-full rounded-full opacity-30 ml-8" style={{width: '15%'}}></div>
               </div>
             ))}
           </div>

          <button onClick={() => setCurrentView('history')} className="w-full pt-6 text-indigo-600 font-black text-xs uppercase tracking-[0.2em] hover:opacity-70 active:scale-95 transition-all">View All History</button>
        </div>

        <div className="space-y-8">
          <Stats /> 
          <div className="bg-white p-4 rounded-[2.5rem] border border-blue-50 shadow-sm">
            <PeriodCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;