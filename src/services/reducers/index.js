import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export const initialState = {};

export const rootReducer = combineReducers( {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    auth: authReducer
} );