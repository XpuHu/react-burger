import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/order";

const initialState = {
    orderId: null,
    orderRequest: false,
    orderFailed: false,
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
                orderId: action.id
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                orderId: null
            };
        case 'SET_ORDER_ID': return {
            ...state,
            orderRequest: false,
            orderFailed: false,
            orderId: action.id
        }
        default:
            return state;
    }
};