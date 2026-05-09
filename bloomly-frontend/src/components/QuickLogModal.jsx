import React, { useState, useEffect } from 'react';
import { X, Check, Droplets, PenLine, Play, Square } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp, orderBy, limit } from "firebase/firestore";

const QuickLogModal = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");
  const [flow, setFlow] = useState(0);
  const [activePeriodDoc, setActivePeriodDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Header ke liye Current Date aur Month
  const today = new Date();
  const dayName = today.toLocaleString('default', { weekday: 'short' });
  const monthName = today.toLocaleString('default', { month: 'short' });
  const dateNum = today.getDate();

  useEffect(() => {
    if (isOpen) fetchActivePeriod();
  }, [isOpen]);

  // Check if any period is currently active (not ended)
  const fetchActivePeriod = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "periods"),
      where("endDate", "==", ""),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      setActivePeriodDoc({ id: snap.docs[0].id, ...snap.docs[0].data() });
    }
  };

  // 2. Start Period Logic
  const handleStart = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    try {
      const dateStr = today.toISOString().split('T')[0];
      const newDoc = await addDoc(collection(db, "users", user.uid, "periods"), {
        startDate: dateStr,
        endDate: "",
        status: "active",
        createdAt: serverTimestamp(),
      });
      setActivePeriodDoc({ id: newDoc.id, startDate: dateStr });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // 3. End Period Logic
  const handleEnd = async () => {
    if (!activePeriodDoc) return;
    setLoading(true);
    try {
      const dateStr = today.toISOString().split('T')[0];
      const docRef = doc(db, "users", auth.currentUser.uid, "periods", activePeriodDoc.id);
      await updateDoc(docRef, { endDate: dateStr, status: "completed" });
      setActivePeriodDoc(null);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // 4. Save Everything (Note & Flow)
  const handleFinalSave = async () => {
    // Yahan aap symptoms/flow ka alag collection bhi bana sakti hain
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/20 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-[#f3f9ff] to-[#ffffff] w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/50 animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Header - Showing Dynamic Date */}
        <div className="p-7 flex justify-between items-center bg-transparent">
          <button onClick={onClose} className="p-2.5 bg-white/50 hover:bg-white rounded-full shadow-sm">
            <X size={22} className="text-gray-400" />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-black text-gray-800 italic uppercase tracking-tighter">
              {dateNum} {monthName}
            </h2>
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{dayName}</p>
          </div>
          <button onClick={handleFinalSave} className="p-2.5 bg-[#FF7E9D] text-white rounded-2xl shadow-lg shadow-rose-200">
            <Check size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Calendar Strip (Selected Date highlighted) */}
          <div className="flex justify-between px-1 mb-4">
            {[dateNum-3, dateNum-2, dateNum-1, dateNum, dateNum+1, dateNum+2, dateNum+3].map((d) => (
              <div key={d} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][(new Date(today.getFullYear(), today.getMonth(), d)).getDay()]}
                </span>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm transition-all
                  ${d === dateNum ? 'bg-white border-[3px] border-[#7B61FF] text-[#7B61FF] shadow-md' : 'bg-white text-gray-300'}`}>
                  {d}
                </div>
              </div>
            ))}
          </div>

          {/* Period Card with Start/End Logic */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">
                {activePeriodDoc ? "Period Active" : "Log Period"}
              </h3>
              <PenLine size={16} className="text-gray-300" />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleStart}
                disabled={loading || !!activePeriodDoc}
                className={`flex-1 ${activePeriodDoc ? 'bg-gray-50 text-gray-300' : 'bg-[#FFE9ED] text-[#FF5C81]'} py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-xs transition-all border border-rose-100/50 shadow-sm`}
              >
                <Play size={12} fill={activePeriodDoc ? "#ccc" : "#FF5C81"} />
                Start
              </button>
              <button 
                onClick={handleEnd}
                disabled={loading || !activePeriodDoc}
                className={`flex-1 ${!activePeriodDoc ? 'bg-gray-50 text-gray-300' : 'bg-[#EEF2FF] text-[#5C7CFF]'} py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black uppercase text-xs transition-all border border-indigo-100/50 shadow-sm`}
              >
                <Square size={10} fill={!activePeriodDoc ? "#ccc" : "#5C7CFF"} />
                End
              </button>
            </div>
          </div>

          {/* Flow Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white flex justify-between items-center">
            <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">Flow</h3>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} onClick={() => setFlow(i)} className="cursor-pointer transition-transform active:scale-90">
                  <Droplets size={28} className={`${i <= flow ? 'text-[#8EA3FF] fill-[#8EA3FF]' : 'text-gray-200'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Note Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white space-y-3 mb-4">
            <h3 className="font-black text-gray-500 uppercase text-[11px] tracking-[0.2em]">Daily Note</h3>
            <div className="flex gap-3 items-start">
              <PenLine size={20} className="text-gray-300 mt-1" />
              <textarea 
                placeholder="How are you feeling today?"
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