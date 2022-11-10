import './styles/Popup.css';

const Popup = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

export default Popup;