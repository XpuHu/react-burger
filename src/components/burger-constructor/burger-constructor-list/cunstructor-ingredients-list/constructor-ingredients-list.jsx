import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './constructor-ingredients-list.module.css'
import { ingredientsType } from "../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_INGREDIENT } from "../../../../services/actions/constructor";
import { DECREASE_COUNT } from "../../../../services/actions/ingredients";

function ConstructorIngredientsList() {
    const { constructorIngredientList } = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();

    const handleClose = (ingredient) => {
        dispatch({type: DELETE_INGREDIENT, id: ingredient.id})
        dispatch({type: DECREASE_COUNT, id: ingredient._id})
    }
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
                            handleClose={() => handleClose(ingredient)}
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