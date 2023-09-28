import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = () => {

    const [ showModal, setShowModal ] = useState( false );
    const navigate = useNavigate();

    const openModal = useCallback( () => {
        setShowModal( true );
    }, [] );

    const closeModal = useCallback( () => {
        setShowModal( false );
        navigate( -1 );
    }, [] );

    return { showModal, openModal, closeModal };
};