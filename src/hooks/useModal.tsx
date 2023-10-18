import { useCallback, useState } from "react";

export const useModal = () => {

    const [ showModal, setShowModal ] = useState<boolean>( false );

    const openModal = useCallback( () => {
        setShowModal( true );
    }, [] );

    const closeModal = useCallback( () => {
        setShowModal( false );
    }, [] );

    return { showModal, openModal, closeModal };
};