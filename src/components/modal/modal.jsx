import React, { useEffect } from 'react';
import style from './modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById( "react-modals" );

function Modal( { children, handleClose } ) {

    useEffect( () => {
        const closeOnEsc = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener( "keydown", closeOnEsc );
        return () => {
            document.body.removeEventListener( "keydown", closeOnEsc );
        };
    }, [ handleClose ] );

    return ReactDOM.createPortal(
        (
            <>
                <div className={ `${ style.modal }` }>
                    <div className={ style.close }>
                        <CloseIcon type={ 'primary' } onClick={ handleClose } />
                    </div>
                    { children }
                </div>
                <ModalOverlay onClose={ handleClose } />
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.any
};

export default Modal;