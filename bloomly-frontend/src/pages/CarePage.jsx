
import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import MusicPlayer from '../components/MusicPlayer';
import TodayStatus from '../components/TodayStatus';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, Volume2, X } from 'lucide-react';

const CarePage = ({ user, onLogout }) => {
  const { style } = useTheme();
  const [playingId, setPlayingId] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const audioRef = useRef(null);

  const crampRelief = [
    { 
      id: 'cramp-1', 
      title: 'Period pain relief', 
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500', 
      color: 'bg-[#FFEDD5]',
      videoUrl: 'https://www.youtube.com/embed/57AUp6S9y-U' 
    },
    { 
      id: 'cramp-2', 
      title: 'Foot massage to relieve cramps', 
      img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=500', 
      color: 'bg-[#FEF3C7]',
      videoUrl: 'https://www.youtube.com/embed/S2Y88fBvXf8'
    }
  ];

  // Updated Soundscape Links (Stable Pixabay/Wikimedia Links)
  const soundscapes = [
    { 
      id: 'snd-1', 
      title: 'Forest Adventure', 
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=200', 
      color: 'bg-[#065F46]',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
    },
    { 
      id: 'snd-2', 
      title: 'Forest Rain', 
      img: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=200', 
      color: 'bg-[#1E40AF]',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' // 2nd sound fix
    },
    { 
      id: 'snd-3', 
      title: 'Peaceful Night', 
      img: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=200', 
      color: 'bg-[#312E81]',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' // 3rd sound fix
    }
  ];

  // Fixed Toggle Logic to prevent Interruption Error
  const toggleSound = async (sound) => {
    if (playingId === sound.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      // 1. Pehle purana audio pause karein
      audioRef.current.pause();
      
      // 2. State update karein
      setPlayingId(sound.id);
      
      // 3. Naya source set karein aur load karein
      audioRef.current.src = sound.audioUrl;
      audioRef.current.load();
      
      // 4. Play request ko safely handle karein
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error("Playback error: ", err);
        setPlayingId(null);
      }
    }
  };

  return (
    <div className={`min-h-screen ${style.bg} pb-32 transition-colors duration-1000 font-sans`}>
      <Navbar user={user} onLogout={onLogout} />
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} preload="auto" />

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <TopBar pathname="/care" />

        <header className="mb-8">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Self Care</p>
           <h1 className="text-4xl font-black italic tracking-tighter text-gray-800">Recovery rituals for today</h1>
        </header>

        <div className="mb-8">
          <MusicPlayer />
        </div>

        <div className="mb-12">
          <TodayStatus />
        </div>

        {/* Video Overlay Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden">
              <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-10 bg-white/20 p-2 rounded-full text-white"><X size={24} /></button>
              <iframe width="100%" height="100%" src={`${activeVideo}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        )}

        <section className="mb-16">
          <h2 className="text-lg font-black text-gray-800 mb-6">Menstrual cramps relief</h2>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {crampRelief.map((item) => (
              <div key={item.id} onClick={() => setActiveVideo(item.videoUrl)} className={`${item.color} min-w-[300px] h-[200px] rounded-[2.5rem] relative overflow-hidden group cursor-pointer`}>
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" />
                <div className="absolute top-8 left-8 right-8 text-2xl font-black text-gray-900 leading-tight w-2/3">{item.title}</div>
                <button className="absolute bottom-8 left-8 bg-white/90 rounded-full p-3 shadow-lg text-orange-500"><Play size={20} fill="currentColor" /></button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-gray-800">Nature Soundscapes</h2>
            {playingId && (
              <div className="flex items-center gap-2 text-blue-500 animate-pulse">
                <Volume2 size={16} />
                <span className="text-[10px] font-black uppercase">Atmosphere Active</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
            {soundscapes.map((sound) => (
              <div key={sound.id} className="flex flex-col items-center gap-4 min-w-[120px]">
                <div 
                  onClick={() => toggleSound(sound)}
                  className={`${sound.color} w-28 h-28 rounded-full relative overflow-hidden shadow-xl flex items-center justify-center group cursor-pointer border-4 ${playingId === sound.id ? 'border-white animate-pulse shadow-blue-200' : 'border-transparent'}`}
                >
                  <img src={sound.img} alt={sound.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  {playingId === sound.id ? (
                    <Pause size={28} className="text-white z-10" fill="white" />
                  ) : (
                    <Play size={28} className="text-white z-10 opacity-60 group-hover:opacity-100" fill="white" />
                  )}
                </div>
                <p className={`text-[11px] font-black text-center uppercase tracking-tighter w-24 ${playingId === sound.id ? 'text-blue-500' : 'text-gray-600'}`}>
                  {sound.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CarePage;