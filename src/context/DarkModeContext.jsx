import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context
const DarkModeContext = createContext();

// Provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the saved theme from localStorage when the app starts
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevState => {
      const newState = !prevState;
      // Save the new state in localStorage
      localStorage.setItem("isDarkMode", newState);
      return newState;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use DarkModeContext
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
