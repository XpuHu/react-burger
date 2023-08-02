import React, { useEffect } from 'react';
import style from './modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "./modal-header/modal";

const modalRoot = document.getElementById( "react-modals" );

function Modal( { children, header, handleClose } ) {

    useEffect(() => {
        const closeOnEsc = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEsc);
        return () => {
            document.body.removeEventListener("keydown", closeOnEsc);
        };
    }, [handleClose]);

    return ReactDOM.createPortal(
        (
            <>
                <div className={`${style.modal}`}>
                    <ModalHeader header={header} handleClose={handleClose} />
                    {children}
                </div>
                <ModalOverlay onClose={handleClose} />
            </>
        ),
        modalRoot
    );
}

export default Modal;