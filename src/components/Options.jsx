import React from 'react';
import { useTodo } from './contexts/TodoContext';
import Popup from './Popup';
import Button from './Button';
import daily from '../assets/daily.svg';
import important from '../assets/exclamation.svg';
import edit from '../assets/edit.svg';
import './styles/Options.css';

const Options = React.forwardRef(({ todo }, {editTaskFormRef, editTaskInputRef, taskDescriptionRef, expandBtnContRef}) => {
    const { todos, setTodos } = useTodo();

    const focusEditInput = () => {
        editTaskFormRef.current.removeAttribute("hidden");
        editTaskInputRef.current.focus();
        
        // taskDescriptionRef.current.classList.add("hide");
        if(expandBtnContRef.current) {
            expandBtnContRef.current.classList.add("hide");
        }
    }

    const handleMarkDaily = () => {
        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    isDaily: !ele.isDaily
                }
            }

            return ele;
        }));
    }

    const handleMarkImportant = () => {
        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    isImportant: !ele.isImportant
                }
            }

            return ele;
        }));
    }

    return (
        <Popup key={todo.id} className="options-popup">
            {todo.optionsPopup ? 
                <div className="options">
                    <Button 
                        className="option"
                        childClassName="option-icon"
                        onClick={handleMarkDaily}
                        img={daily} 
                        alt="Mark"
                        text="Daily"
                    />
                    <Button 
                        className="option"
                        childClassName="option-icon"
                        onClick={handleMarkImportant}
                        img={important} 
                        alt="Mark"
                        text="Important"
                    />
                    <Button 
                        className="option"
                        childClassName="option-icon"
                        onClick={focusEditInput}
                        img={edit} 
                        alt="Mark"
                        text="Edit"
                    />
                </div> : 
            ''}
        </Popup>
    );
})

export default Options;