import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TFeedOrder } from '../../../services/types/data';
import { useSelector } from '../../../hooks/hooks';
import { formatOrderStatus } from '../../../utils/data';

type TOrderCard = {
    order: TFeedOrder
}

export const OrderCard: FC<TOrderCard> = ({ order }) => {
    const location = useLocation();
    const path = location.pathname === '/feed' ? `/feed/${ order._id }` : `/profile/orders/${ order._id }`;

    const maxToShow = 6;
    const count = order.ingredients.length > maxToShow
        ? order.ingredients.length - maxToShow
        : null

    const { ingredients } = useSelector( state => state.ingredients )
    const orderIngredients = ingredients.filter( ingredient => order.ingredients.includes( ingredient._id ) )
    const ingToShow = orderIngredients.slice( 0, maxToShow + 1 )

    const total = order.ingredients.reduce( (sum: number, id: string) => {
        const ingredient = ingredients.find( ingredient => ingredient._id === id )
        if ( ingredient ) {
            return sum += ingredient.price
        }
        return sum
    }, 0 )

    return (
        <Link to={ path } state={ { prevLocation: location } } className={ styles.link }>
            <article className={ `${ styles.card } pt-6 pl-6 pr-6 pb-6 mb-4 mr-2` }>
                <div className={ `${ styles.orderInfo } mb-6` }>
                    <h3 className={ `text text_type_digits-default` }>#{ order.number }</h3>
                    <p className={ `${ styles.orderDate } text text_type_main-default text_color_inactive` }>
                        <FormattedDate date={ new Date( order.createdAt ) } /></p>
                </div>
                <h2 className={ `text text_type_main-medium` }>{ order.name }</h2>
                { location.pathname === '/profile/orders' &&
                    <p className={ `${ styles.status } text text_type_main-default mt-2 mb-6` }>{ formatOrderStatus( order.status ) }</p>
                }
                <div className={ `${ styles.orderDetails } mt-6` }>
                    <div className={ styles.ingredients }>
                        {
                            ingToShow.map( (ingredient, i) => {
                                return (
                                    <div className={ styles.ingredient } style={ { zIndex: maxToShow - i } }
                                         key={ ingredient._id }
                                    >
                                        {
                                            i < maxToShow
                                                ? <img src={ ingredient.image_mobile } alt={ ingredient.name } />
                                                : <p className={ styles.hidden }>+{ count }</p>
                                        }
                                    </div>
                                );
                            } )
                        }
                    </div>
                    <span className={ `${ styles.price } text text_type_digits-default` }>{ total } <CurrencyIcon
                        type='primary'
                    /></span>
                </div>
            </article>
        </Link>
    );
};