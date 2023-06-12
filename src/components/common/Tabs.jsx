import { useTodos } from '../../contexts/TodoContext';
import Tab from './Tab';
import '../../styles/Tabs.css';

export default function Tabs({ tabs }) {
    const { status, setStatus } = useTodos();

    const handleSwitchTab = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="todo-status-tabs">
            {tabs.map(tab => <Tab key={tab} label={tab} status={status} onClick={handleSwitchTab} />)}
        </div>
    );
}