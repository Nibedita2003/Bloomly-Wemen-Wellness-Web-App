import React from 'react';

const CalendarStrip = () => {
  const start = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      key: date.toISOString(),
      weekday: date.toLocaleDateString(undefined, { weekday: 'short' }),
      day: date.getDate(),
      isActive: index === 0,
    };
  });

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
      {days.map(({ key, weekday, day, isActive }) => (
        <div
          key={key}
          className={`min-w-[64px] rounded-2xl px-4 py-3 text-center shadow-sm border ${
            isActive ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-500 border-gray-100'
          }`}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{weekday}</p>
          <p className="text-lg font-black mt-1">{day}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarStrip;
