import { BASE_URL } from "../services/actions";

export const request = async ( method, options ) => {
    const response = await fetch( `${ BASE_URL }${ method }`, options );

    return await checkSuccess( await checkResponse( response ) );
};

const checkResponse = async ( response ) => {
    if ( response.ok ) {
        return await response.json();
    }

    await response.json().then( ( err ) => {
        throw new Error( `Ошибка ${ JSON.stringify( err.message ) }` );
    } );
    // throw new Error( `Ошибка ${ response.status }` );
};

const checkSuccess = async ( body ) => {
    if ( body && body.success ) {
        return body;
    }

    throw new Error( `Ответ не успешен - ${ body.message }` );
};