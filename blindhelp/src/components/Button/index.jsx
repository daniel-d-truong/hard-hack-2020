import React from 'react';
import './style.css';

const Button = (props) => {
    return (
        <div onClick={props.recogFunc} className="button">
            <p>Microphone</p>
        </div>
    )
}

export default Button;