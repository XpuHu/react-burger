import { TIngredientWithCount } from "../types/data";
import { TIngredientsActions } from "../actions/ingredients";
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

type TIngredientTypes = {
    [key: string]: string
}

type TIngredientsState = {
    ingredients: Array<TIngredientWithCount>
    ingredientsRequest: boolean
    ingredientsFailed: boolean

    ingredientTypes: TIngredientTypes

    currentIngredient: TIngredientWithCount | null
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientTypes: {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинка',
    },

    currentIngredient: null
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: [
                    ...action.ingredients,
                ]
            };
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredients: []
            };
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.ingredient
            };
        case DELETE_CURRENT_INGREDIENT:
            return {
                ...state, currentIngredient: null
            };
        case INCREASE_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map( ingredient => ingredient._id === action.id
                    ? ingredient.type === 'bun'
                        ? {
                            ...ingredient,
                            count: ingredient.count + 2
                        }
                        :
                        {
                            ...ingredient,
                            count: ingredient.count + 1
                        }
                    : ingredient
                )
            };
        case DECREASE_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map( ingredient => ingredient._id === action.id
                    ? ingredient.type === 'bun'
                        ? {
                            ...ingredient,
                            count: ingredient.count - 2
                        }
                        :
                        {
                            ...ingredient,
                            count: ingredient.count - 1
                        }
                    : ingredient
                )
            };
        case CLEAR_COUNTS:
            return {
                ...state,
                ingredients: state.ingredients.map( ingredient => ({ ...ingredient, count: 0 }) )
            };
        default:
            return state;
    }
};