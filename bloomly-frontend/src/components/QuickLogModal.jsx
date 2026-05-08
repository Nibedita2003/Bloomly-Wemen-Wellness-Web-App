import React, { useState } from 'react';
import { X, Check, Droplets, PenLine, Play, Square } from 'lucide-react';

const QuickLogModal = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");
  const [flow, setFlow] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/20 backdrop-blur-md animate-in fade-in duration-300">
      {/* Main Container with Soft Gradient Background */}
      <div className="bg-gradient-to-b from-[#f3f9ff] to-[#ffffff] w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/50 animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="p-7 flex justify-between items-center bg-transparent">
          <button onClick={onClose} className="p-2.5 bg-white/50 hover:bg-white rounded-full shadow-sm transition-all">
            <X size={22} className="text-gray-400" />
          </button>
          <h2 className="text-xl font-black text-gray-800 italic uppercase tracking-tighter">Today</h2>
          <button onClick={onClose} className="p-2.5 bg-[#FF7E9D] text-white rounded-2xl shadow-lg shadow-rose-200 hover:scale-105 transition-transform">
            <Check size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Calendar Strip */}
          <div className="flex justify-between px-1 mb-4">
            {[3, 4, 5, 6, 7, 8, 9].map((d) => (
              <div key={d} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d%7]}
                </span>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm transition-all
                  ${d === 6 ? 'bg-white border-[3px] border-[#7B61FF] text-[#7B61FF] shadow-md' : 
                    d < 6 ? 'bg-[#FFF9C4] text-gray-700' : 'bg-white text-gray-300'}`}>
                  {d}
                </div>
              </div>
            ))}
          </div>

          {/* Period Card - Glass Effect */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">Period</h3>
              <PenLine size={16} className="text-gray-300" />
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-[#FFE9ED] hover:bg-[#FFD1DA] text-[#FF5C81] py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-xs transition-all border border-rose-100/50 shadow-sm">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                   <Play size={12} fill="#FF5C81" className="ml-0.5" />
                </div>
                Start
              </button>
              <button className="flex-1 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5C7CFF] py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-xs transition-all border border-indigo-100/50 shadow-sm">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Square size={10} fill="#5C7CFF" />
                </div>
                End
              </button>
            </div>
          </div>

          {/* Flow Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white flex justify-between items-center">
            <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">Flow</h3>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  onClick={() => setFlow(i)}
                  className="cursor-pointer transition-transform active:scale-90"
                >
                  <Droplets 
                    size={28} 
                    className={`${i <= flow ? 'text-[#8EA3FF] fill-[#8EA3FF]' : 'text-gray-200'}`} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Note Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white space-y-3 mb-4">
            <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">Note</h3>
            <div className="flex gap-3 items-start">
              <PenLine size={20} className="text-gray-300 mt-1" />
              <textarea 
                placeholder="Write something..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-600 placeholder:text-gray-300 resize-none outline-none"
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuickLogModal;