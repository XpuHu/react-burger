import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './app.css'
import {data} from '../../utils/data'

// function App() {
//
//     const state = {
//         ingredients: data,
//         typeNames: {
//             'bun': 'Булки',
//             'main': 'Начинка',
//             'sauce': 'Соусы'
//         },
//         types: []
//     }
//
//     const types = data.map(item => item.type)
//     const typeSet = new Set(types)
//     const typeArr = Array.from(typeSet)
//
//     const arr = [];
//     // const type = 'bun'
//     // arr.push(state.typeNames[type])
//     // console.log(arr)
//     for (let type in state.typeNames) {
//         if (typeSet.has(type)) {
//             // @ts-ignore
//             // arr.push(state.typeNames[type])
//             state.types = [...state.types, state.typeNames[type]]
//         }
//     }
//
//     // const typeMap = new Map(typeSet.values())
//     // console.log(typeSet.values())
//     // console.log(typeSet.entries())
//     // console.log(typeSet.keys())
//     // @ts-ignore
//     // for (const value of typeSet.values()) {
//     //     console.log(value)
//     // }
//     // console.log(typeMap)
//     return (
//         <>
//             <AppHeader/>
//
//             <main className={`text text_type_main-default`}>
//                 <BurgerIngredients categories={state.types}/>
//                 {/*<BurgerConstructor/>*/}
//             </main>
//         </>
//     );
// }

class App extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            ingredients: data,
            ingredientTypes: {
                bun: 'Булки',
                sauce: 'Соусы',
                main: 'Начинка',
            },
        };
    }

    render() {
        // TODO: Придумать как прокидывать нужный каунтер для каждого ингредиента
        const count = 0;

        // @ts-ignore
        const {ingredients, ingredientTypes} = this.state
        return (
            <>
                <AppHeader/>

                <main className={`text text_type_main-default`}>
                    <BurgerIngredients ingredients={ingredients} ingredientTypes={ingredientTypes}/>
                    <BurgerConstructor/>
                </main>
            </>
        );
    }
}

export default App;
