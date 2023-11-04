import React from 'react';
import style from './constructor-ingredients-list.module.css';

import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import { TConstructorIngredient } from '../../../../services/types/data';
import { useSelector } from '../../../../hooks/hooks';
import { getConstructorIngredients } from '../../../../services/selectors';

function ConstructorIngredientsList() {

    const constructorIngredientList = useSelector( getConstructorIngredients );

    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {
                constructorIngredientList.map( (ingredient: TConstructorIngredient, index: number) => (
                    <ConstructorIngredient
                        ingredient={ ingredient } ingredientIndex={ index } key={ ingredient.id }
                    />
                ) )
            }
        </section>
    );
}

export default ConstructorIngredientsList;