import { useEffect, useState } from "react";
import { getUser } from "../../services/actions/auth";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ( { element, forAuthorized = false } ) => {
    const location = useLocation();

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

    if ( !forAuthorized && isAuthorized ) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={ from } />;
    }

    if ( forAuthorized && !isAuthorized ) {
        return <Navigate to="/login" state={ { from: location } } />;
    }

    return element;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};