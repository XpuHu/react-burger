import React from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './modal-header.module.css';

function ModalHeader( { header, handleClose } ) {
    return (
        <div className={ `${ style.modalHeader } text text_type_main-large ml-10 mt-10 mr-10` }>
            <span>{ header }</span>
            <div className={ style.close }>
                <CloseIcon type={ 'primary' } onClick={ handleClose }/>
            </div>
        </div>
    );
}

export default ModalHeader;