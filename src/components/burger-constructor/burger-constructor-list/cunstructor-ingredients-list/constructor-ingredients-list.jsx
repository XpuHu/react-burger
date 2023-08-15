import React from 'react';
import style from './constructor-ingredients-list.module.css';
import { ingredientsType } from "../../../../utils/types";
import { useSelector } from "react-redux";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";

function ConstructorIngredientsList() {
    const { constructorIngredientList } = useSelector( state => state.burgerConstructor );
    
    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {
                constructorIngredientList.map( ( ingredient, index ) => (
                    <ConstructorIngredient
                        ingredient={ ingredient } ingredientIndex={ index } key={ ingredient.id }
                    />
                ) )
            }
        </section>
    );
}

ConstructorIngredientsList.propTypes = {
    selectedIngredients: ingredientsType.ingredients
};

export default ConstructorIngredientsList;