import { request } from "./api";
import { TAuthData, TResponse, TUserData } from "./types";

const ENDPOINT = 'auth';
const defaultHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const registerRequest = async (payload: TUserData): Promise<TResponse> => {
    const options = {
        method: "POST",
        headers: {
            ...defaultHeader,
        },
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password,
            "name": payload.firstName
        } )
    };

    return await request( `${ ENDPOINT }/register`, options );
};

export const loginRequest = async (payload: TAuthData): Promise<TResponse> => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password
        } )
    };

    return await request( `${ ENDPOINT }/login`, options );
};

export const logoutRequest = async () => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "token": localStorage.getItem( 'refreshToken' )
        } )
    };

    await request( `${ ENDPOINT }/logout`, options );
};

export const updateTokenRequest = async () => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "token": localStorage.getItem( 'refreshToken' ),
        } )
    };

    return await request( `${ ENDPOINT }/token`, options );
};

export const getUserRequest = async () => {
    const options = {
        method: "GET",
        headers: {
            ...defaultHeader,
            "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        }
    };

    return await request( `${ ENDPOINT }/user`, options );
};

export const updateUserRequest = async (payload: TUserData) => {
    const options = {
        method: "PATCH",
        headers: {
            ...defaultHeader,
            "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        },
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password,
            "name": payload.firstName
        } )
    };

    return await request( `${ ENDPOINT }/user`, options );
};