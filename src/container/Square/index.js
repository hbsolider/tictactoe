import React from 'react'
import './style.css'

export default function Square({value,onClick,current,isWin}) {
    const color = value==='X'?'red':'blue';
    const bgColor = isWin?'black':current?'#d6d2c4':'#ffffff';
    return (
        <div className="square" onClick={onClick} style={{color,backgroundColor:bgColor}}>
            {value}
        </div>
    )
}
