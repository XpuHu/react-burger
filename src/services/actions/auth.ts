import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    updateTokenRequest,
    updateUserRequest
} from "../../utils/auth";
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
} from "../constants/auth";
import { TAuthData, TUserData } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export interface ISetRegisterAction {
    readonly type: typeof SET_REGISTER_REQUEST
}

export interface ISetRegisterSuccessAction {
    readonly type: typeof SET_REGISTER_SUCCESS
}

export interface ISetRegisterFailedAction {
    readonly type: typeof SET_REGISTER_ERROR
}

export interface ISetLoginAction {
    readonly type: typeof SET_LOGIN_REQUEST
}

export interface ISetLoginSuccessAction {
    readonly type: typeof SET_LOGIN_SUCCESS
    payload: TUserData
}

export interface ISetLoginFailedAction {
    readonly type: typeof SET_LOGIN_ERROR
}

export interface ISetLogoutAction {
    readonly type: typeof SET_LOGOUT_REQUEST
}

export interface ISetLogoutSuccessAction {
    readonly type: typeof SET_LOGOUT_SUCCESS
}

export interface ISetLogoutFailedAction {
    readonly type: typeof SET_LOGOUT_ERROR
}

export interface ISetUpdateTokenAction {
    readonly type: typeof SET_UPDATE_TOKEN_REQUEST
}

export interface ISetUpdateTokenSuccessAction {
    readonly type: typeof SET_UPDATE_TOKEN_SUCCESS
}

export interface ISetUpdateTokenFailedAction {
    readonly type: typeof SET_UPDATE_TOKEN_ERROR
}

export interface IGetUserAction {
    readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS
    payload: TUserData
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_ERROR
}

export interface ISetUserAction {
    readonly type: typeof SET_USER_REQUEST
}

export interface ISetUserSuccessAction {
    readonly type: typeof SET_USER_SUCCESS
    payload: TUserData
}

export interface ISetUserFailedAction {
    readonly type: typeof SET_USER_ERROR
}

export type TAuthActions = ISetRegisterAction | ISetRegisterSuccessAction | ISetRegisterFailedAction
    | ISetLoginAction | ISetLoginSuccessAction | ISetLoginFailedAction
    | ISetLogoutAction | ISetLogoutSuccessAction | ISetLogoutFailedAction
    | ISetUpdateTokenAction | ISetUpdateTokenSuccessAction | ISetUpdateTokenFailedAction
    | IGetUserAction | IGetUserSuccessAction | IGetUserFailedAction
    | ISetUserAction | ISetUserSuccessAction | ISetUserFailedAction

export const login = (payload: TAuthData): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const register = (payload: TUserData): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const logout = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const updateToken = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const getUser = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const updateUser = (payload: TUserData): AppThunk => {
    return async (dispatch: AppDispatch) => {
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

export const checkAuth = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        if ( localStorage.getItem( 'accessToken' ) ) {
            dispatch( getUser() );
        }
    };
};