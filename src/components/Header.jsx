import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";
import './styles/Header.css';

const Header = () => {
    return (
        <div className="header-wrapper">
            <ThemeToggle />
            <Settings />
        </div>
    );
}

export default Header;