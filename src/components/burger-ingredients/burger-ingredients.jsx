import React, { useState } from 'react';
import style from './burger-ingredients.module.css'
import BurgerIngredientsHeader from "./burger-ingredients-header/burger-ingredients-header";
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";
import PropTypes from "prop-types";
import { ingredientsType } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "./burger-ingredient/ingredient-details/ingredient-details";

function BurgerIngredients( { ingredients, ingredientTypes } ) {

    const [ showModal, setShowModal ] = useState( false );
    const [ selectedIngredient, setSelectedIngredient] = useState({});

    const handleOpenModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    const types = Object.entries( ingredientTypes )

    return (
        <section className={ `${ style.burgerIngredients } pt-10 mr-10` }>
            <BurgerIngredientsHeader ingredientTypes={ types } activeIndex={ 0 }/>
            <section className={ `${ style.ingredientsCategories } mt-10` }>
                {
                    types.map( type => (
                        <BurgerIngredientsCategory
                            key={ type[0] }
                            title={ type[1] }
                            ingredients={ ingredients.filter( ( ingredient ) => ingredient.type === type[0] ) }
                            handleOpenModal={handleOpenModal}
                        />
                    ) )
                }
            </section>
            { showModal && (
                <Modal header={'Детали ингридиента'} handleClose={handleCloseModal} >
                    <IngredientDetails ingredient={ selectedIngredient } />
                </Modal>
            ) }
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: ingredientsType.ingredients,
    ingredientTypes: PropTypes.objectOf( PropTypes.string ).isRequired,
}

export default BurgerIngredients;