import { useRef } from 'react';
import { useTodo } from './contexts/TodoContext';
import plus from '../assets/plus.svg';
import './styles/CreateTaskForm.css';

const CreateTaskForm = () => {
    const inputTaskRef = useRef();
    const { todos, setTodos, setStatus } = useTodo();

    const handleSubmitTask = (e) => {
        e.preventDefault();

        if(inputTaskRef.current.value.trim() !== "") {
            setTodos([
                ...todos, 
                {
                    id: Math.random() * 1000,
                    text: inputTaskRef.current.value,
                    isCompleted: false,
                    isImportant: false,
                    isDaily: false,
                    optionsPopup: false,
                    deletePopup: false
                }
            ]);
    
            inputTaskRef.current.value = "";
        }
    }

    const handleStatus = (e) => {
        setStatus(e.target.value);

        const parent = e.target.parentNode;
        const children = parent.querySelectorAll('button');

        children.forEach(button => button.removeAttribute('data-active'));

        e.target.setAttribute('data-active', 'active');
    }

    return (
        <div className="form-wrapper">
            <div className="todo-status-container">
                <button onClick={handleStatus} value="all" data-active="active">All</button>
                <button onClick={handleStatus} value="completed">Completed</button>
                <button onClick={handleStatus} value="uncompleted">Uncompleted</button>
                <button onClick={handleStatus} value="daily">Daily</button>
                <button onClick={handleStatus} value="important">Important</button>
            </div>
            <form className="todo-form">
                <div className="todo-input-wrapper">
                    <label htmlFor="todo-input" className="todo-input-label">Add Task</label>
                    <input ref={inputTaskRef} type="text" id="todo-input" className="todo-input" autoComplete="false" />
                </div>
                <button onClick={handleSubmitTask} type="submit" className="todo-submit-btn"><img src={plus} alt="Add"></img></button>
            </form>
        </div>
    );
}

export default CreateTaskForm;