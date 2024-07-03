function Square({ val, onLClick, onRClick }) {
    return <div className="square" onClick={onLClick} onContextMenu={onRClick} >{val}</div>;
}

export default Square;