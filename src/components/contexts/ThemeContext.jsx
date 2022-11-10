import React, { useState, useContext, useEffect } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useThemeUpdate = () => {
    return useContext(ThemeUpdateContext);
}

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(() => {
        if(localStorage.getItem('theme')) return JSON.parse(localStorage.getItem('theme'));
        return false;
    });

    useEffect(() => {
        saveLocalTheme(darkTheme);
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    }

    const saveLocalTheme = (darkTheme) => {
        localStorage.setItem('theme', JSON.stringify(darkTheme));
    };

    return (
        <ThemeContext.Provider value={ darkTheme }> 
            <ThemeUpdateContext.Provider value={ toggleTheme }>
                { children }    
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}