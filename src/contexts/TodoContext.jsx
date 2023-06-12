import {
  createContext, useEffect, useState, useContext, useReducer
} from 'react';

const TodosContext = createContext(null);
const TodosDispatchContext = createContext(null);
const FilterTodosContext = createContext(null);

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);
export const useFilteredTodos = () => useContext(FilterTodosContext);

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, JSON.parse(localStorage.getItem('todos')) ?? []);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState('All');
  const [disableDeletePopup, setDisableDeletePopup] = useState(JSON.parse(localStorage.getItem('disable-delete-popup')));

  useEffect(() => {
    setFilteredTodos(() => filterTodos(status, todos));
    saveLocalTodos(todos);
  }, [status, todos]);

  function saveLocalTodos(todoItems) {
    localStorage.setItem('todos', JSON.stringify(todoItems));
  }

  return (
    <TodosContext.Provider value={{todos, disableDeletePopup, status, setDisableDeletePopup, setStatus}}>
      <TodosDispatchContext.Provider value={dispatch}>
        <FilterTodosContext.Provider value={filteredTodos}>
          { children }
        </FilterTodosContext.Provider>
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

function filterTodos(status, todos) {
  switch (status) {
    case 'Completed': {
      return todos.filter((todo) => todo.isCompleted);
    }
    case 'Uncompleted': {
      return todos.filter((todo) => !todo.isCompleted);
    }
    case 'Daily': {
      return todos.filter((todo) => todo.isDaily);
    }
    case 'Important': {
      return todos.filter((todo) => todo.isImportant);
    }
    default:
      return todos;
  }
}

function todosReducer(todos, action) {
  switch(action.type) {
    case 'add_todo': {
      return [...todos, {
        id: action.id,
        text: action.text,
        isCompleted: action.isCompleted,
        isImportant: action.isImportant,
        isDaily: action.isDaily,
        optionsPopup: action.optionsPopup,
        deletePopup: action.deletePopup,
      }];
    }
    case 'toggle_options_popup': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            optionsPopup: !t.optionsPopup,
            deletePopup: false,
          };
        }
        return {
          ...t,
          optionsPopup: false,
          deletePopup: false,
        };
      });
    }
    case 'show_delete_popup': {
        return todos.map(t => {
          if (t.id === action.id) {
            return {
              ...t,
              deletePopup: action.deletePopup,
              optionsPopup: false,
            };
          }
          return {
            ...t,
            deletePopup: false,
            optionsPopup: false,
          };
        });
    }
    case 'confirm_delete_todo': {
      return todos.filter(t => t.id !== action.id);
    }
    case 'cancel_delete_todo': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            deletePopup: action.deletePopup,
          };
        }
  
        return t;
      });
    }
    case 'edit_todo': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            text: action.text,
            optionsPopup: false,
          };
        }
  
        return t;
      });
    }
    case 'complete_todo': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        }
  
        return t;
      });
    }
    case 'mark_daily': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            isDaily: !t.isDaily,
          };
        }
  
        return t;
      });
    }
    case 'mark_important': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            isImportant: !t.isImportant,
          };
        }
  
        return t;
      });
    }
    case 'remove_focus': {
      return todos.map(t => {
        if (t.optionsPopup) {
          return {
            ...t,
            optionsPopup: action.optionsPopup,
          };
        }
  
        if (t.deletePopup) {
          return {
            ...t,
            deletePopup: action.deletePopup,
          };
        }
  
        return t;
      });
    }
    case 'reset_daily': {
      return todos.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            isCompleted: false,
          };
        }

        return t;
      });
    }
    default:
      throw Error(`Unknown action ${action.type}`);
  }
}
