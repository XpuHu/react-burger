import React, { useEffect } from 'react';
import { OrderInfo } from '../../components/order-info/order-info';
import { useDispatch } from '../../hooks/hooks';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_FEED_ALL_URL,
    WS_FEED_USER_URL
} from '../../services/constants/ws';
import { useLocation } from 'react-router-dom';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect( () => {
        const token = localStorage.getItem( 'accessToken' )
        console.log( 'location: ', location.pathname.split( '/', 2 ) )

        const wsUrl = location.pathname.split( '/', 2 )[1] === 'feed'
            ? WS_FEED_ALL_URL
            : `${ WS_FEED_USER_URL }?token=${ token }`
        console.log( wsUrl )
        dispatch( {
            type: WS_CONNECTION_START,
            url: wsUrl,
        } )

        return () => {
            dispatch( { type: WS_CONNECTION_CLOSED } )
        }
    }, [ dispatch ] )

    return (
        <main className={ `mt-20` }>
            <OrderInfo />
        </main>
    );
};