import React, { memo, useMemo } from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css';
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT } from "../../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { TConstructorIngredient, TIngredient } from "../../../utils/types";
import { DECREASE_COUNT, INCREASE_COUNT } from "../../../services/constants/ingredients";

const BurgerConstructorList = memo( () => {
    // @ts-ignore
    const constructorBun: TIngredient = useSelector( state => state.burgerConstructor.constructorBun );
    const dispatch = useDispatch();

    const moveIngredient = (ingredient: TIngredient) => {
        dispatch( { type: ADD_INGREDIENT, ingredient } );
        dispatch( { type: INCREASE_COUNT, id: ingredient._id } );
    };

    const moveBun = (bun: TIngredient) => {
        if ( constructorBun ) {
            dispatch( { type: DECREASE_COUNT, id: constructorBun._id } );
        }
        dispatch( { type: ADD_BUN, bun } );
        dispatch( { type: INCREASE_COUNT, id: bun._id } );
    };

    const [ , dropTarget ] = useDrop<TConstructorIngredient, unknown, unknown>( {
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(ingredient) {
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