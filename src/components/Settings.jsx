import { useState, useRef, useEffect } from 'react';
import { useTodo } from './contexts/TodoContext';
import Popup from './Popup';
import Button from './Button';
import settings from '../assets/settings.svg';
import './styles/Settings.css';

const Settings = () => {
    const { disableDeletePopup, setDisableDeletePopup } = useTodo();

    const [settingsVisiblity, setSettingsVisiblity] = useState(false);

    const settingToggleRef = useRef();

    useEffect(() => {
        if(settingsVisiblity) {
            if(disableDeletePopup) {
                settingToggleRef.current.checked = true;
            } else {
                settingToggleRef.current.checked = false;
            }
        }
    }, [settingsVisiblity]);

    useEffect(() => {
        localStorage.setItem('disable-delete-popup', JSON.stringify(disableDeletePopup));
    }, [disableDeletePopup]);

    const handleSettingsVisibility = () => {
        setSettingsVisiblity(prevVisibility => !prevVisibility);
    }

    const handleDisableDeleteConfirmation = () => {
        setDisableDeletePopup(prevSetting => !prevSetting);
    }

    return (
        <div className="settings-wrapper">
            <Button 
                className="settings-btn"
                onClick={handleSettingsVisibility}
                img={settings}
                alt="Settings"
            />
            {settingsVisiblity ?
                <Popup className="settings-popup">
                    <div className="settings-popup-container">
                        <p>Enable delete confirmation pop up</p>
                        <label htmlFor="setting-toggle" className="switch">
                            <input ref={settingToggleRef} id="setting-toggle" type="checkbox" onChange={handleDisableDeleteConfirmation} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </Popup> : ''
            }
        </div>
    );
}

export default Settings;