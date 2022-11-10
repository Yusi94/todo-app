import React, { useEffect, useState, useContext } from 'react';

const TodoContext = React.createContext();
const FilterTodoContext = React.createContext();

export const useTodo = () => {
    return useContext(TodoContext);
}

export const useFilterTodo = () => {
    return useContext(FilterTodoContext);
}

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [disableDeletePopup, setDisableDeletePopup] = useState(JSON.parse(localStorage.getItem('disable-delete-popup')));

    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {        
        handleFilteredTodos(status, todos);
        saveLocalTodos(todos);
    }, [status, todos]);

    const handleFilteredTodos = (status, todos) => {
        switch(status) {
            case "completed":
                setFilteredTodos(todos.filter(todo => todo.isCompleted));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter(todo => !todo.isCompleted));
                break;
            case "daily":
                setFilteredTodos(todos.filter(todo => todo.isDaily));
                break;
            case "important":
                setFilteredTodos(todos.filter(todo => todo.isImportant));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    const saveLocalTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if(JSON.parse(localStorage.getItem('todos')).length === 0) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        }
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, setStatus, disableDeletePopup, setDisableDeletePopup }}> 
            <FilterTodoContext.Provider value={filteredTodos}>
                { children }
            </FilterTodoContext.Provider>     
        </TodoContext.Provider>
    );
}