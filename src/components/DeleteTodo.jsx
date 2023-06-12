import { useRef } from 'react';
import { useTodos, useTodosDispatch } from '../contexts/TodoContext';
import Popup from '../layout/Popup';
import SVG from './common/Svg';
import '../styles/DeleteTodo.css';

export default function DeleteTodo({ todo }) {
  const { setDisableDeletePopup } = useTodos();
  const dispatch = useTodosDispatch();

  const disablePopupCheckboxRef = useRef();

  const handleConfirmDelete = () => {
    dispatch({
      type: 'confirm_delete_todo',
      id: todo.id
    });
  };

  const handleCancelDelete = () => {
    dispatch({
      type: 'cancel_delete_todo',
      id: todo.id,
      deletePopup: false
    })
  };

  const handleDisablePopupCheckbox = () => {
    if (disablePopupCheckboxRef.current.checked) {
      setDisableDeletePopup(true);
    } else {
      setDisableDeletePopup(false);
    }
  };

  return (
    <>
      {todo.deletePopup && (
        <Popup key={todo.id} className="delete-confirmation-popup center-grid-item">
          <p>Are you sure you want to delete this todo?</p>
          <div className="flex">
            <button className="btn complete-btn center-grid-item" onClick={handleConfirmDelete}>
              <SVG
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                path="M24.0404 10.6262C24.431 11.0168 24.431 11.6499 24.0404 12.0404L14.7071 21.3738C14.3166 21.7643 13.6834 21.7643 13.2929 21.3738L7.95956 16.0404C7.56904 15.6499 7.56904 15.0168 7.95956 14.6262C8.35009 14.2357 8.98325 14.2357 9.37377 14.6262L14 19.2525L22.6262 10.6262C23.0168 10.2357 23.6499 10.2357 24.0404 10.6262Z" />
            </button>
            <button className="btn delete-btn center-grid-item" onClick={handleCancelDelete}>
              <SVG
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="1.5"
                path="M8.46445 15.5355L15.5355 8.46446 M8.46446 8.46447L15.5355 15.5355" />
            </button>
          </div>
          <div className="disable-popup-container">
            <label className="disable-popup-label flex" htmlFor="disable-popup">
              <input ref={disablePopupCheckboxRef} type="checkbox" id="disable-popup" onChange={handleDisablePopupCheckbox} />
              <span>Don&apos;t show again</span>
            </label>
          </div>
        </Popup>
      )}
    </>
  );
}
