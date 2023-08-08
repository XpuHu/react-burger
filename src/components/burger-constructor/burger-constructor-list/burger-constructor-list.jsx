import React, { memo } from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css';
import { ingredientsType, ingredientType } from "../../../utils/types";

const BurgerConstructorList = memo( ( { bun, otherIngredients } ) => {
    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` }>
            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'top' }
                    isLocked={ true }
                    text={ `${ bun.name } (верх)` }
                    thumbnail={ bun.image }
                    price={ bun.price }
                />
            </div>

            <ConstructorIngredientsList selectedIngredients={ otherIngredients } />

            <div className={ 'ml-8 mb-4' }>
                <ConstructorElement
                    extraClass={ `${ style.inactive }` }
                    type={ 'bottom' }
                    isLocked={ true }
                    text={ `${ bun.name } (низ)` }
                    thumbnail={ bun.image }
                    price={ bun.price }
                />
            </div>
        </section>
    );
} );

BurgerConstructorList.propTypes = {
    bun: ingredientType.ingredientType,
    otherIngredients: ingredientsType.ingredients
};

export default BurgerConstructorList;