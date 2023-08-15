import React, { useState } from 'react';
import style from './constructor-ingredients-list.module.css';
import { ingredientsType } from "../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";

function ConstructorIngredientsList() {
    const { constructorIngredientList } = useSelector( state => state.burgerConstructor );
    const dispatch = useDispatch();
    const [ ingredientsOrder, setIngredientsOrder ] = useState( [] );


    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {/*{*/ }
            {/*    constructorIngredientList.map( ( ingredient, index ) => (*/ }
            {/*        <div className={ `${ style.ingredient } mb-4` } key={ index } style={ { opacity } } ref={ dragRef }>*/ }
            {/*            <DragIcon type="primary" />*/ }
            {/*            <ConstructorElement*/ }
            {/*                extraClass={ `${ style.inactive } ml-2` }*/ }
            {/*                text={ ingredient.name }*/ }
            {/*                price={ ingredient.price }*/ }
            {/*                thumbnail={ ingredient.image }*/ }
            {/*                handleClose={ () => handleClose( ingredient ) }*/ }
            {/*            />*/ }
            {/*        </div>*/ }
            {/*    ) )*/ }
            {/*}*/ }

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