import { useRef } from 'react';
import { useTodo } from "./contexts/TodoContext";
import Popup from "./Popup";
import Button from "./Button";
import checkmark from '../assets/checkmark.svg';
import cross from '../assets/cross.svg';
import './styles/Delete.css';

const Delete = ({ todo }) => {
    const { todos, setTodos, setDisableDeletePopup } = useTodo();

    const disablePopupCheckboxRef = useRef();
    
    const handleConfirmDelete = () => {
        setTodos(todos.filter(ele => ele.id !== todo.id));
    };

    const handleCancelDelete = () => {
        setTodos(todos.map(ele => {
            if(ele.id === todo.id) {
                return {
                    ...ele,
                    deletePopup: false
                }
            }

            return ele;
        }));
    }

    const handleDisablePopupCheckbox = () => {
        if(disablePopupCheckboxRef.current.checked) {
            setDisableDeletePopup(true);
        } else {
            setDisableDeletePopup(false);
        }
    }

    return (
        <Popup key={todo.id} className="delete-confirmation-popup">
            {todo.deletePopup ?
            <div className="wrapper">
                <p>Delete this todo?</p>
                <div className="btn-wrapper">
                    <Button 
                        className="btn complete-btn" 
                        onClick={handleConfirmDelete}
                        img={checkmark} 
                        alt="Complete"
                    />
                    <Button 
                        className="btn delete-btn"
                        onClick={handleCancelDelete}
                        img={cross}
                        alt="Cancel" 
                    />
                </div>
                <div className="disable-popup-container">
                    <label className="disable-popup-label" htmlFor="disable-popup">
                        <input ref={disablePopupCheckboxRef} type="checkbox" id="disable-popup" onChange={handleDisablePopupCheckbox} />
                        <span>Don't show again</span>
                    </label>
                </div>
            </div> : ''}
        </Popup>
    ); 
}

export default Delete;