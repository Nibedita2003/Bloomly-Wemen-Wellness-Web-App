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

      const q = query(collection(db, 'users', activeUid, 'periods'), orderBy('createdAt', 'desc'));
      const unsubPeriods = onSnapshot(q, (snapshot) => {
        setPeriods(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubProfile();
        unsubPeriods();
      };
    }
  }, [user]);

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
        <button onClick={() => setCurrentView('analysis')} className="mb-4 flex items-center gap-2 text-gray-500 font-bold">
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="text-2xl font-black text-gray-800 mb-6 italic uppercase">My cycles</h2>
        <div className="space-y-6">
          {periods.length > 0 ? periods.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>{item.startDate} - {item.endDate}</span>
                <span>28 Days</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full flex overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full" style={{width: '25%'}}></div>
                <div className="bg-orange-300 h-full rounded-full ml-12" style={{width: '18%'}}></div>
              </div>
            </div>
          )) : <p className="text-gray-400 font-bold text-center mt-20">No cycles logged yet.</p>}
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

        {/* 1. Profile Information Card */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-50 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-rose-50">
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-1.5 border-2 border-white text-white shadow-lg active:scale-95 transition-all"
              >
                <Camera size={12} />
              </button>
            </div>
            <div>
              <h2 className="font-black text-gray-800 text-lg">Nibedita</h2>
              <p className="text-[11px] text-gray-400 font-bold lowercase tracking-tight">{userEmail}</p>
              <p className="text-[10px] text-rose-400 font-black mt-1 uppercase italic tracking-tighter">Sync Active</p>
            </div>
          </div>
          <ChevronRight className="text-gray-200" size={20} />
        </div>

        {/* Avatar Selection */}
        {isEditingPhoto && (
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 border-2 border-rose-100 shadow-2xl mb-8 animate-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Profile Avatar</h4>
              <X className="text-gray-300 cursor-pointer" size={18} onClick={() => setIsEditingPhoto(false)} />
            </div>
            <div className="grid grid-cols-5 gap-3">
              {femaleAvatars.map((photo, i) => (
                <button 
                  key={i} 
                  onClick={() => handlePhotoSelect(photo)}
                  className={`aspect-square rounded-full overflow-hidden border-2 transition-all ${profilePhoto === photo ? 'border-rose-500 scale-105 shadow-md' : 'border-transparent bg-gray-50'}`}
                >
                  <img src={photo} alt="avatar option" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Avg Boxes & Cycle Preview */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-50 mb-8">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-black italic text-xl">o</div>
                <h3 className="font-black text-gray-800 uppercase text-sm tracking-widest">My cycles</h3>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-rose-50 p-5 rounded-[2rem] border border-rose-100 text-center">
                <h4 className="text-2xl font-black text-rose-500">6 Days</h4>
                <p className="text-[10px] font-bold text-rose-300 uppercase tracking-tighter">Avg Period</p>
              </div>
              <div className="bg-orange-50 p-5 rounded-[2rem] border border-orange-100 text-center">
                <h4 className="text-2xl font-black text-orange-500">33 Days</h4>
                <p className="text-[10px] font-bold text-orange-300 uppercase tracking-tighter">Avg Cycle</p>
              </div>
           </div>

           <div className="space-y-4 pt-4 border-t border-gray-50">
            {periods.slice(0, 2).map((item) => (
              <div key={item.id} className="h-4 w-full bg-gray-100 rounded-full flex overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full" style={{width: '20%'}}></div>
                <div className="bg-orange-300 h-full rounded-full ml-10" style={{width: '15%'}}></div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setCurrentView('history')}
            className="w-full pt-6 text-indigo-600 font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all"
          >
            More
          </button>
        </div>

        {/* 3. Stats & Calendar */}
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