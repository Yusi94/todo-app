import React from 'react';
import { useTodosDispatch } from '../contexts/TodoContext';
import Popup from '../layout/Popup';
import SVG from './common/Svg';
import '../styles/TodoOptions.css';

const TodoOptions = React.forwardRef((
  { todo },
  {
    editTodoFormRef, 
    editTodoInputRef, 
    expandBtnContRef, 
    todoDescriptionRef,
  },
) => {
  const dispatch = useTodosDispatch();

  const focusEditInput = () => {
    todoDescriptionRef.current.classList.add('no-display');
    editTodoFormRef.current.removeAttribute('hidden');
    editTodoInputRef.current.focus();

    if (expandBtnContRef.current) {
      expandBtnContRef.current.classList.add('no-display');
    }
  };

  const handleMarkDaily = () => {
    dispatch({
      type: 'mark_daily',
      id: todo.id
    });
  };

  const handleMarkImportant = () => {
    dispatch({
      type: 'mark_daily',
      id: todo.id
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {todo.optionsPopup ? (
        <Popup key={todo.id} className="options-popup">
          <button
            type="button"
            className="option"
            onClick={handleMarkDaily}>
            <span className="option-icon">
              <SVG
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="white"
                path="M11.6364 5.44181C11.7799 5.40396 11.8991 5.30433 11.9619 5.16987C12.0247 5.03542 12.0245 4.88002 11.9614 4.74572L10.8542 2.38946C10.7717 2.21387 10.5951 2.10186 10.401 2.1021C10.207 2.10234 10.0307 2.21479 9.94861 2.39058L9.46019 3.43674C9.44273 3.42987 9.4247 3.42392 9.40615 3.41895C6.50791 2.64237 3.52889 4.36231 2.75231 7.26054C1.97573 10.1588 3.69567 13.1378 6.5939 13.9144C9.49214 14.691 12.4712 12.971 13.2477 10.0728C13.4947 9.15116 13.4891 8.2199 13.2728 7.35408C13.2059 7.08617 12.9345 6.92324 12.6666 6.99017C12.3987 7.05709 12.2357 7.32853 12.3027 7.59644C12.4789 8.30177 12.4837 9.06048 12.2818 9.81397C11.6482 12.1787 9.21749 13.5821 6.85272 12.9485C4.48796 12.3148 3.0846 9.88413 3.71824 7.51936C4.34151 5.19326 6.70355 3.79739 9.03129 4.35542L8.53849 5.41096C8.45642 5.58675 8.48345 5.79415 8.60783 5.94304C8.73222 6.09193 8.93151 6.15542 9.1191 6.10593L11.6364 5.44181Z" />
            </span>
            <span>Daily</span>
          </button>
          <button
            type="button"
            className="option"
            onClick={handleMarkImportant}>
            <span className="option-icon">
              <SVG
                width="2"
                height="16"
                viewBox="0 0 2 16"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                path="M1 -4.37114e-08C1.55228 -1.95703e-08 2 0.447715 2 1L2 9C2 9.55229 1.55228 10 1 10C0.447715 10 -4.17544e-07 9.55229 -3.93403e-07 9L-4.37114e-08 1C-1.95703e-08 0.447715 0.447715 -6.78525e-08 1 -4.37114e-08Z M2 13C2 13.5523 1.55228 14 1 14C0.447715 14 0 13.5523 0 13C0 12.4477 0.447715 12 1 12C1.55228 12 2 12.4477 2 13Z" />
            </span>
            <span>Important</span>
          </button>
          <button
            type="button"
            className="option"
            onClick={focusEditInput}>
            <span className="option-icon">
              <SVG
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                path="M10.0913 2.31311C9.99751 2.21934 9.87033 2.16667 9.73772 2.16667C9.60511 2.16667 9.47794 2.21934 9.38417 2.31311L3.25591 8.44137C3.19309 8.50419 3.14815 8.58261 3.12569 8.66856L2.45903 11.2208C2.41417 11.3926 2.46373 11.5752 2.58924 11.7008C2.71476 11.8263 2.89741 11.8758 3.06916 11.831L5.62144 11.1643C5.7074 11.1419 5.78582 11.0969 5.84863 11.0341L11.9769 4.90584C12.1722 4.71058 12.1722 4.39399 11.9769 4.19873L10.0913 2.31311ZM4.05895 9.05255L9.73772 3.37377L10.9162 4.55228L5.23746 10.2311L3.64228 10.6477L4.05895 9.05255Z M2.66666 12.8333C2.39051 12.8333 2.16666 13.0572 2.16666 13.3333C2.16666 13.6095 2.39051 13.8333 2.66666 13.8333H12.6667C12.9428 13.8333 13.1667 13.6095 13.1667 13.3333C13.1667 13.0572 12.9428 12.8333 12.6667 12.8333H2.66666Z" />
            </span>
            <span>Edit</span>
          </button>
        </Popup>
      ) : (
        ''
      )}
    </>
  );
});

export default TodoOptions;
