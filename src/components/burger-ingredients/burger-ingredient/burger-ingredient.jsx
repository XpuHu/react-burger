import React, { useState } from 'react';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { ingredientType } from "../../../utils/types";

function BurgerIngredient( { ingredient, count } ) {
    const { name, price, image: img } = ingredient;

    const [ showModal, setShowModal ] = useState( false );

    const handleOpenModal = () => {
        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    return (
        <div className={ `${ style.ingredient }` }>

            {
                count > 0
                    ? <Counter count={ count }/>
                    : null
            }

            <img className={ `ml-4 mr-4` } src={ img } alt={ name } onClick={ handleOpenModal }/>
            <p className={ `${ style.price } mt-1 mb-1` }>
                <span className={ `text_type_digits-default` }>{ price }</span>
                <span className={ `ml-2` }><CurrencyIcon type="primary"/></span>
            </p>
            <p className={ `${ style.description } text text_type_main-default` }>{ name }</p>
            { showModal && (
                <IngredientDetails ingredient={ ingredient } handleCloseModal={ handleCloseModal }/>
            ) }
        </div>
    );
}

BurgerIngredient.propTypes = {
    ingredient: ingredientType.ingredientType,
    count: PropTypes.number,
};

export default BurgerIngredient;