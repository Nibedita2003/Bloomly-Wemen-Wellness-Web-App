import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { musicTracks } from '../data/musicData';

const MusicPlayer = () => {
  const { mood, style } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio()); // Creates a persistent audio player
  
  const currentTrack = musicTracks.find(t => t.mood === mood) || musicTracks[0];

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.url;

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-6 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl ${style.button} flex items-center justify-center text-white`}>
            <Music size={28} className={isPlaying ? "animate-spin" : ""} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800">{currentTrack.title}</h2>
            <p className="text-sm text-gray-500">{currentTrack.artist}</p>
          </div>
        </div>

        <button 
          onClick={togglePlay}
          className={`w-14 h-14 rounded-full ${style.button} text-white flex items-center justify-center shadow-lg transition-transform active:scale-90`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
