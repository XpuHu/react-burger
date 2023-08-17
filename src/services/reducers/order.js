import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/order";

const initialState = {
    orderRequest: false,
    orderFailed: false,
    data: {},
};

export const orderReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                data: {
                    name: action.name,
                    number: action.number
                }
            };
        case GET_ORDER_ERROR:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                data: {}
            };
        case 'SET_ORDER_ID':
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                orderId: action.id
            };
        default:
            return state;
    }
};