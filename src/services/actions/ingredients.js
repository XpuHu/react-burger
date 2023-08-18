import { request } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';

export const INCREASE_BUN_COUNT = 'INCREASE_BUN_COUNT';
export const DECREASE_BUN_COUNT = 'DECREASE_BUN_COUNT';

export const CHANGE_ACTIVE_TYPE = 'CHANGE_ACTIVE_TYPE';


const INGREDIENTS_METHOD = `ingredients`;

export const getIngredients = () => {
    return async ( dispatch ) => {
        dispatch( { type: GET_INGREDIENTS_REQUEST } );
        try {
            const body = await request( INGREDIENTS_METHOD );

            const ingredients = body.data;
            dispatch( {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredients.map( ingredient => ({ ...ingredient, count: 0 }) )
            } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_INGREDIENTS_ERROR } );
        }

    };
};
