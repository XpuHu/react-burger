import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWSStoreActions } from '../types';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let wsUrl: string = '';
        let socketOpened: boolean = false;

        return next => (action) => {
            const { dispatch } = store;
            const { type, url } = action;
            const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
            if ( type === wsInit ) {
                wsUrl = url
                socket = new WebSocket( wsUrl );
                socketOpened = true
            }
            if ( socket ) {
                socket.onopen = event => {
                    dispatch( { type: onOpen, payload: event } );
                };

                socket.onerror = event => {
                    dispatch( { type: onError, payload: event } );
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse( data );

                    dispatch( { type: onMessage, payload: parsedData } );
                };

                socket.onclose = event => {
                    if ( socketOpened ) {
                        dispatch( { type: onError, payload: event } )
                        dispatch( { type: onOpen, payload: event } );
                    }
                    dispatch( { type: onClose, payload: event } )
                };
            }

            if ( socket && type === wsClose ) {
                socketOpened = false
                socket.close();
            }

            next( action );
        };
    }) as Middleware;
};