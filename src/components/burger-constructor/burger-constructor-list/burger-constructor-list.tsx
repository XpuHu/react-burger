import React, { memo, useMemo } from 'react';
import ConstructorIngredientsList from './cunstructor-ingredients-list/constructor-ingredients-list';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-list.module.css';
import { useDrop } from 'react-dnd';
import { TConstructorIngredient } from '../../../services/types/data';
import { useDispatch, useSelector } from '../../../hooks/hooks';
import { ADD_BUN } from '../../../services/constants/constructor';
import { DECREASE_COUNT, INCREASE_COUNT } from '../../../services/constants/ingredients';
import { getConstructorBun } from '../../../services/selectors';
import { addConstructorIngredient } from '../../../services/actions/constructor';

const BurgerConstructorList = memo( () => {

    const constructorBun = useSelector( getConstructorBun );
    const dispatch = useDispatch();

    const moveIngredient = (ingredient: TConstructorIngredient) => {
        dispatch( addConstructorIngredient( ingredient ) );
        dispatch( { type: INCREASE_COUNT, id: ingredient._id } );
    };

    const moveBun = (bun: TConstructorIngredient) => {
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