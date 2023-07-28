import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './constructor-ingredients-list.module.css'

function ConstructorIngredientsList() {
    return (
            <section className={`${ style.ingredientsList } pr-4`}>
                <div className={'mb-4'} style={{display: 'flex', alignItems: 'center'}}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        extraClass={`${style.inactive} ml-2`}
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={'mb-4'} style={{display: 'flex', alignItems: 'center'}}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        extraClass={`${style.inactive} ml-2`}
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={'mb-4'} style={{display: 'flex', alignItems: 'center'}}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        extraClass={`${style.inactive} ml-2`}
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={'mb-4'} style={{display: 'flex', alignItems: 'center'}}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        extraClass={`${style.inactive} ml-2`}
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </section>
    );
}

export default ConstructorIngredientsList;