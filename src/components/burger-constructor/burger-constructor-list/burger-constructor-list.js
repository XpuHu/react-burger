import React from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css'

function BurgerConstructorList( { selectedIngredients } ) {
    const [ topBun, ...ingredients ] = selectedIngredients;
    const bottomBun = ingredients.pop();

    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` }>
            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'top' }
                    isLocked={ true }
                    text={ topBun.name }
                    thumbnail={ topBun.image }
                    price={ topBun.price }
                />
            </div>


            <ConstructorIngredientsList selectedIngredients={ ingredients }/>

            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'bottom' }
                    isLocked={ true }
                    text={bottomBun.name}
                    thumbnail={ bottomBun.image }
                    price={ bottomBun.price }
                />
            </div>
        </section>
    );
}

export default BurgerConstructorList;