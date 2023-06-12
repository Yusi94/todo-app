export default function Tab({ label, status, onClick }) {
    const tabStyle = {
        backgroundColor: label === status ? 'hsl(0 0% 100%)' : 'hsl(0 0% 80%)'
    }

    return (
        <button value={label} onClick={onClick} style={tabStyle}>
            {label}
        </button>
    );
}