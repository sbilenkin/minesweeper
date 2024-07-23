import React from 'react';

function Square({ val, onLClick, onRClick }) {
    if((val === 0 || val) && val !== 'X') {
        return <div className="square" style={{background: 'rgb(30, 30, 30)'}} onClick={onLClick} onContextMenu={onRClick} >{val}</div>;
    }
    else if(val === 'X') {
        return <div className="square" onClick={onLClick} onContextMenu={onRClick} ><i className="fas fa-flag"></i></div>;
    }
    else {
        return <div className="square" onClick={onLClick} onContextMenu={onRClick} >{val}</div>;
    }
}

export default Square;