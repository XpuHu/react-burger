import { TOrderActions } from '../actions/order';
import { TOrder } from '../types/data';
import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from '../constants/order';

type TOrderState = {
    orderRequest: boolean
    orderFailed: boolean
    data: TOrder | null
}

export const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    data: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
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
                data: action.data
            };
        case GET_ORDER_ERROR:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                data: null
            };
        default:
            return state;
    }
};