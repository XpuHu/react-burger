import { request } from "../../utils/api";
import { CLEAR_COUNTS } from "../constants/ingredients";
import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../constants/order";
import { CLEAR_CONSTRUCTOR } from "../constants/constructor";
import { AppDispatch, AppThunk } from "../types";
import { TOrder } from "../types/data";

export interface IGetOrderAction {
    readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS
    data: TOrder
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_ERROR
}

export type TOrderActions = IGetOrderAction | IGetOrderSuccessAction | IGetOrderFailedAction

const ORDER_METHOD = `orders`;

export const getOrderId = (ingredientsIds: Array<string>): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch( { type: GET_ORDER_REQUEST } );
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ localStorage.getItem( 'accessToken' ) }`
                },
                body: JSON.stringify( {
                    "ingredients": ingredientsIds
                } )
            };

            const body = await request( ORDER_METHOD, options );

            dispatch( {
                type: GET_ORDER_SUCCESS,
                data: {
                    name: body.name,
                    number: body.order.number
                }
            } );

            // Если заказ успешный, очищаем конструктор, сбрасывает счётчики
            dispatch( { type: CLEAR_CONSTRUCTOR } );
            dispatch( { type: CLEAR_COUNTS } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_ORDER_ERROR } );
        }
    };
};