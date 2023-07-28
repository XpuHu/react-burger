import React from 'react';
import style from './burger-ingredients.module.css'
import BurgerIngredientsHeader from "./burger-ingredients-header/burger-ingredients-header";
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";
import PropTypes from "prop-types";

function BurgerIngredients( { ingredients, ingredientTypes } ) {

    const typeNames = Object.entries( ingredientTypes );
    const types = Object.keys( ingredientTypes )

    return (
        <section className={ `${ style.burgerIngredients } pt-10 mr-10` }>
            <BurgerIngredientsHeader ingredientTypes={ typeNames } activeIndex={ 0 }/>
            <section className={ `${ style.ingredientsCategories } mt-10` }>
                {
                    types.map( type => (
                        <BurgerIngredientsCategory
                            key={ type }
                            title={ ingredientTypes[type] }
                            ingredients={ ingredients.filter( ( ingredient ) => ingredient.type === type ) }
                        />
                    ) )
                }
            </section>
        </section>
    );
}

BurgerIngredients.propTypes = {
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
    ingredientTypes: PropTypes.objectOf( PropTypes.string ).isRequired,
}

export default BurgerIngredients;