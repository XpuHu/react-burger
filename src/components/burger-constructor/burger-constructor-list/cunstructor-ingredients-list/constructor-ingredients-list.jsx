import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './constructor-ingredients-list.module.css'
import { ingredientsType } from "../../../../utils/types";
import { useSelector } from "react-redux";

function ConstructorIngredientsList() {
    const { constructorIngredientList } = useSelector(state => state.burgerConstructor);
    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {
                constructorIngredientList.map( ( ingredient, index ) => (
                    <div className={ `${ style.ingredient } mb-4` } key={ index }>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            extraClass={ `${ style.inactive } ml-2` }
                            text={ ingredient.name }
                            price={ ingredient.price }
                            thumbnail={ ingredient.image }
                        />
                    </div>
                ) )
            }
        </section>
    );
}

ConstructorIngredientsList.propTypes = {
    selectedIngredients: ingredientsType.ingredients
}

export default ConstructorIngredientsList;