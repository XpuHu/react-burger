import React, { memo, useMemo } from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css';
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT } from "../../../services/actions/constructor";
import { DECREASE_BUN_COUNT, INCREASE_BUN_COUNT, INCREASE_COUNT } from "../../../services/actions/ingredients";
import { useDrop } from "react-dnd";

const BurgerConstructorList = memo( () => {
    const { constructorBun } = useSelector( state => state.burgerConstructor );
    const dispatch = useDispatch();

    const moveIngredient = ( ingredient ) => {
        dispatch( { type: ADD_INGREDIENT, ingredient } );
        dispatch( { type: INCREASE_COUNT, id: ingredient._id } );
    };

    const moveBun = ( bun ) => {
        if ( constructorBun ) {
            dispatch( { type: DECREASE_BUN_COUNT, id: constructorBun._id } );
        }
        dispatch( { type: ADD_BUN, bun } );
        dispatch( { type: INCREASE_BUN_COUNT, id: bun._id } );
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
        return constructorBun !== null
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
    }, [ constructorBun ] );

    return (
        <section className={ `${ style.ingredientsListWrapper } mb-10` } ref={ dropTarget }>
            { content }
        </section>
    );
} );

export default BurgerConstructorList;