import { request } from "./api";

const ENDPOINT = 'auth';
const defaultHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const registerRequest = async ( payload ) => {
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

    const body = await request( `${ ENDPOINT }/register`, options );

    return body;
};

export const loginRequest = async ( payload ) => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password
        } )
    };

    const body = await request( `${ ENDPOINT }/login`, options );

    return body;
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

    const body = await request( `${ ENDPOINT }/token`, options );

    return body;
};

export const getUserRequest = async () => {
    const options = {
        method: "GET",
        headers: {
            ...defaultHeader,
            "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
        }
    };

    const body = await request( `${ ENDPOINT }/user`, options );

    return body;
};

export const updateUserRequest = async ( payload ) => {
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

    const body = await request( `${ ENDPOINT }/user`, options );

    return body;
};