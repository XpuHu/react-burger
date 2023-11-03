import styles from './feed.module.css';
import React from 'react';
import { useSelector } from '../../hooks/hooks';
import { getFeedOrders, getFeedOrdersToday, getFeedOrdersTotal } from '../../services/selectors';

export const Feed = () => {

    const orders = useSelector( getFeedOrders )
    const total = useSelector( getFeedOrdersTotal )
    const today = useSelector( getFeedOrdersToday )

    const feedsDone = orders.filter( order => order.status === 'done' ).slice( 0, 10 )
    const feedsInProgress = orders.filter( order => order.status === 'pending' ).slice( 0, 10 )
    
    return (
        <section className={ `${ styles.feedDetails } mt-5` }>
            <div className={ styles.feedList }>
                <div className={ styles.column }>
                    <span className='text text_type_main-medium'>Готовы:</span>
                    <ul className={ `${ styles.list } ${ styles.done } mt-6` }>
                        {
                            feedsDone.map( feed => (
                                <li className='text text_type_digits-default' key={ feed.number }>{ feed.number }</li>
                            ) )
                        }
                    </ul>
                </div>
                <div className={ styles.column }>
                    <span className='text text_type_main-medium'>В работе:</span>
                    <ul className={ `${ styles.list } mt-6` }>
                        {
                            feedsInProgress.map( feed => (
                                <li className='text text_type_digits-default' key={ feed.number }>{ feed.number }</li>
                            ) )
                        }
                    </ul>
                </div>
            </div>
            <div className={ `mt-15` }>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={ `${ styles.number } text text_type_digits-large` }>{ total }</p>
            </div>
            <div className={ `mt-15` }>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={ `${ styles.number } text text_type_digits-large` }>{ today }</p>
            </div>
        </section>
    )
}