import { request } from "../../utils/api";
import {
    CLEAR_COUNTS,
    DECREASE_COUNT,
    DELETE_CURRENT_INGREDIENT,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNT,
    SET_CURRENT_INGREDIENT
} from "../constants/ingredients";
import { TIngredientWithCount } from "../../utils/types";

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    ingredients: ReadonlyArray<TIngredientWithCount>
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_ERROR
}

export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT
    ingredient: TIngredientWithCount
}

export interface IDeleteCurrentIngredientAction {
    readonly type: typeof DELETE_CURRENT_INGREDIENT
    ingredient: TIngredientWithCount
}

export interface IIncreaseCountAction {
    readonly type: typeof INCREASE_COUNT
    id: string
}

export interface IDecreaseCountAction {
    readonly type: typeof DECREASE_COUNT
    id: string
}

export interface IClearCountsAction {
    readonly type: typeof CLEAR_COUNTS
}

export type TIngredientsActions = IGetIngredientsAction | IGetIngredientsFailedAction | IGetIngredientsSuccessAction
    | ISetCurrentIngredientAction | IDeleteCurrentIngredientAction
    | IIncreaseCountAction | IDecreaseCountAction | IClearCountsAction

const INGREDIENTS_METHOD = `ingredients`;

export const getIngredients = (): any => {
    return async (dispatch: any) => {
        dispatch( { type: GET_INGREDIENTS_REQUEST } );
        try {
            const body = await request( INGREDIENTS_METHOD );

            const ingredients = body.data;

            dispatch( {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredients.map( (ingredient: TIngredientWithCount) => ({ ...ingredient, count: 0 }) )
            } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_INGREDIENTS_ERROR } );
        }

    };
};
