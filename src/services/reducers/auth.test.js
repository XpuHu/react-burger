import { authReducer as reducer, initialState } from './auth';
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

const user = {
    email: 'test@test.ru',
    password: 'qwerty123',
    name: 'Test'
};

describe( 'auth reducer', () => {
    it( 'should return initial state', () => {
        expect( reducer( undefined, {} ) )
            .toEqual( initialState );
    } );

    it( 'should handle SET_REGISTER_REQUEST', () => {
        expect( reducer( initialState, {
            type: SET_REGISTER_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                registerRequest: true,
                registerFailed: false
            } );
    } );

    it( 'should handle SET_REGISTER_SUCCESS', () => {
        expect( reducer( initialState, {
            type: SET_REGISTER_SUCCESS
        } ) )
            .toEqual( {
                ...initialState,
                registerRequest: false,
                registerFailed: false
            } );
    } );

    it( 'should handle SET_REGISTER_ERROR', () => {
        expect( reducer( initialState, {
            type: SET_REGISTER_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                registerRequest: false,
                registerFailed: true
            } );
    } );

    it( 'should handle SET_LOGIN_REQUEST', () => {
        expect( reducer( initialState, {
            type: SET_LOGIN_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                loginRequest: true,
                loginFailed: false
            } );
    } );

    it( 'should handle SET_LOGIN_SUCCESS', () => {
        expect( reducer( initialState, {
            type: SET_LOGIN_SUCCESS,
            payload: user
        } ) )
            .toEqual( {
                ...initialState,
                loginRequest: false,
                loginFailed: false,
                user,
                isAuthorized: true
            } );
    } );

    it( 'should handle SET_LOGIN_ERROR', () => {
        expect( reducer( initialState, {
            type: SET_LOGIN_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                loginRequest: false,
                loginFailed: true
            } );
    } );

    it( 'should handle SET_UPDATE_TOKEN_REQUEST', () => {
        expect( reducer( initialState, {
            type: SET_UPDATE_TOKEN_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                updateTokenRequest: true,
                updateTokenFailed: false
            } );
    } );

    it( 'should handle SET_UPDATE_TOKEN_SUCCESS', () => {
        expect( reducer( initialState, {
            type: SET_UPDATE_TOKEN_SUCCESS
        } ) )
            .toEqual( {
                ...initialState,
                updateTokenRequest: false,
                updateTokenFailed: false
            } );
    } );

    it( 'should handle SET_UPDATE_TOKEN_ERROR', () => {
        expect( reducer( initialState, {
            type: SET_UPDATE_TOKEN_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                updateTokenRequest: false,
                updateTokenFailed: true
            } );
    } );

    it( 'should handle SET_LOGOUT_REQUEST', () => {
        expect( reducer( initialState, {
            type: SET_LOGOUT_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                logoutRequest: true,
                logoutFailed: false
            } );
    } );

    it( 'should handle SET_LOGOUT_SUCCESS', () => {
        expect( reducer( initialState, {
            type: SET_LOGOUT_SUCCESS
        } ) )
            .toEqual( initialState );
    } );

    it( 'should handle SET_LOGOUT_ERROR', () => {
        expect( reducer( initialState, {
            type: SET_LOGOUT_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                logoutRequest: false,
                logoutFailed: true
            } );
    } );

    it( 'should handle GET_USER_REQUEST', () => {
        expect( reducer( initialState, {
            type: GET_USER_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                getUserRequest: true,
                getUserFailed: false
            } );
    } );

    it( 'should handle GET_USER_SUCCESS', () => {
        expect( reducer( initialState, {
            type: GET_USER_SUCCESS,
            payload: user
        } ) )
            .toEqual( {
                ...initialState,
                getUserRequest: false,
                getUserFailed: false,
                user,
                isAuthorized: true
            } );
    } );

    it( 'should handle GET_USER_ERROR', () => {
        expect( reducer( initialState, {
            type: GET_USER_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                getUserRequest: false,
                getUserFailed: true
            } );
    } );

    it( 'should handle SET_USER_REQUEST', () => {
        expect( reducer( initialState, {
            type: SET_USER_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                updateUserRequest: true,
                updateUserFailed: false
            } );
    } );

    it( 'should handle SET_USER_SUCCESS', () => {
        expect( reducer( initialState, {
            type: SET_USER_SUCCESS,
            payload: user
        } ) )
            .toEqual( {
                ...initialState,
                updateUserRequest: false,
                updateUserFailed: false,
                user
            } );
    } );

    it( 'should handle SET_USER_ERROR', () => {
        expect( reducer( initialState, {
            type: SET_USER_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                updateUserRequest: false,
                updateUserFailed: true
            } );
    } );
} );