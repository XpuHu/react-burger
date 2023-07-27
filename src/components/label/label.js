import React from 'react';
import style from './label.module.css'

function Label({text}) {
    return (
        <label>{text}</label>
    );
}

export default Label;