import React, { FC } from 'react';
import style from './burger-ingredients-category.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { TIngredientWithCount } from "../../../services/types/data";

type TIngredientCategory = {
    title: string,
    ingredients: TIngredientWithCount[],
    sectionId: string,
    customRef: React.RefObject<HTMLDivElement>
    handleOpenModal: (ingredient: TIngredientWithCount) => void
}

const BurgerIngredientsCategory: FC<TIngredientCategory> = (props) => {
    const { title, ingredients, handleOpenModal, sectionId, customRef } = props

    return (
        <>
            <h2 className={ `text text_type_main-medium mb-6` } id={ sectionId } ref={ customRef }>{ title }</h2>

            <div className={ `${ style.ingredients } ml-4 mr-2 mb-10` }>
                {
                    ingredients.map( ingredient => (
                        <BurgerIngredient
                            key={ ingredient._id }
                            ingredient={ ingredient }
                            handleOpenModal={ () => handleOpenModal( ingredient ) }
                        />
                    ) )
                }
            </div>
        </>
    );
}

export default BurgerIngredientsCategory;