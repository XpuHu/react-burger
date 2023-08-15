import {
    DECREASE_COUNT,
    DELETE_CURRENT_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNT,
    SET_CURRENT_INGREDIENT
} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientTypes: {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинка',
    },
    activeType: 'bun',

    currentIngredient: null
};

export const ingredientsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
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
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
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
                ingredients: state.ingredients.map( ingredient => ingredient._id === action.id ? {
                    ...ingredient,
                    count: ingredient.count + 1
                } : ingredient )
            };
        case DECREASE_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map( ingredient => ingredient._id === action.id ? {
                    ...ingredient,
                    count: ingredient.count - 1
                } : ingredient )
            };
        default:
            return state;
    }
};