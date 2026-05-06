import React, { createContext, useContext, useState } from 'react';

export const moodStyles = {
  calm: {
    bg: "bg-blue-50",
    button: "bg-blue-500",
    accent: "text-blue-600",
    border: "border-blue-100"
  },
  energetic: {
    bg: "bg-rose-50",
    button: "bg-rose-500",
    accent: "text-rose-600",
    border: "border-rose-100"
  },
  low: {
    bg: "bg-amber-50",
    button: "bg-amber-500",
    accent: "text-amber-600",
    border: "border-amber-100"
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mood, setMood] = useState('calm');

  const value = {
    mood,
    setMood,
    style: moodStyles[mood]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
