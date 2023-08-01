import React from 'react';
import style from './burger-constructor.module.css'
import BurgerConstructorList
    from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import { selectedIngredientsType } from "../../utils/types";

function BurgerConstructor({selectedIngredients}) {
    const totalPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return (
        <section className={ `${style.burgerConstructor} pt-25 pl-4` }>

            <BurgerConstructorList selectedIngredients={selectedIngredients}/>
            <BurgerConstructorTotal totalPrice={totalPrice}/>

        </section>
    );
}

BurgerConstructor.propTypes = selectedIngredientsType

export default BurgerConstructor;