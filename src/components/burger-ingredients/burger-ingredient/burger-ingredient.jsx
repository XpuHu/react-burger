import React, { useState } from 'react';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../../modal/modal";

function BurgerIngredient( { ingredient, count } ) {
    const { image_large: imgLarge, name, price, image: img } = ingredient;

    const [ showModal, setShowModal ] = useState( false );

    const handleOpenModal = () => {
        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    const modal = (
        <Modal header={ 'Детали ингридиента' } handleClose={ handleCloseModal }>
            <img className={ `${ style.imgLarge } pl-5 pr-5 mb-4` } src={ imgLarge } alt={ name }/>
            <p className={ `${ style.modalName } text text_type_main-medium mb-8` }>{ name }</p>
            <div className={ `${ style.nutritionList } text text_type_main-default text_color_inactive mb-15` }>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Калории,ккал</span>
                    <span className={ `text_type_digits-default` }>{ ingredient.calories }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Белки, г</span>
                    <span className={ `text_type_digits-default` }>{ ingredient.proteins }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Жиры, г</span>
                    <span className={ `text_type_digits-default` }>{ ingredient.fat }</span>
                </div>
                <div className={ `${ style.nutritionItem }` }>
                    <span>Углеводы, г</span>
                    <span className={ `text_type_digits-default` }>{ ingredient.carbohydrates }</span>
                </div>
            </div>
        </Modal>
    );

    return (
        <div className={ `${ style.ingredient }` }>

            {
                count > 0
                    ? <Counter count={ count }/>
                    : null
            }

            <img className={ `ml-4 mr-4` } src={ img } alt={ name } onClick={ handleOpenModal }/>
            <p className={ `${ style.price } mt-1 mb-1` }>
                <span className={ `text_type_digits-default` }>{ price }</span>
                <span className={ `ml-2` }><CurrencyIcon type="primary"/></span>
            </p>
            <p className={ `${ style.description } text text_type_main-default` }>{ name }</p>
            { showModal && modal }
        </div>
    )
}

BurgerIngredient.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    img: PropTypes.string,
    count: PropTypes.number,
};

export default BurgerIngredient;