import React from 'react';
import style from './modal-overlay.module.css';

function ModalOverlay( { onClose } ) {
    return (
        <div className={ style.overlay } onClick={ onClose } onKeyDown={onClose}>
        </div>
    );
}

export default ModalOverlay;