import React from 'react';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredient.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient( { name, price, img, count } ) {
    return (
        <div className={ `${ style.ingredient }` }>
            {
                count > 0
                    ? <Counter count={ count }/>
                    : null
            }

            <img className={ `ml-4 mr-4` } src={ img } alt='Здесь живёт картинка'/>
            <p className={ `${ style.price } mt-1 mb-1` }>
                <span className={ `text_type_digits-default` }>{ price }</span>
                <span className={ `ml-2` }><CurrencyIcon type="primary"/></span>
            </p>
            <p className={ `${ style.description } text text_type_main-default` }>{ name }</p>
        </div>
    );
}

export default BurgerIngredient;