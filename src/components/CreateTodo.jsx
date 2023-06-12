import { useRef } from 'react';
import { useTodosDispatch } from '../contexts/TodoContext';
import plus from '../assets/plus.svg';
import '../styles/CreateTodo.css';

export default function CreateTodo() {
  const dispatch = useTodosDispatch();
  
  const inputTodoRef = useRef();
  const submitTodoBtnRef = useRef();

  // TODO: different solution
  const handleTextLength = (e) => {
    const textLength = e.target.value;
    if (textLength.length >= 45) {
      submitTodoBtnRef.current.style.opacity = 0.5;
    } else {
      submitTodoBtnRef.current.style.opacity = 1;
    }
  };

  const handleSubmitTodo = (e) => {
    e.preventDefault();

    if (inputTodoRef.current.value.trim() !== '') {
      dispatch({
        type: 'add_todo',
        id: Math.random() * 1000,
        text: inputTodoRef.current.value,
        isCompleted: false,
        isImportant: false,
        isDaily: false,
        optionsPopup: false,
        deletePopup: false,
      });

      inputTodoRef.current.value = '';
    }
  };

  return (
    <div className="create-todo">
      <form className="todo-form">
        <label htmlFor="todo-input" className="todo-input-label">
          <span>Add Todo</span>
          <input ref={inputTodoRef} type="text" onChange={handleTextLength} id="todo-input" className="todo-input" autoComplete="false" />
        </label>
        <button ref={submitTodoBtnRef} onClick={handleSubmitTodo} className="todo-submit-btn">
          <img src={plus} alt="Add" />
        </button>
      </form>
    </div>
  );
}
