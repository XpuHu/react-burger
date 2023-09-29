import { useEffect, useState } from "react";
import { getUser } from "../../services/actions/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ( { element } ) => {
    const { isAuthorized } = useSelector( state => state.auth );
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

    return isAuthorized ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};