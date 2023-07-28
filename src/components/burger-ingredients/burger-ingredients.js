import React from 'react';
import style from './burger-ingredients.module.css'
import BurgerIngredientsHeader from "./burger-ingredients-header/burger-ingredients-header";
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";

function BurgerIngredients( { ingredients, ingredientTypes } ) {

    const typeNames = Object.values( ingredientTypes )
    const types = Object.keys( ingredientTypes )

    return (
        <section className={ `${ style.burgerIngredients } pt-10 mr-10` }>
            <BurgerIngredientsHeader ingredientTypes={ typeNames } activeIndex={ 0 }/>
            <section className={ `${ style.ingredientsCategories } mt-10` }>
                {
                    types.map( ( type, index ) => (
                        <BurgerIngredientsCategory
                            key={ index }
                            title={ ingredientTypes[type] }
                            ingredients={ ingredients.filter( ( ingredient ) => ingredient.type === type ) }
                        />
                    ) )
                }
            </section>
        </section>
    );
}

export default BurgerIngredients;