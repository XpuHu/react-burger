import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    updateTokenRequest,
    updateUserRequest
} from "../../utils/auth";

export const SET_REGISTER_REQUEST = 'SET_REGISTER_REQUEST';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';

export const SET_LOGIN_REQUEST = 'SET_LOGIN_REQUEST';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export const SET_LOGOUT_REQUEST = 'SET_LOGOUT_REQUEST';
export const SET_LOGOUT_SUCCESS = 'SET_LOGOUT_SUCCESS';
export const SET_LOGOUT_ERROR = 'SET_LOGOUT_ERROR';

export const SET_UPDATE_TOKEN_REQUEST = 'SET_UPDATE_TOKEN_REQUEST';
export const SET_UPDATE_TOKEN_SUCCESS = 'SET_UPDATE_TOKEN_SUCCESS';
export const SET_UPDATE_TOKEN_ERROR = 'SET_UPDATE_TOKEN_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_ERROR = 'SET_USER_ERROR';

export const login = ( payload ) => {
    return async ( dispatch ) => {
        dispatch( { type: SET_LOGIN_REQUEST } );
        try {
            const data = await loginRequest( payload );

            const accessToken = data.accessToken.split( 'Bearer ' )[1];
            const refreshToken = data.refreshToken;

            localStorage.setItem( 'accessToken', accessToken );
            localStorage.setItem( 'refreshToken', refreshToken );

            dispatch( { type: SET_LOGIN_SUCCESS, payload: data.user } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: SET_LOGIN_ERROR } );
        }

    };
};

export const register = ( payload ) => {
    return async ( dispatch ) => {
        dispatch( { type: SET_REGISTER_REQUEST } );
        try {
            const data = await registerRequest( payload );
            dispatch( { type: SET_REGISTER_SUCCESS, payload: data.user } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: SET_REGISTER_ERROR } );
        }

    };
};

export const logout = () => {
    return async ( dispatch ) => {
        dispatch( { type: SET_LOGOUT_REQUEST } );
        try {
            await logoutRequest();
            dispatch( { type: SET_LOGOUT_SUCCESS } );

            localStorage.removeItem( 'refreshToken' );
            localStorage.removeItem( 'accessToken' );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: SET_LOGOUT_ERROR } );
        }
    };
};

export const updateToken = () => {
    return async ( dispatch ) => {
        dispatch( { type: SET_UPDATE_TOKEN_REQUEST } );
        try {
            const data = await updateTokenRequest();

            const accessToken = data.accessToken.split( 'Bearer ' )[1];
            localStorage.setItem( 'accessToken', accessToken );

            dispatch( { type: SET_UPDATE_TOKEN_SUCCESS } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: SET_UPDATE_TOKEN_ERROR } );
        }
    };
};

export const getUser = () => {
    return async ( dispatch ) => {
        dispatch( { type: GET_USER_REQUEST } );
        try {
            const data = await getUserRequest();

            dispatch( { type: GET_USER_SUCCESS, payload: data.user } );
        } catch (e) {
            if ( e === "jwt expired" ) {
                dispatch( updateToken() );
                dispatch( getUser() );
            } else {
                console.log( 'Произошла ошибка: ', e );
                dispatch( { type: GET_USER_ERROR } );
            }

        }
    };
};

export const updateUser = ( payload ) => {
    return async ( dispatch ) => {
        dispatch( { type: SET_USER_REQUEST } );
        try {
            const data = await updateUserRequest( payload );

            dispatch( { type: SET_USER_SUCCESS, payload: data.user } );
        } catch (e) {
            if ( e === "jwt expired" ) {
                dispatch( updateToken() );
            } else {
                console.log( 'Произошла ошибка: ', e );
                dispatch( { type: SET_USER_ERROR } );
            }
        }
    };
};

export const checkAuth = () => {
    return async ( dispatch ) => {
        if ( localStorage.getItem( 'accessToken' ) ) {
            dispatch( getUser() );
        }
    };
};