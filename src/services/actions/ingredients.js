import { createAction } from "@reduxjs/toolkit";

// Создание экшена одновременно с его типом
// export const getIngredients = createAction('ingredients/get')
// const decrement = createAction('counter/decrement')
// const incrementByAmount = createAction('counter/incrementByAmount')
// const actionType = createAction('initAction');

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
    return async ( dispatch ) => {
        dispatch( { type: GET_INGREDIENTS_REQUEST } );
        try {
            const response = await fetch( INGREDIENTS_URL );

            if ( !response.ok ) {
                throw new Error( `Ошибка ${ response.status }` );

            }

            const body = await response.json();
            // body.success && setIngredients( [ ...ingredients, ...body.data ] );

            body.success && dispatch( { type: GET_INGREDIENTS_SUCCESS, ingredients: body.data } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_INGREDIENTS_FAILED } );
        }

    };
};
