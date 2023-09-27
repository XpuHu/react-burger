import { request } from "./api";

const ENDPOINT = 'auth';
const defaultHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const registerRequest = async ( payload ) => {
    const options = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify( {
            "email": payload.email,
            "password": payload.password,
            "name": payload.name
        } )
    };

    const body = await request( `${ ENDPOINT }/register`, options );

    return body.data;
};