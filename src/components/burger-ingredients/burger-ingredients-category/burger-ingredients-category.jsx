import React from 'react';
import style from './burger-ingredients-category.module.css'
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientsType } from "../../../utils/types";

function BurgerIngredientsCategory( { title, ingredients } ) {

    return (
        <>
            <h2 className={ `text text_type_main-medium mb-6` }>{ title }</h2>

            <div className={ `${ style.ingredients } ml-4 mr-2 mb-10` }>
                {
                    ingredients.map( ingredient => (
                        <BurgerIngredient
                            key={ ingredient._id }
                            name={ ingredient.name }
                            price={ ingredient.price }
                            img={ ingredient.image }
                            count={ 1 }
                            alt={ ingredient.name }
                        />
                    ) )
                }
            </div>
        </>
    );
}

BurgerIngredientsCategory.propTypes = {
    ...ingredientsType,
    title: PropTypes.string.isRequired,
}

export default BurgerIngredientsCategory;