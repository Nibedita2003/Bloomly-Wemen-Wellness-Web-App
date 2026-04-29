import React from 'react';
import { Droplet, Activity, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Stats = () => {
  const { style } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Hydration Tracker */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
            <Droplet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hydration</p>
            <p className="text-2xl font-black text-gray-800">1.2 <span className="text-sm font-normal text-gray-400">/ 2.5 L</span></p>
          </div>
        </div>
        
        {/* Animated Add Button */}
        <button className={`w-12 h-12 rounded-full ${style.button} text-white flex items-center justify-center shadow-lg hover:rotate-90 transition-all active:scale-90`}>
          <Plus size={20} />
        </button>
      </div>

      {/* BMI Insight Card */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
        <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
          <Activity size={24} />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">BMI Status</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-gray-800">22.4</p>
            <span className="text-sm font-bold text-emerald-500 px-2 py-0.5 bg-emerald-50 rounded-lg">Healthy</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Weight is optimal for your height.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;