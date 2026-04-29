import React, { useState } from 'react';
import { Play, Pause, SkipForward, Music } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// IMPORTANT: Notice the curly braces { } around musicTracks
import { musicTracks } from '../data/musicData';

const MusicPlayer = () => {
  const { mood, style } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  // SAFETY CHECK: If musicTracks is somehow missing, use an empty array
  const tracks = musicTracks || [];
  
  // Find the track matching the current mood, or default to the first one
  const currentTrack = tracks.find(t => t.mood === mood) || tracks[0];

  // If there's still no track (data file empty), show a message
  if (!currentTrack) {
    return <div className="p-4 text-gray-400 italic">Loading soundscapes...</div>;
  }

  return (
    <div className={`p-6 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm transition-all duration-500`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl ${style.button} flex items-center justify-center text-white shadow-inner animate-pulse-slow`}>
            <Music size={28} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Now Playing</h4>
            <h2 className="text-xl font-black text-gray-800">{currentTrack.title}</h2>
            <p className="text-sm text-gray-500 font-medium">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-14 h-14 rounded-full ${style.button} text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all`}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;