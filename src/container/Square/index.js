import React from 'react'
import './style.css'

export default function Square({value,onClick}) {
    const color = value==='X'?'red':'blue';
    return (
        <div className="square" onClick={onClick} style={{color:color}}>
            {value}
        </div>
    )
}
