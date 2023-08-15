import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredients-header.module.css';
import PropTypes from "prop-types";

function BurgerIngredientsHeader( { ingredientTypes, activeIndex } ) {

    return (
        <header>
            <h1 className={ `text text_type_main-large mb-5` }>Соберите бургер</h1>
            <nav className={ `${ style.tabs }` }>
                {
                    ingredientTypes.map( ( type, index ) => (
                        (index === activeIndex)
                            ? <Tab key={ index } active={ true } value={ type[0] } onClick={ () => {
                            } }>{ type[1] }</Tab>
                            : <Tab key={ index } active={ false } value={ type[0] } onClick={ () => {
                            } }>{ type[1] }</Tab>

                    ) )
                }
            </nav>
        </header>
    );
}

BurgerIngredientsHeader.propTypes = {
    ingredientTypes: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ) ).isRequired,
    activeIndex: PropTypes.number.isRequired,
}

export default BurgerIngredientsHeader;