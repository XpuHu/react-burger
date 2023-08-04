import React from 'react';
import style from './burger-ingredients-category.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientsType } from "../../../utils/types";

function BurgerIngredientsCategory( { title, ingredients, handleOpenModal } ) {

    return (
        <>
            <h2 className={ `text text_type_main-medium mb-6` }>{ title }</h2>

            <div className={ `${ style.ingredients } ml-4 mr-2 mb-10` }>
                {
                    ingredients.map( ingredient => (
                        <BurgerIngredient
                            key={ ingredient._id }
                            ingredient={ ingredient }
                            count={ 1 }
                            handleOpenModal={() => handleOpenModal(ingredient)}
                        />
                    ) )
                }
            </div>
        </>
    );
}

BurgerIngredientsCategory.propTypes = {
    ingredients: ingredientsType.ingredients,
    title: PropTypes.string.isRequired,
};

export default BurgerIngredientsCategory;