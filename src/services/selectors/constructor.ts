import { RootState } from '../types';

export const getConstructorIngredients = (state: RootState) => state.burgerConstructor.constructorIngredientList
export const getConstructorBun = (state: RootState) => state.burgerConstructor.constructorBun
export const getConstructorTotalPrice = (state: RootState) => state.burgerConstructor.totalPrice