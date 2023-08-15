import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";

export const initialState = {
    // ingredients: [],
    // ingredientsRequest: false,
    // ingredientsFailed: false,
    //
    // ingredientTypes: {
    //     bun: 'Булки',
    //     sauce: 'Соусы',
    //     main: 'Начинка',
    // },

    // constructorIngredientList: [],
    // constructorBun: null,
    // totalPrice: 0,
    constructorIngredientsIds: [],

    // currentIngredient: null,


    // order: null,
    // orderRequest: false,
    // orderFailed: false,
}

// Создание экшена одновременно с его типом
// const increment = createAction('counter/increment')
// const decrement = createAction('counter/decrement')
// const incrementByAmount = createAction('counter/incrementByAmount')
// const actionType = createAction('initAction');

// Основной редюсер
// export const rootReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(getIngredients, (state, action) => {
//             state.ingredients.push(action.payload)
//         })
    //     .addCase(increment, (state, action) => {
    //         state.value++
    //     })
    //     .addCase(decrement, (state, action) => {
    //         state.value--
    //     })
    //     .addCase(incrementByAmount, (state, action) => {
    //         state.value += action.payload
    //     })
// })

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
})