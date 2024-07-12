import React from 'react';

function Square({ val, onLClick, onRClick }) {
    if(val) {
        return <div className="square" style={{background: 'rgb(30, 30, 30)'}} onClick={onLClick} onContextMenu={onRClick} >{val}</div>;
    }
    return <div className="square" onClick={onLClick} onContextMenu={onRClick} >{val}</div>;
}

export default Square;