import React from "react";
import style from './order-details.module.css';
import icon from '../../../../images/done.svg';
import PropTypes from "prop-types";

function OrderDetails( { orderId } ) {
    return (
        <>
            <span className={ `${ style.orderId } text text_type_digits-large mt-4 mb-8` }>{ orderId }</span>
            <span className={ `text text_type_main-medium` }>идентификатор заказа</span>
            <img src={ icon } alt="готово" className={ `mt-15 mb-15` }/>
            <span className={ `text text_type_main-default mb-2` }>Ваш заказ начали готовить</span>
            <span className={ `text text_type_main-default text_color_inactive mb-30` }>Дождитесь готовности на орбитальной станции</span>
        </>
    );
}

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired
}

export default OrderDetails;