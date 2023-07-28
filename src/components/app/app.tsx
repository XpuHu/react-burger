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
            selectedIngredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                    "price":1255,
                    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b9",
                    "name":"Соус традиционный галактический",
                    "price":15,
                    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b4",
                    "name":"Мясо бессмертных моллюсков Protostomia",
                    "price":1337,
                    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9bc",
                    "name":"Плоды Фалленианского дерева",
                    "price":874,
                    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9bb",
                    "name":"Хрустящие минеральные кольца",
                    "price":300,
                    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9bb",
                    "name":"Хрустящие минеральные кольца",
                    "price":300,
                    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                    "price":1255,
                    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                },
            ],
        };
    }

    render() {
        // TODO: Придумать как прокидывать нужный каунтер для каждого ингредиента
        const count = 0;

        // @ts-ignore
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
