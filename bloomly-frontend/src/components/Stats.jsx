import React, { useState } from 'react';
import { Droplets, Scale, Info, RotateCcw } from 'lucide-react';
import { calculateBMI, getBMICategory } from '../utils/healthCalculations';

const Stats = () => {
  // State
  const [water, setWater] = useState(0);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleCalculateBMI = () => {
    setBmi(calculateBMI(weight, height));
  };

  const resetBMI = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
  };

  const resetWater = () => setWater(0);

  const bmiMessage = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* --- Hydration Tracker --- */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-500">
                <Droplets size={24} />
              </div>
              <h3 className="font-bold text-gray-800">Hydration</h3>
            </div>
            <button 
              onClick={resetWater}
              className="p-2 text-gray-300 hover:text-rose-400 transition-colors"
              title="Reset Water"
            >
              <RotateCcw size={18} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl font-black text-blue-600">
              {water} <span className="text-sm text-gray-300">/ 8</span>
            </span>
            <button 
              onClick={() => setWater(prev => prev + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 shadow-md active:scale-95 transition-all"
            >
              Drink 💧
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-blue-500 h-full transition-all duration-700" 
              style={{ width: `${Math.min((water / 8) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] font-bold text-blue-400 uppercase text-center tracking-widest">
            {water >= 8 ? "Goal Achieved! 🌟" : "Keep going!"}
          </p>
        </div>
      </div>

      {/* --- BMI Calculator --- */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
              <Scale size={24} />
            </div>
            <h3 className="font-bold text-gray-800">BMI Insights</h3>
          </div>
          <button 
            onClick={resetBMI}
            className="p-2 text-gray-300 hover:text-rose-400 transition-colors"
            title="Reset Inputs"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="number" placeholder="kg" 
            className="w-1/2 p-3 bg-gray-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-200"
            value={weight} onChange={(e) => setWeight(e.target.value)}
          />
          <input 
            type="number" placeholder="cm" 
            className="w-1/2 p-3 bg-gray-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-emerald-200"
            value={height} onChange={(e) => setHeight(e.target.value)}
          />
        </div>

          <button 
            onClick={handleCalculateBMI}
            className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold mb-4 hover:bg-emerald-600 transition-all shadow-md"
          >
            Analyze BMI
          </button>

        {bmi ? (
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <p className={`text-sm font-black mb-1 ${bmiMessage.color}`}>BMI: {bmi}</p>
            <p className="text-xs font-medium text-gray-600 leading-tight">
              {bmiMessage.text}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-300 justify-center py-4 italic text-sm">
            <Info size={16} /> Ready for analysis
          </div>
        )}
      </div>

    </div>
  );
};

export default Stats;
