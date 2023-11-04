import React, { useEffect } from 'react';
import { OrderList } from '../../components/order-list/order-list';
import { Feed } from '../../components/feed/feed';
import style from './feed.module.css'
import { useDispatch } from '../../hooks/hooks';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_FEED_ALL_URL } from '../../services/constants/ws';

export const FeedPage = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( {
            type: WS_CONNECTION_START,
            url: WS_FEED_ALL_URL
        } )

        return () => {
            dispatch( { type: WS_CONNECTION_CLOSE } )
        }
    }, [ dispatch ] )

    return (
        <div className={ style.pageWrapper }>
            <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
            <div className={ style.feedWrapper }>
                <OrderList />
                <Feed />
            </div>


        </div>
    )
}