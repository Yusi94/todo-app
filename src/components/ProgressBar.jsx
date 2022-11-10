import { useEffect, useState } from 'react';
import { useTodo } from './contexts/TodoContext';
import './styles/ProgressBar.css';

const ProgressBar = () => {
    const { todos } = useTodo();
    const [completedTodosCount, setCompletedTodosCount] = useState(0);

    useEffect(() => {
        setCompletedTodosCount(todos.filter(todo => todo.isCompleted).length);
    }, [todos])

    const completion = completedTodosCount / todos.length * 100;

    return (
        <div className="progress-bar-container">
            <div className="progress-track">
                <div 
                    className="progress-bar" 
                    style={{ width: `${completion}%` }}>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;