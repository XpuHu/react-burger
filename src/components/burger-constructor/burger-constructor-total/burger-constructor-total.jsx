import React, { memo } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-total.module.css';
import PropTypes from "prop-types";


const BurgerConstructorTotal = memo( ( { totalPrice, onButtonClick } ) => {

    const handleClick = () => {
        onButtonClick();
    };

    return (
        <div className={ `${ style.burgerTotal } mr-4 mb-10` }>
            <span className={ `text text_type_digits-medium mr-10` }>{ totalPrice } <CurrencyIcon
                type="primary"
            /></span>
            <Button htmlType="button" type="primary" size="medium" onClick={ handleClick }>
                Оформить заказ
            </Button>
        </div>
    );
} );

BurgerConstructorTotal.propTypes = {
    totalPrice: PropTypes.number,
    onButtonClick: PropTypes.func.isRequired
};

export default BurgerConstructorTotal;