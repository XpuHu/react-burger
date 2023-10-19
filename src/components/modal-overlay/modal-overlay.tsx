import React, { FC } from 'react';
import style from './modal-overlay.module.css';

type TModalOverlay = {
    onClose: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return (
        <div className={ style.overlay } onClick={ onClose } onKeyDown={ onClose }>
        </div>
    );
}

export default ModalOverlay;