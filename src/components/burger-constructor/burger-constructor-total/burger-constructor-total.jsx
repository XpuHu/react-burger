import React, { useEffect, useState } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-total.module.css';
import PropTypes from "prop-types";
import OrderDetails from "./order-details/order-details";

function BurgerConstructorTotal( { totalPrice } ) {

    const [ showModal, setShowModal ] = useState( false );
    const [ orderId, setOrderId] = useState('');

    useEffect(() => {
        // Генерируем рандомный id для заказа
        const randomOrderId = Math.floor(Math.random() * (999999 - 1) + 1)
        setOrderId(transformOrderId(randomOrderId));
    }, [])

    const handleOpenModal = () => {


        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    // id заказа всегда 6 цифр, если цифр меньше - в начале пишутся нули
    const transformOrderId = (orderId) => String(orderId).padStart(6, '0')

    return (
        <div className={ `${ style.burgerTotal } mr-4 mb-10` }>
            <span className={ `text text_type_digits-medium mr-10` }>{ totalPrice } <CurrencyIcon
                type="primary"/></span>
            <Button htmlType="button" type="primary" size="medium" onClick={ handleOpenModal }>
                Оформить заказ
            </Button>
            { showModal && (<OrderDetails orderId={ orderId } handleCloseModal={ handleCloseModal }/>) }
        </div>
    );
}

BurgerConstructorTotal.propTypes = {
    totalPrice: PropTypes.number
};

export default BurgerConstructorTotal;