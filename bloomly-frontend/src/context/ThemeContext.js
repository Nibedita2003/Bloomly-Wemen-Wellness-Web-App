import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import our database connection

// 1. Define your styles
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

// 2. The Provider Component
export const ThemeProvider = ({ children }) => {
  const [mood, setMood] = useState('calm');

  // Function to update mood locally AND in the database
  const updateMood = async (newMood) => {
    setMood(newMood); // Updates the UI immediately
    
    // Attempt to save to Supabase
    try {
      const { error } = await supabase
        .from('wellness_logs')
        .insert([{ mood: newMood }]);

      if (error) console.error("Supabase Error:", error.message);
      else console.log("Mood logged to DB!");
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const value = {
    mood,
    setMood: updateMood, // We swap the default setMood for our DB-connected version
    style: moodStyles[mood]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. The Hook for other components to use
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};