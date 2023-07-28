import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './constructor-ingredients-list.module.css'

function ConstructorIngredientsList( { selectedIngredients } ) {
    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {
                selectedIngredients.map( ingredient => (
                    <div className={ `${ style.ingredient } mb-4` }>
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

export default ConstructorIngredientsList;