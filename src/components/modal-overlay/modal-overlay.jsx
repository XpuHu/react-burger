import React from 'react';
import style from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay( { onClose } ) {
    return (
        <div className={ style.overlay } onClick={ onClose } onKeyDown={onClose}>
        </div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;