import React, { useState, useContext, useEffect } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(() => {
    if (localStorage.getItem('theme')) return JSON.parse(localStorage.getItem('theme'));
    return false;
  });

  useEffect(() => {
    saveLocalTheme(darkTheme);
  }, [darkTheme]);

  // why does it change every render?
  // anything to do with referencial equality?
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const saveLocalTheme = (isDarkTheme) => {
    localStorage.setItem('theme', JSON.stringify(isDarkTheme));
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        { children }
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
