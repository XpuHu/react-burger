import React, { memo, useEffect, useMemo, useState } from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css';
import { ingredientsType, ingredientType } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT } from "../../../services/actions/constructor";
import { INCREASE_COUNT } from "../../../services/actions/ingredients";
import { useDrop } from "react-dnd";

const BurgerConstructorList = memo( () => {
    const { constructorBun } = useSelector( state => state.burgerConstructor );
    const [ showBun, setShowBun ] = useState( false );
    const dispatch = useDispatch();

    useEffect( () => {
        constructorBun !== null ? setShowBun( true ) : setShowBun( false );
    }, [ constructorBun ] );

    const moveIngredient = ( ingredient ) => {
        // Добавляем ингредиент в конструктор
        dispatch( { type: ADD_INGREDIENT, ingredient } );
        // Увеличиваем счётчик в ингредиентах
        dispatch( { type: INCREASE_COUNT, id: ingredient._id } );
    };

    const moveBun = ( bun ) => {
        // Добавляем ингредиент в конструктор
        dispatch( { type: ADD_BUN, bun } );
    };

    const [ , dropTarget ] = useDrop( {
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop( ingredient ) {
            ingredient.type === 'bun'
                ? moveBun( ingredient )
                : moveIngredient( ingredient );
        }
    } );

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
    }, [ showBun, constructorBun ] );

    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` } ref={ dropTarget }>
            { content }
        </section>
    );
} );

BurgerConstructorList.propTypes = {
    bun: ingredientType.ingredientType,
    otherIngredients: ingredientsType.ingredients
};

export default BurgerConstructorList;