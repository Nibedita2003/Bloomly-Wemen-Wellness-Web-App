import React from 'react';
import { CalendarDays, Egg, Flower2, Droplets } from 'lucide-react';
import { getDetailedCycleData } from '../utils/healthCalculations';
import { useTheme } from '../context/ThemeContext';

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

const PeriodCalendar = ({ startDate = new Date() }) => {
  const { style } = useTheme();
  const cycleData = getDetailedCycleData(startDate);

  if (!cycleData) return null;

  const cards = [
    {
      label: 'Period Window',
      value: `${formatDate(cycleData.periodDays[0])} - ${formatDate(cycleData.periodDays[cycleData.periodDays.length - 1])}`,
      icon: Droplets,
      tone: 'bg-rose-50 text-rose-500 border-rose-100',
    },
    {
      label: 'Fertile Window',
      value: `${formatDate(cycleData.fertileDays[0])} - ${formatDate(cycleData.fertileDays[cycleData.fertileDays.length - 1])}`,
      icon: Flower2,
      tone: 'bg-pink-50 text-pink-500 border-pink-100',
    },
    {
      label: 'Ovulation',
      value: formatDate(cycleData.ovulationDate),
      icon: Egg,
      tone: 'bg-violet-50 text-violet-500 border-violet-100',
    },
    {
      label: 'Next Period',
      value: formatDate(cycleData.nextPeriodDate),
      icon: CalendarDays,
      tone: `${style.border} ${style.accent} bg-white`,
    },
  ];

  return (
    <section className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <header className="mb-5">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Cycle Roadmap
        </p>
        <h2 className="text-2xl font-black text-gray-800 italic tracking-tight">
          Your predicted timeline
        </h2>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className={`rounded-[1.75rem] border p-4 ${tone}`}>
            <div className="flex items-center gap-3 mb-2">
              <Icon size={18} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
            </div>
            <p className="text-sm font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeriodCalendar;
