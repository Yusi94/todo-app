import { useFilterTodo } from './contexts/TodoContext';
import CreateTaskForm from './CreateTaskForm';
import Task from './Task';
import ProgressBar from './ProgressBar';
import './styles/Todos.css';

const Todos = () => {
    const filteredTodos = useFilterTodo();
    
    return (
        <div className="todo-wrapper">
            <CreateTaskForm />
            <div className="todo-list-scroll-container">
                <div className="todo-list-scroll">
                    <ul className="todo-list">
                        {
                            filteredTodos.map(todo => <Task todo={todo} text={todo.text} key={todo.id} />)
                        }
                    </ul>
                </div>                
            </div>
            <ProgressBar />
        </div>
    );
}

export default Todos;