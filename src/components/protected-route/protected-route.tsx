import { FC, ReactElement } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

type TProtectedRoute = {
    forAuthorized?: boolean,
    element: ReactElement
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ element, forAuthorized = false }) => {
    const location = useLocation();

    const { isAuthorized } = useSelector( state => state.auth );
    // const [ isUserLoaded, setUserLoaded ] = useState( false );
    //
    // const init = async () => {
    //     await checkAuth();
    //     setUserLoaded( true );
    // };
    //
    // useEffect( () => {
    //     init();
    // }, [] );
    //
    // if ( !isUserLoaded ) {
    //     return null;
    // }

    if ( !forAuthorized && isAuthorized ) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={ from } />;
    }

    if ( forAuthorized && !isAuthorized ) {
        return <Navigate to='/login' state={ { from: location } } />;
    }

    return element;
};