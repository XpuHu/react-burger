import React, { createContext, useEffect, useId, useReducer, useState } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './app.module.css';
import { useDispatch } from "react-redux";
import { ADD_INGREDIENT } from "../../services/actions/constructor";
import { INCREASE_COUNT } from "../../services/actions/ingredients";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
// export const SelectedIngredientsContext = createContext( null );
// const discountInitialState = { discount: null };

// function reducer( state, action ) {
//     switch ( action.type ) {
//         case "set":
//             return { discount: action.payload };
//         case "reset":
//             return { discount: discountInitialState };
//         default:
//             throw new Error( `Wrong type of action: ${ action.type }` );
//     }
// }

function App() {
    // const [ ingredients, setIngredients ] = useState( [] );
    // const [ ingredientTypes, setIngredientTypes ] = useState( {
    //     bun: 'Булки',
    //     sauce: 'Соусы',
    //     main: 'Начинка',
    // } );
    // const [ selectedIngredients, setSelectedIngredients ] = useState( [] );
    // // const [ isLoading, setIsLoading ] = useState( false );
    // // const [ hasError, setHasError ] = useState( false );
    // const [ orderId, setOrderId ] = useState( Math.floor( Math.random() * (99999 - 1) + 1 ) );


    // TODO: Придумать как прокидывать нужный каунтер для каждого ингредиента
    const count = 0;

    // useEffect( () => {
    //     const getIngredients = async () => {
    //         setHasError( false );
    //         setIsLoading( true );
    //         try {
    //             const response = await fetch( INGREDIENTS_URL );
    //
    //             if ( !response.ok ) {
    //                 throw new Error( `Ошибка ${ response.status }` );
    //
    //             }
    //
    //             const body = await response.json();
    //             body.success && setIngredients( [ ...ingredients, ...body.data ] );
    //
    //         } catch (e) {
    //             console.log( 'Произошла ошибка: ', e );
    //             setHasError( true );
    //             setIngredients( [] );
    //         } finally {
    //             setIsLoading( false );
    //         }
    //     };
    //
    //     getIngredients();
    // }, [] );

    // Пока добавляем все ингредиенты в конструктор
    // useEffect( () => {
    //     const buns = ingredients.filter( ingredient => ingredient.type === 'bun' );
    //     const otherIngredients = ingredients.filter( ingredient => ingredient.type !== 'bun' );
    //
    //     if ( (typeof buns !== 'undefined' && buns.length > 0) && (typeof otherIngredients !== 'undefined' && otherIngredients.length > 0) ) {
    //         setSelectedIngredients( [ buns[0], ...otherIngredients ] );
    //         setIsLoading( false );
    //     }
    // }, [ ingredients ] );


    return (
        <>
            <AppHeader />

            <main className={ `text text_type_main-default` }>
                {/*{ isLoading && 'Загрузка...' }*/ }
                {/*{ hasError && 'Произошла ошибка' }*/ }
                {/*{ !isLoading && !hasError &&*/ }
                {/*    // <SelectedIngredientsContext.Provider value={ { selectedIngredients } }>*/ }

                <BurgerIngredients />
                <BurgerConstructor />

                {/*    // </SelectedIngredientsContext.Provider>*/ }
                {/*}*/ }
            </main>
        </>
    );
}

export default App;
