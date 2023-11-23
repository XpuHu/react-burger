import { TUserData } from '../types/data';
import { TAuthActions } from '../actions/auth';
import {
    GET_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
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
    SET_UPDATE_TOKEN_SUCCESS,
    SET_USER_ERROR,
    SET_USER_REQUEST,
    SET_USER_SUCCESS
} from '../constants/auth';

type TAuthState = {
    user: TUserData | null,
    isAuthorized: boolean,

    registerRequest: boolean,
    registerFailed: boolean,

    loginRequest: boolean,
    loginFailed: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    updateTokenRequest: boolean,
    updateTokenFailed: boolean,

    getUserRequest: boolean,
    getUserFailed: boolean,
    updateUserRequest: boolean,
    updateUserFailed: boolean
}

export const initialState: TAuthState = {
    user: null,
    isAuthorized: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    updateTokenRequest: false,
    updateTokenFailed: false,

    getUserRequest: false,
    getUserFailed: false,
    updateUserRequest: false,
    updateUserFailed: false
};

export const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {
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
                user: action.payload,
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
                user: null,
                isAuthorized: false
            };
        case SET_LOGOUT_ERROR:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false,
                user: action.payload,
                isAuthorized: true
            };
        case GET_USER_ERROR:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true
            };
        case SET_USER_REQUEST:
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false
            };
        case SET_USER_SUCCESS:
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: false,
                user: action.payload
            };
        case SET_USER_ERROR:
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true
            };
        default:
            return state;
    }
};