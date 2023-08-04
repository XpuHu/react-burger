import React, { useEffect, useState } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList
    from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import { ingredientsType } from "../../utils/types";
import PropTypes from "prop-types";

const BurgerConstructor =  ( { selectedIngredients, orderId } ) => {
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( () => {
        if ( typeof selectedIngredients !== 'undefined' && selectedIngredients.length > 0 ) {
            setIsLoading( false );
        }
    }, [selectedIngredients] );

    const totalPrice = selectedIngredients.reduce( ( sum, ingredient ) => sum + ingredient.price, 0 );
    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>
            { isLoading && 'Загрузка...' }
            {
                !isLoading &&
                    <>
                        <BurgerConstructorList selectedIngredients={ selectedIngredients }/>
                        <BurgerConstructorTotal totalPrice={ totalPrice } orderId={orderId}/>
                    </>
            }

        </section>
    );
}

BurgerConstructor.propTypes = {
    selectedIngredients: ingredientsType.ingredients,
    orderId: PropTypes.number
}

export default BurgerConstructor;