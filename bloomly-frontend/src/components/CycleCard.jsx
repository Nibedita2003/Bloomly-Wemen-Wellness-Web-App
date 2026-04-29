import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { predictNextPeriod } from '../utils/healthCalculations';

const CycleCard = ({ lastPeriodDate }) => {
  const { style } = useTheme();
  
  // Predict the next date (defaulting to 28 days)
  const nextDate = lastPeriodDate ? predictNextPeriod(lastPeriodDate) : null;
  
  return (
    <div className={`p-8 rounded-3xl bg-white border ${style.border} shadow-lg`}>
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
        Prediction
      </h2>
      <p className="text-3xl font-black text-gray-800">
        {nextDate 
          ? `Next Period: ${nextDate.toLocaleDateString()}` 
          : "Log your last period to see prediction"}
      </p>
      <p className="mt-4 text-gray-500 italic">
        "Your hormones might be shifting soon. Stay hydrated!"
      </p>
    </div>
  );
};

export default CycleCard;