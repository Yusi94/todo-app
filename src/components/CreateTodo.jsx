import { useRef } from 'react';
import { useTodo } from '../contexts/TodoContext';
import Button from './common/Button';
import plus from '../assets/plus.svg';
import '../styles/CreateTodo.css';

function CreateTodo() {
  const inputTodoRef = useRef();
  const { todos, setTodos, setStatus } = useTodo();

  const handleSubmitTodo = (e) => {
    e.preventDefault();

    if (inputTodoRef.current.value.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Math.random() * 1000,
          text: inputTodoRef.current.value,
          isCompleted: false,
          isImportant: false,
          isDaily: false,
          optionsPopup: false,
          deletePopup: false,
        },
      ]);

      inputTodoRef.current.value = '';
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);

    const parent = e.target.parentNode;
    const children = parent.querySelectorAll('button');

    children.forEach((child) => child.removeAttribute('data-active'));

    e.target.setAttribute('data-active', 'active');
  };

  return (
    <div className="create-todo">
      <div className="todo-status-tabs">
        <button type="button" onClick={handleStatus} value="all" data-active="active">All</button>
        <button type="button" onClick={handleStatus} value="completed">Completed</button>
        <button type="button" onClick={handleStatus} value="uncompleted">Uncompleted</button>
        <button type="button" onClick={handleStatus} value="daily">Daily</button>
        <button type="button" onClick={handleStatus} value="important">Important</button>
      </div>
      <form className="todo-form">
        <label htmlFor="todo-input" className="todo-input-label">
          <span>Add Todo</span>
          <input ref={inputTodoRef} type="text" id="todo-input" className="todo-input" autoComplete="false" />
        </label>
        <button type="submit" onClick={handleSubmitTodo} className="todo-submit-btn"><img src={plus} alt="Add" /></button>
      </form>
    </div>
  );
}

export default CreateTodo;
