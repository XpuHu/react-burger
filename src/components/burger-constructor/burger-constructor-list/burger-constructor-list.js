import React from 'react';
import ConstructorIngredientsList from "./cunstructor-ingredients-list/constructor-ingredients-list";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor-list.module.css'

function BurgerConstructorList() {
    return (
        <section className={ `${style.ingredientsListWrapper} mb-10` }>
            <div className={'ml-8 mb-4'}>
                <ConstructorElement
                    extraClass={`${style.inactive}`}
                    type={'top'}
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    thumbnail={ 'https://code.s3.yandex.net/react/code/bun-02.png' }
                    price={ 20 }
                />
            </div>


            <ConstructorIngredientsList/>

            <div className={'ml-8 mb-4'}>
                <ConstructorElement
                    extraClass={`${style.inactive}`}
                    type={'bottom'}
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    thumbnail={ 'https://code.s3.yandex.net/react/code/bun-02.png' }
                    price={ 20 }
                />
            </div>
        </section>
    );
}

export default BurgerConstructorList;