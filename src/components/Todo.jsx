import { useEffect, useState, useRef } from 'react';
import { useTodos, useTodosDispatch } from '../contexts/TodoContext';
import TodoOptions from './TodoOptions';
import DeleteTodo from './DeleteTodo';
import SVG from './common/Svg';
import daily from '../assets/daily.svg';
import important from '../assets/important.svg';
import '../styles/Todo.css';

function Todo({ todo, text }) {
  const [editTodo, setEditTodo] = useState(text);
  const { todos, disableDeletePopup, } = useTodos();
  const dispatch = useTodosDispatch();

  const todoItemRef = useRef();
  const editTodoFormRef = useRef();
  const editTodoInputRef = useRef();
  const todoDescriptionRef = useRef();
  const todoDescriptionHiddenRef = useRef();
  const expandBtnContRef = useRef();
  const caretRef = useRef();

<<<<<<< Updated upstream
  useEffect(() => {
    handleRemoveFocus();
=======
  const {
    todos,
    setTodos,
    disableDeletePopup,
  } = useTodo();

  const handleRemoveFocus = useCallback(() => {
    setTodos(todos.map((ele) => {
      if (ele.optionsPopup) {
        return {
          ...ele,
          optionsPopup: false,
        };
      }

      if (ele.deletePopup) {
        return {
          ...ele,
          deletePopup: false,
        };
      }

      return ele;
    }));

    setEditTodo(text);

    resetElementsToDefault();
  }, [setTodos, text, todos]);

  const resetDailyTodos = useCallback(() => {
    setTimeout(() => {
      setTodos(todos.map((ele) => {
        if (ele.id === todo.id) {
          return {
            ...ele,
            isCompleted: false,
          };
        }

        return ele;
      }));
    }, 86400000);
  }, [setTodos, todo.id, todos]);

  const isDescriptionLong = useCallback(() => {
    const pElementWidth = todoDescriptionRef.current.clientWidth;
    const spanElementWidth = todoDescriptionHiddenRef.current.getBoundingClientRect().width;

    setIsTextLong(spanElementWidth >= pElementWidth);
  }, []);

  useEffect(() => {
    handleRemoveFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> Stashed changes
  }, []);

  useEffect(() => {
    const editInput = editTodoInputRef.current;
    editInput.addEventListener('blur', handleRemoveFocus);
    window.addEventListener('click', handleRemoveFocus, { capture: true });

    return () => {
      editInput.removeEventListener('blur', handleRemoveFocus);
      window.removeEventListener('click', handleRemoveFocus, { capture: true });
    };
  }, [handleRemoveFocus]);

  /*
    @desc Adds an expand button if the width of the todo text is larger than its container
  */
  const [isTextLong, setIsTextLong] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', isDescriptionLong);

    return () => {
      window.addEventListener('resize', isDescriptionLong);
    };
  }, [todos, isDescriptionLong]);

  useEffect(() => {
    if (todo.isDaily && todo.isCompleted) {
      resetDailyTodos();
    }
  }, [todo.isDaily, todo.isCompleted]);

  function handleRemoveFocus() {
    dispatch({
      type: 'remove_focus',
      optionsPopup: false,
      deletePopup: false,
    });

    setEditTodo(text);

    resetElementsToDefault();
  }

  const handleCompleteTodo = () => {
    dispatch({
      type: 'complete_todo',
      id: todo.id,
    });
  };

  const handleOptionsPopup = () => {
    dispatch({
      type: 'toggle_options_popup',
      id: todo.id
    });
  };

  const handleDeletePopup = () => {
    if(!disableDeletePopup) {
      dispatch({
        type: 'show_delete_popup',
        id: todo.id,
        deletePopup: true
      });
    } else {
      dispatch({
        type: 'confirm_delete_todo',
        id: todo.id
      });
    }
  };

  const handleEditTodo = (e) => {
    setEditTodo(e.target.value);
  };

  const handleEditTodoSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: 'edit_todo',
      id: todo.id,
      text: editTodo
    });

    resetElementsToDefault();
  };

  function resetDailyTodos() {
    setTimeout(() => {
      dispatch({
        type: 'reset_daily',
        id: todo.id,
        isCompleted: false,
      });
    }, 86400000);
  };

  function isDescriptionLong() {
    const pElementWidth = todoDescriptionRef.current.clientWidth;
    const spanElementWidth = todoDescriptionHiddenRef.current.getBoundingClientRect().width;

    setIsTextLong(spanElementWidth >= pElementWidth);
  };

  const toggleTextExpansion = () => {
    todoDescriptionRef.current.classList.toggle('expanded-todo-description');
    caretRef.current.classList.toggle('rotate-caret');
  };

  const resetElementsToDefault = () => {
    todoDescriptionRef.current.classList.remove('no-display');
    editTodoFormRef.current.setAttribute('hidden', true);

    if (expandBtnContRef.current) {
      expandBtnContRef.current.classList.remove('hide-expand-btn');
    }
  };

  return (
    <li
      ref={todoItemRef}
      className="todo">
      <div className={`todo-content ${todo.isCompleted ? 'completed-todo' : ''}`}>
        <form
          ref={editTodoFormRef}
          onSubmit={handleEditTodoSubmit}
          hidden>
          <input
            ref={editTodoInputRef}
            className="edit-input"
            type="text"
            value={editTodo}
            onChange={handleEditTodo} />
        </form>
        <p
          ref={todoDescriptionRef}
          className="todo-description">
          {text}
        </p>
        <span
          ref={todoDescriptionHiddenRef}
          className="todo-description-hidden">
          {text}
        </span>
        <div className="btn-wrapper flex">
          <button
            type="button"
            className="btn complete-btn center-grid-item"
            onClick={handleCompleteTodo}>
            <SVG
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
              path="M24.0404 10.6262C24.431 11.0168 24.431 11.6499 24.0404 12.0404L14.7071 21.3738C14.3166 21.7643 13.6834 21.7643 13.2929 21.3738L7.95956 16.0404C7.56904 15.6499 7.56904 15.0168 7.95956 14.6262C8.35009 14.2357 8.98325 14.2357 9.37377 14.6262L14 19.2525L22.6262 10.6262C23.0168 10.2357 23.6499 10.2357 24.0404 10.6262Z" />
          </button>
          <button
            type="button"
            className="btn delete-btn center-grid-item"
            onClick={handleDeletePopup}>
            <SVG
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
              path="M12.3333 4C12.3333 3.44772 12.781 3 13.3333 3H18.6667C19.2189 3 19.6667 3.44772 19.6667 4V5H25.3333C25.8856 5 26.3333 5.44772 26.3333 6C26.3333 6.55228 25.8856 7 25.3333 7H6.66666C6.11438 7 5.66666 6.55228 5.66666 6C5.66666 5.44772 6.11438 5 6.66666 5H12.3333V4Z M8.31986 10.593C8.35737 10.2554 8.64275 10 8.98245 10H23.0175C23.3572 10 23.6426 10.2554 23.6801 10.593L23.947 12.9948C24.428 17.3241 24.428 21.6934 23.947 26.0227L23.9207 26.2592C23.7455 27.8359 22.5235 29.0932 20.9523 29.3132C17.6668 29.7731 14.3332 29.7731 11.0477 29.3132C9.47649 29.0932 8.25446 27.8359 8.07926 26.2591L8.05299 26.0227C7.57196 21.6934 7.57196 17.3241 8.05299 12.9948L8.31986 10.593ZM14.3333 15.2C14.3333 14.6477 13.8856 14.2 13.3333 14.2C12.781 14.2 12.3333 14.6477 12.3333 15.2L12.3333 24.5333C12.3333 25.0856 12.781 25.5333 13.3333 25.5333C13.8856 25.5333 14.3333 25.0856 14.3333 24.5333L14.3333 15.2ZM19.6667 15.2C19.6667 14.6477 19.219 14.2 18.6667 14.2C18.1144 14.2 17.6667 14.6477 17.6667 15.2V24.5333C17.6667 25.0856 18.1144 25.5333 18.6667 25.5333C19.2189 25.5333 19.6667 25.0856 19.6667 24.5333V15.2Z" />
          </button>
          <button
            type="button"
            className="option-btn center-grid-item"
            onClick={handleOptionsPopup}>
            <SVG
              width="24"
              height="24"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="1.5"
              path="M10 4.50002C10.2762 4.50002 10.5 4.72388 10.5 5.00002C10.5 5.27617 10.2762 5.50002 10 5.50002C9.72387 5.50002 9.50002 5.27617 9.50002 5.00002C9.50002 4.72388 9.72387 4.50002 10 4.50002ZM10 9.50002C10.2762 9.50002 10.5 9.72388 10.5 10C10.5 10.2762 10.2762 10.5 10 10.5C9.72387 10.5 9.50002 10.2762 9.50002 10C9.50002 9.72388 9.72387 9.50002 10 9.50002ZM10 14.5C10.2762 14.5 10.5 14.7239 10.5 15C10.5 15.2762 10.2762 15.5 10 15.5C9.72387 15.5 9.50002 15.2762 9.50002 15C9.50002 14.7239 9.72387 14.5 10 14.5Z" />
          </button>
        </div>
        {isTextLong && (
          <div
            ref={expandBtnContRef}
            className="expand-btn-container">
            <button
              type="button"
              className="expand-btn"
              onClick={toggleTextExpansion}>
              <span ref={caretRef} className="caret center-grid-item">
                <SVG
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  path="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" />
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="todo-markers center-grid-item">
        {todo.isDaily && (
          <div className="daily-todo center-grid-item">
            <img src={daily} alt="Daily" />
          </div>
        )}
        {todo.isImportant && (
          <div className="important-todo center-grid-item">
            <img src={important} alt="Important" />
          </div>
        )}
      </div>
      <TodoOptions
        ref={{editTodoFormRef, editTodoInputRef, todoDescriptionRef, expandBtnContRef}}
        todo={todo} />
      {!disableDeletePopup && (
        <DeleteTodo todo={todo} />
      )}
    </li>
  );
}

export default Todo;
