import React from 'react';
import style from './burger-ingredients-category.module.css'
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";

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
                            count={ 1 }/>
                    ) )
                }
            </div>
        </>
    );
}

BurgerIngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf( PropTypes.shape( {
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    } ) ).isRequired,
    title: PropTypes.string.isRequired,
}

export default BurgerIngredientsCategory;