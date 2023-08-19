import React, { memo } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-total.module.css';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerConstructorTotal = memo( ( { handleClick } ) => {

    const { totalPrice } = useSelector( state => state.burgerConstructor );

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
    handleClick: PropTypes.func.isRequired
};

export default BurgerConstructorTotal;