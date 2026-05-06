import React from 'react';
import { useTheme } from '../context/ThemeContext';

const statusByMood = {
  calm: {
    title: 'Today',
    summary: 'You are in',
    accent: 'a restorative rhythm',
    chips: ['Hydrate well', 'Light movement'],
  },
  energetic: {
    title: 'Today',
    summary: 'You are feeling',
    accent: 'energized and focused',
    chips: ['Track symptoms', 'Use the music flow'],
  },
  low: {
    title: 'Today',
    summary: 'Your body may need',
    accent: 'extra rest and gentle care',
    chips: ['Sleep early', 'Warm tea'],
  },
};

const TodayStatus = () => {
  const { mood, style } = useTheme();
  const content = statusByMood[mood] ?? statusByMood.calm;

  return (
    <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mb-8">
      <h3 className="font-black text-gray-800 text-lg mb-2">{content.title}</h3>
      <p className="text-sm text-gray-500">
        {content.summary}{' '}
        <span className={`${style.accent} font-bold`}>{content.accent}</span>
      </p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {content.chips.map((chip) => (
          <span
            key={chip}
            className={`px-3 py-1 rounded-full text-xs font-bold ${style.border} border bg-white text-gray-600`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TodayStatus;
