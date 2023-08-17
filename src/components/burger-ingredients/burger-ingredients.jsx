import React, { useEffect, useState } from 'react';
import style from './burger-ingredients.module.css';
import BurgerIngredientsHeader from "./burger-ingredients-header/burger-ingredients-header";
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "./burger-ingredient/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from 'react-redux';
import {
    CHANGE_ACTIVE_TYPE,
    DELETE_CURRENT_INGREDIENT,
    getIngredients,
    SET_CURRENT_INGREDIENT
} from "../../services/actions/ingredients";

function BurgerIngredients() {

    const [ showModal, setShowModal ] = useState( false );
    const [ elementsOffsetTop, setElementsOffsetTop ] = useState( {
        'bun': 0,
        'sauce': 1,
        'main': 2
    } );

    const { ingredients, ingredientTypes } = useSelector( state => state.ingredients );
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch( getIngredients() );
        }, [ dispatch ]
    );

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
        }
    }, [ elementsOffsetTop ] );

    const handleOpenModal = ( ingredient ) => {
        dispatch( { type: SET_CURRENT_INGREDIENT, ingredient } );
        setShowModal( true );
    };

    const handleCloseModal = () => {
        dispatch( { type: DELETE_CURRENT_INGREDIENT } );
        setShowModal( false );
    };

    const types = Object.entries( ingredientTypes );

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
            <section className={ `${ style.ingredientsCategories } mt-10` } onScroll={ ( e ) => handleScroll( e ) }>
                {
                    types.map( type => (
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
            { showModal && (
                <Modal header={ 'Детали ингридиента' } handleClose={ handleCloseModal }>
                    <IngredientDetails />
                </Modal>
            ) }
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: ingredientsType.ingredients,
    ingredientTypes: PropTypes.objectOf( PropTypes.string ).isRequired,
};

export default BurgerIngredients;