import { useEffect, useRef } from 'react';
import { useTheme, useThemeUpdate } from './contexts/ThemeContext';
import './styles/ThemeToggle.css';

const ThemeToggle = () => {
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    const themeToggleRef = useRef();

    useEffect(() => {
        if(darkTheme) {
            themeToggleRef.current.checked = true;
            document.documentElement.classList.add("dark-theme");
        } else {
            themeToggleRef.current.checked = false;
            document.documentElement.classList.remove("dark-theme");
        }
    }, [darkTheme]);

    return (
        <div className="toggle-wrapper">
            <label htmlFor="dark-toggle" className="switch">
                <input ref={themeToggleRef} id="dark-toggle" type="checkbox" onChange={toggleTheme} />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default ThemeToggle;