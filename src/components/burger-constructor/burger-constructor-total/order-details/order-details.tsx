import React, { FC } from 'react';
import style from './order-details.module.css';
import icon from '../../../../images/done.svg';

import { Loader } from '../../../loader/loader';
import { useSelector } from '../../../../hooks/hooks';
import { getOrderRequest } from '../../../../services/selectors';

type TOrder = {
    orderId: string
}

const OrderDetails: FC<TOrder> = ({ orderId }) => {

    const orderRequest = useSelector( getOrderRequest );
    return (
        <>
            {
                orderRequest
                    ? <Loader />
                    : (
                        <div className={ `${ style.wrapper } mt-30` } data-test-id='order-details'>
                            <span className={ `${ style.orderId } text text_type_digits-large mb-8` }
                            >{ orderId }</span>
                            <span className={ `text text_type_main-medium` }>идентификатор заказа</span>
                            <img src={ icon } alt='готово' className={ `mt-15 mb-15` } />
                            <span className={ `text text_type_main-default mb-2` }>Ваш заказ начали готовить</span>
                            <span className={ `text text_type_main-default text_color_inactive mb-30` }>Дождитесь готовности на орбитальной станции</span>
                        </div>
                    )
            }

        </>
    );
}

export default OrderDetails;