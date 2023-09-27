import { useEffect, useState } from "react";
import { getUser } from "../../services/actions/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ( { element } ) => {
    const { user } = useSelector( state => state.auth );
    const [ isUserLoaded, setUserLoaded ] = useState( false );

    const init = async () => {
        await getUser();
        setUserLoaded( true );
    };

    useEffect( () => {
        init();
    }, [] );

    if ( !isUserLoaded ) {
        return null;
    }

    return user ? element : <Navigate to="/login" replace />;
};