import React, { memo, useEffect, useMemo, useState } from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css';
import { ingredientsType, ingredientType } from "../../../utils/types";
import { useSelector } from "react-redux";

const BurgerConstructorList = memo( () => {
    const { constructorBun } = useSelector( state => state.burgerConstructor );
    const [ showBun, setShowBun ] = useState( false );

    useEffect( () => {
        constructorBun !== null ? setShowBun( true ) : setShowBun( false );
    }, [ constructorBun ] );

    const content = useMemo( () => {
        return showBun
            ? (
                <>
                    <div className={ 'ml-8 mb-4' }>
                        <ConstructorElement
                            extraClass={ `${ style.inactive }` }
                            type={ 'top' }
                            isLocked={ true }
                            text={ `${ constructorBun.name } (верх)` }
                            thumbnail={ constructorBun.image }
                            price={ constructorBun.price }
                        />
                    </div>

                    <ConstructorIngredientsList />

                    <div className={ 'ml-8 mb-4' }>
                        <ConstructorElement
                            extraClass={ `${ style.inactive }` }
                            type={ 'bottom' }
                            isLocked={ true }
                            text={ `${ constructorBun.name } (низ)` }
                            thumbnail={ constructorBun.image }
                            price={ constructorBun.price }
                        />
                    </div>
                </>
            ) : (
                <ConstructorIngredientsList />
            );
    }, [ showBun ] );

    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` }>
            { content }
        </section>
    );
} );

BurgerConstructorList.propTypes = {
    bun: ingredientType.ingredientType,
    otherIngredients: ingredientsType.ingredients
};

export default BurgerConstructorList;