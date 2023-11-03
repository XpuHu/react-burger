import React, { FC, PropsWithChildren, useEffect } from 'react';
import style from './modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalData = {
    handleClose: () => void
}

const modalRoot = document.getElementById( 'react-modals' );

const Modal: FC<PropsWithChildren<TModalData>> = ({ children, handleClose }) => {

    useEffect( () => {
        const closeOnEsc = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener( 'keydown', closeOnEsc );
        return () => {
            document.body.removeEventListener( 'keydown', closeOnEsc );
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
        modalRoot!
    );
}

export default Modal;