import React from 'react';
import Label from "../label/label";

function Link({Element, address, labelText}) {
    return (
        <a href={address}>
            <Element type="primary"/>
            {
                labelText !== ''
                    ? <span className={'text_color_inactive'}>{labelText}</span>
                    : <></>
            }
        </a>
    );
}

export default Link;