import ThemeToggle from '../components/ThemeToggle';
import Settings from '../components/Settings';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <ThemeToggle />
      <Settings />
    </div>
  );
}

export default Header;
