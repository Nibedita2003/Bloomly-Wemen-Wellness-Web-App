import React from 'react';

const routeTitles = {
  '/': 'Daily Overview',
  '/log': 'Cycle Calendar',
  '/care': 'Self Care',
  '/stats': 'Wellness Insights',
};

const TopBar = ({ pathname = '/' }) => {
  const title = routeTitles[pathname] ?? routeTitles['/'];
  const today = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">
          Bloomly
        </p>
        <h2 className="text-xl font-black text-gray-800 italic tracking-tight">{title}</h2>
      </div>
      <div className="text-xs sm:text-sm text-gray-400 font-bold">{today}</div>
    </div>
  );
};

export default TopBar;
