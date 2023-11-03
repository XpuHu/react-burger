import style from './order-info.module.css'
import styles from '../order-list/order-card/order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export const OrderInfo = () => {
    const order = {
        number: '123456',
        name: 'Black Hole Singularity острый бургер',
        status: 'выполнено',
        total: 1000,
        date: '2023-10-10T17:33:32.877Z',
        ingredients: [
            {
                name: 'Флюоресцентная булка R2-D3',
                img: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                price: 20,
                count: 2
            },
            {
                name: 'Флюоресцентная булка R2-D3',
                img: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                price: 60,
                count: 1
            },
            {
                name: 'Флюоресцентная булка R2-D3',
                img: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                price: 1420,
                count: 6
            },
            {
                name: 'Флюоресцентная булка R2-D3',
                img: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                price: 60,
                count: 1
            },
            {
                name: 'Флюоресцентная булка R2-D3',
                img: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                price: 60,
                count: 1
            },
        ]
    }

    return (
        <main className={ style.wrapper }>
            <h2 className={ `${ style.orderNumber } text text_type_digits-default` }>#{ order.number }</h2>
            <h1 className='text text_type_main-medium mt-10 mb-3'>{ order.name }</h1>
            <p className={ `${ style.status } text text_type_main-default` }>{ order.status }</p>
            <div>
                <p className='text text_type_main-medium mt-15 mb-6'>Состав</p>
                <ul className={ `${ style.ingredientList } mb-10` }>
                    {
                        order.ingredients.map( ingredient => (
                            <li className={ `${ style.ingredient } mb-4 mr-6` }>
                                <div className={ style.ingredientWrapper }>
                                    <div className={ `${ style.ingredientImage } mr-4` }>
                                        <img src={ ingredient.img } alt={ ingredient.name } />
                                    </div>

                                    <p className={ `${ style.ingredientName } text text_type_main-default` }>{ ingredient.name }</p>
                                    <span className={ `${ styles.price } text text_type_digits-default ml-4` }>
                                        { ingredient.count } x { ingredient.price }
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
                    <FormattedDate date={ new Date( order.date ) } />
                </p>
                <p className={ `${ styles.price } text text_type_digits-default ml-4` }>
                    { order.total } <CurrencyIcon type='primary' />
                </p>
            </div>
        </main>
    )
}