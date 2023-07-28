import React from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-total.module.css'

function BurgerConstructorTotal(){
    return(
        <div className={`${style.burgerTotal} mr-4 mb-10`}>
            <span className={`text text_type_digits-medium mr-10`}>610 <CurrencyIcon type="primary"/></span>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>
    )
}

export default BurgerConstructorTotal;