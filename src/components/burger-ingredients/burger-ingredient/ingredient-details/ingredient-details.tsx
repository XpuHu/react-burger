import React from 'react';
import style from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../../loader/loader";
import { TIngredient } from "../../../../utils/types";

function IngredientDetails() {
    const { id } = useParams<string>();

    // @ts-ignore
    const ingredients = useSelector( state => state.ingredients.ingredients );
    if ( ingredients.length === 0 ) {
        return <Loader />;
    }

    const ingredient: TIngredient = ingredients.find( (ingredient: TIngredient) => ingredient._id === id );
    const {
        image_large: imgLarge,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = ingredient;

    return (
        <div className={ style.wrapper }>
            <h2 className={ `${ style.header } text text_type_main-large mt-10` }>Детали ингридиента</h2>
            <img className={ `${ style.imgLarge } pl-5 pr-5 mb-4` } src={ imgLarge }
                 alt={ name }
            />
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
        </div>
    );
}

export default IngredientDetails;