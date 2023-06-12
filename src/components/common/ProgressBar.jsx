import { useEffect, useState } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import '../../styles/ProgressBar.css';

function ProgressBar() {
  const { todos } = useTodos();
  const [completedTodosCount, setCompletedTodosCount] = useState(0);

  useEffect(() => {
    if(todos.length) setCompletedTodosCount(todos.filter((todo) => todo.isCompleted).length);
  }, [todos]);

  const completion = (completedTodosCount / todos.length) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-track">
        <div
          className="progress-thumb"
          style={{ width: `${completion}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
