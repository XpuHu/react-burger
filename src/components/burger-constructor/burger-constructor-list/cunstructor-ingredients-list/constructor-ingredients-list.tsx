import React from 'react';
import style from './constructor-ingredients-list.module.css';
import { useSelector } from "react-redux";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import { TConstructorIngredient } from "../../../../utils/types";

function ConstructorIngredientsList() {
    // @ts-ignore
    const constructorIngredientList: Array<TConstructorIngredient> = useSelector( state => state.burgerConstructor.constructorIngredientList );

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