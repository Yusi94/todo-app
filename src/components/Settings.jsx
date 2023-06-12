import { useState, useRef, useEffect } from 'react';
import { useTodos } from '../contexts/TodoContext';
import Popup from '../layout/Popup';
import SVG from './common/Svg';
import '../styles/Settings.css';

function Settings() {
  const [settingsVisiblity, setSettingsVisiblity] = useState(false);
  const { disableDeletePopup, setDisableDeletePopup } = useTodos();

  const settingToggleRef = useRef();

  useEffect(() => {
    if (settingsVisiblity) {
      if (disableDeletePopup) {
        settingToggleRef.current.checked = true;
      } else {
        settingToggleRef.current.checked = false;
      }
    }
  }, [disableDeletePopup, settingsVisiblity]);

  useEffect(() => {
    localStorage.setItem('disable-delete-popup', JSON.stringify(disableDeletePopup));
  }, [disableDeletePopup]);

  const handleSettingsVisibility = () => {
    setSettingsVisiblity((prevVisibility) => !prevVisibility);
  };

  const handleDisableDeleteConfirmation = () => {
    setDisableDeletePopup((prevSetting) => !prevSetting);
  };

  return (
    <>
      <button className="settings-btn" onClick={handleSettingsVisibility}>
        <SVG
          width="34"
          height="34"
          viewBox="0 0 40 40"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          path="M20 5.13199L16.312 8.94782C15.9194 9.35397 15.3788 9.58332 14.814 9.58332H9.58332V14.814C9.58332 15.3788 9.35397 15.9194 8.94782 16.312L5.13198 20L8.94782 23.688C9.35397 24.0805 9.58332 24.6212 9.58332 25.186V30.4167H14.814C15.3788 30.4167 15.9194 30.646 16.312 31.0522L20 34.868L23.688 31.0522C24.0805 30.646 24.6212 30.4167 25.186 30.4167H30.4167V25.186C30.4167 24.6212 30.646 24.0805 31.0522 23.688L34.868 20L31.0522 16.312C30.646 15.9195 30.4167 15.3788 30.4167 14.814V9.58332H25.186C24.6212 9.58332 24.0805 9.35397 23.688 8.94782L20 5.13199ZM18.502 3.0846C19.3209 2.23726 20.6791 2.23726 21.498 3.0846L25.3628 7.08332H30.8333C31.9839 7.08332 32.9167 8.01606 32.9167 9.16665V14.6372L36.9154 18.502C37.7627 19.3209 37.7627 20.6791 36.9154 21.498L32.9167 25.3628V30.8333C32.9167 31.9839 31.9839 32.9167 30.8333 32.9167H25.3628L21.498 36.9154C20.6791 37.7627 19.3209 37.7627 18.502 36.9154L14.6372 32.9167H9.16665C8.01606 32.9167 7.08332 31.9839 7.08332 30.8333V25.3628L3.0846 21.498C2.23726 20.6791 2.23726 19.3209 3.0846 18.502L7.08332 14.6372V9.16665C7.08332 8.01606 8.01606 7.08332 9.16665 7.08332H14.6372L18.502 3.0846Z M12.0833 20C12.0833 15.6277 15.6277 12.0833 20 12.0833C24.3722 12.0833 27.9167 15.6277 27.9167 20C27.9167 24.3722 24.3722 27.9167 20 27.9167C15.6277 27.9167 12.0833 24.3722 12.0833 20ZM20 14.5833C17.0084 14.5833 14.5833 17.0084 14.5833 20C14.5833 22.9915 17.0084 25.4167 20 25.4167C22.9915 25.4167 25.4167 22.9915 25.4167 20C25.4167 17.0084 22.9915 14.5833 20 14.5833Z" />
      </button>
      {settingsVisiblity && (
        <Popup className="settings-popup">
          <p>Disable delete confirmation pop up</p>
          <label htmlFor="setting-toggle" className="switch">
            <input ref={settingToggleRef} id="setting-toggle" type="checkbox" onChange={handleDisableDeleteConfirmation} />
            <span className="slider round" />
          </label>
        </Popup>
      )}
    </>
  );
}

export default Settings;
