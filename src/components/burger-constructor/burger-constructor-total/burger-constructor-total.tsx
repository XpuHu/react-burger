import React, { FC, memo } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-total.module.css';
import { useSelector } from "react-redux";

type TConstructorTotal = {
    handleClick: () => void;
};

const BurgerConstructorTotal: FC<TConstructorTotal> = memo( ({ handleClick }) => {

    const totalPrice: number = useSelector( (state: any) => state.burgerConstructor.totalPrice );

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

export default BurgerConstructorTotal;