import { store } from '../../index';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const getOrderId = () => {
    return async ( dispatch ) => {
        dispatch( { type: GET_ORDER_REQUEST } );
        try {
            const response = await fetch( ORDER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {
                    "ingredients": [
                        ...store.getState().burgerConstructor.constructorIngredientsIds
                    ]
                } )
            } );

            const body = await response.json();

            if ( !response.ok ) {
                throw new Error( `Ошибка ${ response.status } - ${body.message}` );

            }

            body.success && dispatch( { type: GET_ORDER_SUCCESS, id: body.order.number } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
            dispatch( { type: GET_ORDER_FAILED } );
        }
    };
};