import React from 'react';
import style from './burger-constructor.module.css'
import BurgerConstructorList
    from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";

function BurgerConstructor() {
    // Верхний и нижний элемент - всегда булка
    return (
        <section className={ `${style.burgerConstructor} pt-25 pl-4` }>

            <BurgerConstructorList/>
            <BurgerConstructorTotal/>

        </section>
    );
}

export default BurgerConstructor;