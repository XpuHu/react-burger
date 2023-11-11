import { TConstructorIngredient } from "../types/data";
import { TConstructorActions } from "../actions/constructor";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    DELETE_BUN,
    DELETE_INGREDIENT,
    SET_TOTAL_PRICE,
    UPDATE_INGREDIENTS_ORDER
} from "../constants/constructor";

type TConstructorState = {
    constructorIngredientList: Array<TConstructorIngredient>
    constructorBun: TConstructorIngredient | null
    totalPrice: number
}

const initialState: TConstructorState = {
    constructorIngredientList: [],
    constructorBun: null,

    totalPrice: 0,
};


export const constructorReducer = (state = initialState, action: TConstructorActions) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                constructorIngredientList: [
                    ...state.constructorIngredientList,
                    {
                        ...action.ingredient,
                        id: crypto.randomUUID()
                    }
                ]
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                constructorIngredientList: state.constructorIngredientList.filter( ingredient => ingredient.id !== action.id )
            };
        case ADD_BUN:
            return {
                ...state,
                constructorBun: action.bun
            };
        case DELETE_BUN:
            return {
                ...state,
                constructorBun: null
            };
        case SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: state.constructorBun
                    ? state.constructorIngredientList.reduce( (sum, ingredient) => sum + ingredient.price, 0 ) + 2 * state.constructorBun.price
                    : state.constructorIngredientList.reduce( (sum, ingredient) => sum + ingredient.price, 0 )
            };
        case UPDATE_INGREDIENTS_ORDER:
            const ingredientList = [ ...state.constructorIngredientList ];
            ingredientList.splice(
                action.hoverIndex,
                0,
                ingredientList.splice( action.dragIndex, 1 )[0]
            );
            return {
                ...state,
                constructorIngredientList: ingredientList
            };
        case CLEAR_CONSTRUCTOR:
            return {
                ...initialState
            };
        default:
            return state;
    }
};
