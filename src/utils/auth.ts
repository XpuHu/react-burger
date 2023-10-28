import { request } from "./api";
import {
    TAuthData,
    TResponseWithToken,
    TResponseWithUser,
    TResponseWithUserToken,
    TUserData
} from "../services/types/data";

const ENDPOINT = 'auth';
const defaultHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const registerRequest = async (payload: TUserData): Promise<TResponseWithUser> => {
    const options = {
        method: "POST",
        headers: {
            ...defaultHeader,
        },
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password,
            "name": payload.name
        } )
    };

    return await request( `${ ENDPOINT }/register`, options );
};

export const loginRequest = async (payload: TAuthData): Promise<TResponseWithUserToken> => {
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

export const updateTokenRequest = async (): Promise<TResponseWithToken> => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "token": localStorage.getItem( 'refreshToken' ),
        } )
    };

    return await request( `${ ENDPOINT }/token`, options );
};

export const getUserRequest = async (): Promise<TResponseWithUser> => {
    const options = {
        method: "GET",
        headers: {
            ...defaultHeader,
            "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        }
    };

    return await request( `${ ENDPOINT }/user`, options );
};

export const updateUserRequest = async (payload: TUserData): Promise<TResponseWithUser> => {
    const options = {
        method: "PATCH",
        headers: {
            ...defaultHeader,
            "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        },
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password,
            "name": payload.name
        } )
    };

    return await request( `${ ENDPOINT }/user`, options );
};