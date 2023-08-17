export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';

export const CHANGE_ACTIVE_TYPE = 'CHANGE_ACTIVE_TYPE';


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
            const ingredients = body.data;
            body.success && dispatch( {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredients.map( ingredient => ({ ...ingredient, count: 0 }) )
            } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_INGREDIENTS_FAILED } );
        }

    };
};
