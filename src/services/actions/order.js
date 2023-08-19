import { request } from "../../utils/api";
import { CLEAR_CONSTRUCTOR } from "./constructor";
import { CLEAR_COUNTS } from "./ingredients";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

const ORDER_METHOD = `orders`;

export const getOrderId = ( ingredientsIds ) => {
    return async ( dispatch ) => {
        dispatch( { type: GET_ORDER_REQUEST } );
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {
                    "ingredients": ingredientsIds
                } )
            };

            const body = await request( ORDER_METHOD, options );

            dispatch( {
                type: GET_ORDER_SUCCESS,
                name: body.name,
                number: body.order.number
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