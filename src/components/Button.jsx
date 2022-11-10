import React from 'react';
import './styles/Button.css';

const Button = React.forwardRef((props, ref) => {
    const handleOnClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button className={props.className} onClick={handleOnClick}>
            <div className="button-content">
                <div 
                    ref={ref}
                    className={props.childClassName}>
                    <img   
                        src={props.img} 
                        alt={props.alt}>
                    </img>
                </div>
                {props.text ?
                <span>{props.text}</span> : ''
                }
            </div>
        </button>
    );
});

export default Button;