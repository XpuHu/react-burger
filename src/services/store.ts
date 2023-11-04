import { rootReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { TWSStoreActions } from './types';
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from './constants/ws';
import { socketMiddleware } from './socketMiddleware/socketMiddleware';

const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export const store = configureStore( {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false } ).concat( thunk, socketMiddleware( wsActions ) ),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
} );