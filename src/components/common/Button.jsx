import React from 'react';
import '../../styles/Button.css';

const Button = React.forwardRef(({
  children,
  className,
  childClassName,
  onClickFunction,
}, ref) => (
  <button
    type="button"
    className={`button ${className}`}
    onClick={onClickFunction}>
    <div
      ref={ref}
      className={`button-content ${childClassName}`}>
      {children}
    </div>
  </button>
));

export default Button;
