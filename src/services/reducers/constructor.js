import {
    ADD_BUN,
    ADD_INGREDIENT, DELETE_BUN,
    DELETE_INGREDIENT,
    SET_SELECTED_IDS,
    SET_TOTAL_PRICE
} from "../actions/constructor";
import constructorIngredientsList
    from "../../components/burger-constructor/burger-constructor-list/cunstructor-ingredients-list/constructor-ingredients-list";
import { selectedBun, selectedIngredients } from "../../utils/data";

const initialState = {
    constructorIngredientList: selectedIngredients,
    // constructorIngredientList: [],
    constructorBun: selectedBun,
    // constructorBun: null,

    totalPrice: 0,
    constructorIngredientsIds: [],
};

export const constructorReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ADD_INGREDIENT:
            return {
                ...state,
                constructorIngredientList: [
                    ...state.constructorIngredientList,
                    {
                        ...action.ingredient,
                        id: action.id
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
                    ? state.constructorIngredientList.reduce( ( sum, ingredient ) => sum + ingredient.price, 0 ) + 2 * state.constructorBun.price
                    : state.constructorIngredientList.reduce( ( sum, ingredient ) => sum + ingredient.price, 0 )
            };
        case SET_SELECTED_IDS:
            return {
                ...state,
                constructorIngredientsIds: [ state.constructorBun._id, ...state.constructorIngredientList.map( ingredient => ingredient._id ), state.constructorBun._id ]
            };
        default:
            return state;
    }
};
