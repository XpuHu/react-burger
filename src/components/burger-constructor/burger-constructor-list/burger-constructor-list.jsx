import React from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css'
import { selectedIngredientsType } from "../../../utils/types";

function BurgerConstructorList( { selectedIngredients } ) {
    const [ topBun, ...otherIngredients ] = selectedIngredients;
    const bottomBun = otherIngredients.pop();

    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` }>
            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'top' }
                    isLocked={ true }
                    text={ `${topBun.name} (верх)` }
                    thumbnail={ topBun.image }
                    price={ topBun.price }
                />
            </div>


            <ConstructorIngredientsList selectedIngredients={ otherIngredients }/>

            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'bottom' }
                    isLocked={ true }
                    text={ `${topBun.name} (низ)` }
                    thumbnail={ bottomBun.image }
                    price={ bottomBun.price }
                />
            </div>
        </section>
    );
}

BurgerConstructorList.propTypes = selectedIngredientsType

export default BurgerConstructorList;