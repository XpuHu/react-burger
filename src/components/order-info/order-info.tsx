import style from './order-info.module.css'
import styles from '../order-list/order-card/order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { TFeedOrder } from '../../services/types/data';
import { useSelector } from '../../hooks/hooks';
import { getFeedOrders } from '../../services/selectors';
import { useParams } from 'react-router-dom';
import { formatOrderStatus } from '../../utils/data';

export const OrderInfo = () => {
    const orders: Array<TFeedOrder> = useSelector( getFeedOrders )
    const { id } = useParams<string>();
    const order: TFeedOrder | undefined = orders.find( order => order._id === id )
    const { ingredients } = useSelector( state => state.ingredients )

    const orderIngredients = ingredients.map( ingredient => {
        const count = order?.ingredients.filter( id => id === ingredient._id ).length
        if ( count && count > 0 ) {
            return {
                ...ingredient,
                count
            }
        }
    } ).filter( ingredient => ingredient )

    const total = orderIngredients.reduce( (sum, ingredient) => sum + ingredient!.price * ingredient!.count, 0 )

    return order && orderIngredients
        ? (
            <main className={ style.wrapper }>
                <h2 className={ `${ style.orderNumber } text text_type_digits-default` }>#{ order.number }</h2>
                <h1 className='text text_type_main-medium mt-10 mb-3'>{ order.name }</h1>
                <p className={ `${ style.status } text text_type_main-default` }>{ formatOrderStatus( order.status ) }</p>
                <div>
                    <p className='text text_type_main-medium mt-15 mb-6'>Состав</p>
                    <ul className={ `${ style.ingredientList } mb-10` }>
                        {
                            orderIngredients.map( ingredient => (
                                <li className={ `${ style.ingredient } mb-4 mr-6` } key={ ingredient?._id }>
                                    <div className={ style.ingredientWrapper }>
                                        <div className={ `${ style.ingredientImage } mr-4` }>
                                            <img src={ ingredient?.image_mobile } alt={ ingredient?.name } />
                                        </div>

                                        <p className={ `${ style.ingredientName } text text_type_main-default` }>{ ingredient?.name }</p>
                                        <span className={ `${ styles.price } text text_type_digits-default ml-4` }>
                                        { ingredient?.count } x { ingredient?.price }
                                            <CurrencyIcon type='primary' />
                                    </span>
                                    </div>
                                </li>
                            ) )
                        }

                    </ul>
                </div>
                <div className={ style.info }>
                    <p className={ `text text_type_main-default text_color_inactive` }>
                        <FormattedDate date={ new Date( order.createdAt ) } />
                    </p>
                    <p className={ `${ styles.price } text text_type_digits-default ml-4` }>
                        { total } <CurrencyIcon type='primary' />
                    </p>
                </div>
            </main>
        )
        : null
}