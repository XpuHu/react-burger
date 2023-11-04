import { store } from '../store';
import { TIngredientsActions } from '../actions/ingredients';
import { TConstructorActions } from '../actions/constructor';
import { TOrderActions } from '../actions/order';
import { TAuthActions } from '../actions/auth';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TWSActions } from '../actions/ws';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from '../constants/ws';

// Типизация action'ов
export type TApplicationActions = TIngredientsActions | TConstructorActions | TOrderActions | TAuthActions | TWSActions

// Типизация state
export type RootState = ReturnType<typeof store.getState>

// Типизация thunk'ов
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

// Типизация dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

// Типизация Websocket
export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
};