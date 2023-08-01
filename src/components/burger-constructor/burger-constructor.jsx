import React, { useEffect, useState } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList
    from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import { selectedIngredientsType } from "../../utils/types";

function BurgerConstructor( { selectedIngredients } ) {
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( () => {
        if ( typeof selectedIngredients !== 'undefined' && selectedIngredients.length > 0 ) {
            setIsLoading( false );
        }
    } );

    const totalPrice = selectedIngredients.reduce( ( sum, ingredient ) => sum + ingredient.price, 0 );
    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>

            {
                !isLoading
                    ? <>
                        <BurgerConstructorList selectedIngredients={ selectedIngredients }/>
                        <BurgerConstructorTotal totalPrice={ totalPrice }/>
                    </>
                    : null
            }

        </section>
    );
}

BurgerConstructor.propTypes = selectedIngredientsType;

export default BurgerConstructor;