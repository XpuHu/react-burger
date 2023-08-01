import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './app.module.css'
import {data, selectedIngredients} from '../../utils/data'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: data,
            ingredientTypes: {
                bun: 'Булки',
                sauce: 'Соусы',
                main: 'Начинка',
            },
            selectedIngredients: selectedIngredients,
        };
    }

    render() {
        // TODO: Придумать как прокидывать нужный каунтер для каждого ингредиента
        const count = 0;

        const {ingredients, ingredientTypes, selectedIngredients} = this.state
        return (
            <>
                <AppHeader/>

                <main className={`text text_type_main-default`}>
                    <BurgerIngredients ingredients={ingredients} ingredientTypes={ingredientTypes}/>
                    <BurgerConstructor selectedIngredients={selectedIngredients}/>
                </main>
            </>
        );
    }
}

export default App;
