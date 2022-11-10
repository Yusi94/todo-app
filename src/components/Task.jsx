import { useEffect, useState, useRef } from 'react';
import { useTodo } from './contexts/TodoContext';
import Options from './Options';
import Delete from './Delete';
import Button from './Button';
import checkmark from '../assets/checkmark.svg';
import trash from '../assets/trash.svg';
import options from '../assets/options.svg';
import caret from '../assets/caret.svg';
import daily from '../assets/daily.svg';
import important from '../assets/exclamation.svg';
import './styles/Task.css';

const Task = ({ text, todo }) => {
    const [editTodo, setEditTodo] = useState(text);

    const todoItemRef = useRef();
    const editTaskFormRef = useRef();
    const editTaskInputRef = useRef();
    const taskDescriptionRef = useRef();
    const expandBtnContRef = useRef();
    const caretRef = useRef();

    const { 
        todos, 
        setTodos, 
        disableDeletePopup 
    } = useTodo();

    useEffect(() => {
        handleRemoveFocus();
    }, []);

    useEffect(() => {
        const editInput = editTaskInputRef.current;
        editInput.addEventListener("blur", handleRemoveFocus);
        window.addEventListener("click", handleRemoveFocus);
        return () => {
            editInput.removeEventListener("blur", handleRemoveFocus);
            window.removeEventListener("click", handleRemoveFocus);
        };
    });

    /* 
        @desc Adds an expand button if the width of the todo text is larger than its container
    */
    const [isTextLong, setIsTextLong] = useState(false);
    useEffect(() => {
        const pElementWidth = taskDescriptionRef.current.clientWidth;
        const spanElementWidth = taskDescriptionRef.current.firstChild.getBoundingClientRect().width;

        // TODO: setting state inside useEffect?
        setIsTextLong(pElementWidth < spanElementWidth);
    }, [todos]);

    const handleCompleteTask = () => {
        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    isCompleted: !ele.isCompleted
                }
            }

            return ele;
        }));
    };

    const handleToggleExpandText = () => {
        taskDescriptionRef.current.classList.toggle("expanded-task-description");
        caretRef.current.classList.toggle("rotate-caret");
    };
    
    const handleOptionsPopup = () => {      
        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    optionsPopup: !ele.optionsPopup,
                    deletePopup: false
                }
            } else {
                return {
                    ...ele,
                    optionsPopup: false,
                    deletePopup: false
                }
            }
        }));
    };

    const handleDeletePopup = () => {
        if(disableDeletePopup) {
            setTodos(todos.filter(ele => ele.id !== todo.id));
        } else {
            setTodos(todos.map(ele => {
                if(ele.id === todo.id) {
                    return {
                        ...ele,
                        deletePopup: true,
                        optionsPopup: false
                    }
                } else {
                    return { 
                        ...ele,
                        deletePopup: false,
                        optionsPopup: false
                    }
                }
            }));
        }
    };

    const handleEditTextInput = (e) => {
        setEditTodo(e.target.value);
    }

    const handleEditTextSubmit = (e) => {
        e.preventDefault();

        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    text: editTodo,
                    optionsPopup: false
                }
            }

            return ele;
        }));

        resetElementsToDefault();
    }

    const handleRemoveFocus = () => {
        setTodos(todos.map(ele => {
            if(ele.optionsPopup) {
                return { 
                    ...ele,
                    optionsPopup: false
                }
            } else if(ele.deletePopup) {
                return { 
                    ...ele,
                    deletePopup: false
                }
            } else {
                return ele;
            }
        }));

        // TODO: instead of updating state can refs be used?
        setEditTodo(text);

        resetElementsToDefault();
    }

    const resetElementsToDefault = () => {
        editTaskFormRef.current.setAttribute("hidden", true);

        // taskDescriptionRef.current.classList.remove("hide");
        if(expandBtnContRef.current) {
            expandBtnContRef.current.classList.remove("hide");
        }
    }

    return (
        <li ref={todoItemRef} className="todo-item">
            <div className={`task-content ${todo.isCompleted ? "task-completed" : ""}`}>
                <form 
                    ref={editTaskFormRef} 
                    className="edit-input-form" 
                    onSubmit={handleEditTextSubmit} 
                    hidden>
                    <input 
                        ref={editTaskInputRef} 
                        className="edit-input" 
                        type="text" 
                        value={editTodo}
                        onChange={handleEditTextInput} 
                    />
                </form>
                <p 
                    ref={taskDescriptionRef} 
                    className="task-description">
                    <span>{text}</span>
                </p>
                <div className="btn-wrapper">
                    <Button 
                        className="btn complete-btn" 
                        onClick={handleCompleteTask} 
                        img={checkmark} 
                        alt="Complete"
                    />
                    <Button 
                        className="btn delete-btn" 
                        onClick={handleDeletePopup} 
                        img={trash} 
                        alt="Delete" 
                    />
                    <Button 
                        className="option-btn"
                        onClick={handleOptionsPopup}
                        img={options}
                        alt="Options" 
                    />
                </div>
                {isTextLong ? 
                    <div 
                        ref={expandBtnContRef} 
                        className="expand-btn-container">
                        <Button 
                            ref={caretRef}
                            className="expand-btn" 
                            childClassName="caret"
                            onClick={handleToggleExpandText} 
                            img={caret} 
                            alt="Expand" 
                        />
                    </div> : 
                ''}
            </div>
            <div className="marked-todo-container">
                <div>
                    {todo.isDaily ?
                        <div>
                            <img src={daily} alt="Daily"></img>
                        </div> :
                        ''
                    }
                </div>
                <div>
                    {todo.isImportant ?
                    <div>
                        <img src={important} alt="Important"></img>
                    </div> :
                        ''
                    }
                </div>
            </div>
            <Options ref={{editTaskFormRef, editTaskInputRef, taskDescriptionRef, expandBtnContRef}} todo={todo} />
            {!disableDeletePopup ?
                <Delete todo={todo} /> : ''          
            } 
        </li>
    );
}

export default Task;