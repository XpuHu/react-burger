import React, { useEffect, useState } from 'react';
import style from './burger-ingredients.module.css';
import BurgerIngredientsHeader from "./burger-ingredients-header/burger-ingredients-header";
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ACTIVE_TYPE, SET_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { Loader } from "../loader/loader";

function BurgerIngredients() {

    const [ elementsOffsetTop, setElementsOffsetTop ] = useState( {} );

    const { ingredients, ingredientTypes, ingredientsRequest } = useSelector( state => state.ingredients );
    const dispatch = useDispatch();

    // Переключаем табы в зависимости от положения заголовков
    useEffect( () => {
        // TODO: Не хардкодить свойства, а подставлять динамически
        switch ( true ) {
            case elementsOffsetTop['bun'] < elementsOffsetTop['sauce'] && elementsOffsetTop['bun'] < elementsOffsetTop['main']:
                dispatch( { type: CHANGE_ACTIVE_TYPE, activeType: 'bun' } );
                break;
            case elementsOffsetTop['sauce'] < elementsOffsetTop['bun'] && elementsOffsetTop['sauce'] < elementsOffsetTop['main']:
                dispatch( { type: CHANGE_ACTIVE_TYPE, activeType: 'sauce' } );
                break;
            case elementsOffsetTop['main'] < elementsOffsetTop['bun'] && elementsOffsetTop['main'] < elementsOffsetTop['sauce']:
                dispatch( { type: CHANGE_ACTIVE_TYPE, activeType: 'main' } );
                break;
            default:
                dispatch( { type: CHANGE_ACTIVE_TYPE, activeType: 'bun' } );
        }
    }, [ elementsOffsetTop, dispatch ] );

    const handleOpenModal = ( ingredient ) => {
        dispatch( { type: SET_CURRENT_INGREDIENT, ingredient } );
    };

    const types = Object.entries( ingredientTypes );

    // При скроле записываем положение элементов
    const handleScroll = ( e ) => {
        const sectionChildren = e.target.childNodes;
        const headers = [ ...sectionChildren ].filter( section => section.id in ingredientTypes );
        // TODO: Не хардкодить свойства, а подставлять динамически
        setElementsOffsetTop( {
            'bun': Math.abs( 300 - headers[0].getBoundingClientRect().y ),
            'sauce': Math.abs( 300 - headers[1].getBoundingClientRect().y ),
            'main': Math.abs( 300 - headers[2].getBoundingClientRect().y )
        } );
    };

    return (
        <section className={ `${ style.burgerIngredients } pt-10 mr-10` }>
            <BurgerIngredientsHeader ingredientTypes={ types } />
            {
                ingredientsRequest
                    ? <Loader />
                    : (
                        <section className={ `${ style.ingredientsCategories } mt-10` }
                                 onScroll={ ( e ) => handleScroll( e ) }
                        >
                            { types.map( type => (
                                <BurgerIngredientsCategory
                                    key={ type[0] }
                                    title={ type[1] }
                                    ingredients={ ingredients.filter( ( ingredient ) => ingredient.type === type[0] ) }
                                    handleOpenModal={ handleOpenModal }
                                    sectionId={ type[0] }
                                />
                            ) )
                            }
                        </section>
                    )
            }
        </section>
    );
}

export default BurgerIngredients;