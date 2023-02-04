import React, {
  useEffect, useState, useContext, useMemo, useCallback,
} from 'react';

const TodoContext = React.createContext();
const FilterTodoContext = React.createContext();

export const useTodo = () => useContext(TodoContext);

export const useFilterTodo = () => useContext(FilterTodoContext);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [disableDeletePopup, setDisableDeletePopup] = useState(JSON.parse(localStorage.getItem('disable-delete-popup')));

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    handleFilteredTodos(status, todos);
    saveLocalTodos(todos);
  }, [status, todos]);

  const handleFilteredTodos = (todoStatus, todoItems) => {
    switch (todoStatus) {
      case 'completed':
        setFilteredTodos(todoItems.filter((todo) => todo.isCompleted));
        break;
      case 'uncompleted':
        setFilteredTodos(todoItems.filter((todo) => !todo.isCompleted));
        break;
      case 'daily':
        setFilteredTodos(todoItems.filter((todo) => todo.isDaily));
        break;
      case 'important':
        setFilteredTodos(todoItems.filter((todo) => todo.isImportant));
        break;
      default:
        setFilteredTodos(todoItems);
        break;
    }
  };

  const saveLocalTodos = (todoItems) => {
    localStorage.setItem('todos', JSON.stringify(todoItems));
  };

  const getLocalTodos = () => {
    if (JSON.parse(localStorage.getItem('todos')).length === 0) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  };

  return (
    <TodoContext.Provider value={{
      todos, disableDeletePopup, setTodos, setStatus, setDisableDeletePopup,
    }}>
      <FilterTodoContext.Provider value={filteredTodos}>
        { children }
      </FilterTodoContext.Provider>
    </TodoContext.Provider>
  );
}
