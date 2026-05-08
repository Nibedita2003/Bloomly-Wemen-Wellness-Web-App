import React, { useState } from 'react';
import { Droplets, Scale, RotateCcw, Info } from 'lucide-react';
import { calculateBMI, getBMICategory } from '../utils/healthCalculations';

const Stats = () => {
  const [water, setWater] = useState(0);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleCalculateBMI = () => setBmi(calculateBMI(weight, height));
  const resetBMI = () => { setWeight(''); setHeight(''); setBmi(null); };
  const resetWater = () => setWater(0);
  const bmiMessage = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Hydration Card */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-blue-50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-500"><Droplets size={24} /></div>
            <h3 className="font-black text-gray-800 text-sm uppercase">Hydration</h3>
          </div>
          <button onClick={resetWater} className="text-gray-200 hover:text-rose-400 transition-all"><RotateCcw size={18} /></button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-black text-blue-500">{water}<span className="text-sm text-gray-200 italic ml-1">/8</span></span>
          <button onClick={() => setWater(prev => prev + 1)} className="px-5 py-2 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase shadow-md active:scale-95 transition-all">Drink 💧</button>
        </div>
        <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-400 h-full transition-all duration-700" style={{ width: `${Math.min((water / 8) * 100, 100)}%` }}></div>
        </div>
      </div>

      {/* BMI Card */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-blue-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500"><Scale size={24} /></div>
            <h3 className="font-black text-gray-800 text-sm uppercase">BMI Analyze</h3>
          </div>
          <button onClick={resetBMI} className="text-gray-200 hover:text-rose-400 transition-all"><RotateCcw size={18} /></button>
        </div>
        <div className="flex gap-2 mb-4">
          <input type="number" placeholder="kg" className="w-1/2 p-3 bg-gray-50 rounded-2xl border-none text-xs font-bold focus:ring-1 focus:ring-emerald-200" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input type="number" placeholder="cm" className="w-1/2 p-3 bg-gray-50 rounded-2xl border-none text-xs font-bold focus:ring-1 focus:ring-emerald-200" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <button onClick={handleCalculateBMI} className="w-full py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-md hover:bg-emerald-600 transition-all">Analyze Now</button>
        {bmi && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <p className={`text-xs font-black mb-1 ${bmiMessage.color}`}>BMI: {bmi}</p>
            <p className="text-[10px] font-bold text-gray-500 leading-tight uppercase">{bmiMessage.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;