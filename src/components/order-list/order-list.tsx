import { OrderCard } from './order-card/order-card';
import styles from './order-list.module.css';
import React from 'react';
import { useSelector } from '../../hooks/hooks';
import { getFeedOrders } from '../../services/selectors';

export const OrderList = () => {

    const feedOrders = useSelector( getFeedOrders )
    return (
        <section className={ `${ styles.orderList } mr-15 mt-5` }>
            {
                feedOrders?.map( order => (
                    <OrderCard order={ order } key={ order._id } />
                ) )
            }
        </section>
    );
};