import React, { useEffect, useState } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [ ingredients, setIngredients ] = useState( [] );
    const [ ingredientTypes, setIngredientTypes ] = useState( {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинка',
    } );
    const [ selectedIngredients, setSelectedIngredients ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ hasError, setHasError ] = useState( false );
    const [ orderId, setOrderId ] = useState( Math.floor( Math.random() * (99999 - 1) + 1 ) );

    // TODO: Придумать как прокидывать нужный каунтер для каждого ингредиента
    const count = 0;

    useEffect( () => {
        const getIngredients = async () => {
            setHasError( false );
            setIsLoading( true );
            try {
                const response = await fetch( URL );
                if (response.ok) {
                    const body = await response.json();
                    body.success && setIngredients( [ ...ingredients, ...body.data ] );
                } else {
                    throw new Error(`Ошибка ${response.status}`);
                }
            } catch (e) {
                console.log( 'Произошла ошибка: ', e );
                setHasError( true );
                setIngredients( [] );
            } finally {
                setIsLoading( false );
            }
        };

        getIngredients();
    }, [] );

    // Пока добавляем все ингредиенты в конструктор
    useEffect( () => {
        const buns = ingredients.filter( ingredient => ingredient.type === 'bun' );
        const otherIngredients = ingredients.filter( ingredient => ingredient.type !== 'bun' );

        if ( (typeof buns !== 'undefined' && buns.length > 0) && (typeof otherIngredients !== 'undefined' && otherIngredients.length > 0) ) {
            setSelectedIngredients( [ buns[0], ...otherIngredients, buns[0] ] );
            setIsLoading( false );
        }
    }, [ ingredients ] );

    return (
        <>
            <AppHeader/>

            <main className={ `text text_type_main-default` }>
                { isLoading && 'Загрузка...' }
                { hasError && 'Произошла ошибка' }
                { !isLoading && !hasError &&
                    <>
                        <BurgerIngredients ingredients={ ingredients } ingredientTypes={ ingredientTypes }/>
                        <BurgerConstructor selectedIngredients={ selectedIngredients } orderId={ orderId }/>
                    </>
                }
            </main>
        </>
    );
}

export default App;
