import {
    SET_LOGIN_ERROR,
    SET_LOGIN_REQUEST,
    SET_LOGIN_SUCCESS,
    SET_LOGOUT_ERROR,
    SET_LOGOUT_REQUEST,
    SET_LOGOUT_SUCCESS,
    SET_REGISTER_ERROR,
    SET_REGISTER_REQUEST,
    SET_REGISTER_SUCCESS,
    SET_UPDATE_TOKEN_ERROR,
    SET_UPDATE_TOKEN_REQUEST,
    SET_UPDATE_TOKEN_SUCCESS
} from "../actions/auth";

const initialState = {
    user: null,
    isAuthorized: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    updateTokenRequest: false,
    updateTokenFailed: false
};

export const authReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            };

        case SET_REGISTER_SUCCESS:
            return {
                ...state,
                registerRequest: false,
                registerFailed: false
            };
        case SET_REGISTER_ERROR:
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            };
        case SET_LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            };
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                user: action.payload.user,
                isAuthorized: true
            };
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        case SET_UPDATE_TOKEN_REQUEST:
            return {
                ...state,
                updateTokenRequest: true,
                updateTokenFailed: false
            };
        case SET_UPDATE_TOKEN_SUCCESS:
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: false
            };
        case SET_UPDATE_TOKEN_ERROR:
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: true
            };
        case SET_LOGOUT_REQUEST:
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            };
        case SET_LOGOUT_SUCCESS:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                user: null
            };
        case SET_LOGOUT_ERROR:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        default:
            return state;
    }
};