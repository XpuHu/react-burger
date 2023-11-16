import {
    ADD_BUN,
    ADD_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    DELETE_BUN,
    DELETE_INGREDIENT,
    SET_TOTAL_PRICE,
    UPDATE_INGREDIENTS_ORDER
} from '../constants/constructor';
import { TConstructorIngredient } from '../types/data';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT
    ingredient: TConstructorIngredient
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT
    id: string
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN
    bun: TConstructorIngredient
}

export interface IDeleteBunAction {
    readonly type: typeof DELETE_BUN
}

export interface ISetTotalPriceAction {
    readonly type: typeof SET_TOTAL_PRICE
}

export interface IUpdateIngredientsOrderAction {
    readonly type: typeof UPDATE_INGREDIENTS_ORDER
    hoverIndex: number
    dragIndex: number
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR
}

export type TConstructorActions = IAddIngredientAction | IDeleteIngredientAction
    | IAddBunAction | IDeleteBunAction
    | ISetTotalPriceAction | IUpdateIngredientsOrderAction | IClearConstructorAction

export const addConstructorIngredient = (ingredient: TConstructorIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        ingredient: {
            ...ingredient,
            id: crypto.randomUUID()
        }
    }
}