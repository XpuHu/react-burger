import style from './user-orders.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import React, { useEffect } from 'react';
import { OrderList } from '../../components/order-list/order-list';
import { useDispatch } from '../../hooks/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_FEED_USER_URL } from '../../services/constants/ws';

export const UserOrdersPage = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const token = localStorage.getItem( 'accessToken' )
        dispatch( {
            type: WS_CONNECTION_START,
            url: `${ WS_FEED_USER_URL }?token=${ token }`,
        } )

        return () => {
            dispatch( { type: WS_CONNECTION_CLOSED } )
        }
    }, [ dispatch ] )

    return (
        <div className={ style.wrapper }>
            <div className={ `mt-30` }>
                <ProfileMenu />
            </div>

            <OrderList />
        </div>
    );
};