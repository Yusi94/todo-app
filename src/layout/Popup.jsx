import '../styles/Popup.css';

function Popup({ children, className }) {
  return (
    <div className={`popup ${className}`}>
      {children}
    </div>
  );
}

export default Popup;
