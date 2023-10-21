import React, { FC } from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredient.module.css';
import { TIngredientWithCount } from "../../../utils/types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

type TBurgerIngredient = {
    ingredient: TIngredientWithCount,
    handleOpenModal: () => void
}

const BurgerIngredient: FC<TBurgerIngredient> = ({ ingredient, handleOpenModal }) => {
    const { name, price, image: img, count } = ingredient;
    const location = useLocation();

    const [ { opacity }, dragRef ] = useDrag( {
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    } );

    return (

        <div className={ `${ style.ingredient }` } onClick={ handleOpenModal } style={ { opacity } }
             ref={ dragRef }
        >
            <Link to={ `/ingredients/${ ingredient._id }` } className={ style.link }
                  state={ { prevLocation: location } }
            >
                {
                    count > 0
                        ? <Counter count={ count } />
                        : null
                }

                <img className={ `ml-4 mr-4` } src={ img } alt={ name } />
                <p className={ `${ style.price } mt-1 mb-1` }>
                    <span className={ `text_type_digits-default` }>{ price }</span>
                    <span className={ `ml-2` }><CurrencyIcon type="primary" /></span>
                </p>
                <p className={ `${ style.description } text text_type_main-default` }>{ name }</p>
            </Link>
        </div>

    );
}

export default BurgerIngredient;