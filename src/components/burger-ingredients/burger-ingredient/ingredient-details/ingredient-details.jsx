import React, { useMemo } from 'react';
import style from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails() {
    // const {
    //     image_large: imgLarge,
    //     name,
    //     calories,
    //     proteins,
    //     fat,
    //     carbohydrates
    // } = useSelector( state => state.ingredients.currentIngredient );
    const { id } = useParams();

    const ingredients = useSelector( state => state.ingredients.ingredients );
    const ingredient = ingredients.find( ingredient => ingredient._id === id );
    const {
        image_large: imgLarge,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = ingredient;

    const content = useMemo( () => {
        return ingredient
            ? (
                <>
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
                </>
            )
            : null;
    }, [ ingredient ] );

    return content;
}

export default IngredientDetails;