import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './constructor-ingredients-list.module.css'
import PropTypes from 'prop-types';

function ConstructorIngredientsList( { selectedIngredients } ) {
    return (
        <section className={ `${ style.ingredientsList } pr-4` }>
            {
                selectedIngredients.map( ( ingredient, index ) => (
                    <div className={ `${ style.ingredient } mb-4` } key={ index }>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            extraClass={ `${ style.inactive } ml-2` }
                            text={ ingredient.name }
                            price={ ingredient.price }
                            thumbnail={ ingredient.image }
                        />
                    </div>
                ) )
            }

        </section>
    );
}

ConstructorIngredientsList.propTypes = {
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    }))
}

export default ConstructorIngredientsList;