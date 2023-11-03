import { TWSActions } from '../actions/ws';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../constants/ws';
import { TFeedOrder } from '../types/data';

type TWSState = {
    wsConnected: boolean;
    orders: TFeedOrder[]
    total?: number,
    totalToday?: number,
    error?: Event,
}

export const wsInitialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsReducer = (state = wsInitialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders: action.payload.orders.sort( (a, b) => b.number - a.number ),
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };

        default:
            return state;
    }
}