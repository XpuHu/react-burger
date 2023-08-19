import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './app.module.css';

function App() {
    return (
        <>
            <AppHeader />

            <main className={ `text text_type_main-default` }>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    );
}

export default App;
