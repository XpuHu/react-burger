import React from 'react';
import style from './ingredient-details.module.css';
import { useSelector } from "react-redux";

function IngredientDetails() {
    const {
        image_large: imgLarge,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = useSelector( state => state.ingredients.currentIngredient );

    return (
        <>
            <img className={ `${ style.imgLarge } pl-5 pr-5 mb-4` } src={ imgLarge } alt={ name } />
            <p className={ `text text_type_main-medium mb-8` }>{ name }</p>
            <div className={ `${ style.nutritionList } text text_type_main-default text_color_inactive mb-15` }>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Калории,ккал</span>
                    <span className={ `text_type_digits-default` }>{ calories }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Белки, г</span>
                    <span className={ `text_type_digits-default` }>{ proteins }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Жиры, г</span>
                    <span className={ `text_type_digits-default` }>{ fat }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Углеводы, г</span>
                    <span className={ `text_type_digits-default` }>{ carbohydrates }</span>
                </div>
            </div>
        </>
    );
}

export default IngredientDetails;