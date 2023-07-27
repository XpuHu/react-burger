import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredients-header.module.css'

function BurgerIngredientsHeader( { ingredientTypes, activeIndex } ) {
    return (
        <header>
            <h1 className={ `text text_type_main-large mb-5` }>Соберите бургер</h1>
            <nav className={ `${ style.tabs }` }>
                {
                    ingredientTypes.map( ( type, index ) => (
                        (index === activeIndex)
                            ? <Tab key={ index } active={ true } value={ '' } onClick={ () => {
                            } }>{ type }</Tab>
                            : <Tab key={ index } active={ false } value={ '' } onClick={ () => {
                            } }>{ type }</Tab>

                    ) )
                }
            </nav>
        </header>
    );
}

export default BurgerIngredientsHeader;