import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-ingredients-header.module.css';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_ACTIVE_TYPE } from "../../../services/actions/ingredients";

function BurgerIngredientsHeader( { ingredientTypes } ) {

    const { activeType } = useSelector( state => state.ingredients );
    const dispatch = useDispatch();

    const onTabClick = ( e ) => {
        dispatch( { type: CHANGE_ACTIVE_TYPE, activeType: e } );
    };

    return (
        <header>
            <h1 className={ `text text_type_main-large mb-5` }>Соберите бургер</h1>
            <nav className={ `${ style.tabs }` }>
                {
                    ingredientTypes.map( ( type, index ) => (
                        (type[0] === activeType)
                            ? <a className={ style.link } href={ `#${ type[0] }` }>
                                <Tab key={ index } active={ true }
                                     value={ type[0] }
                                     onClick={ ( e ) => onTabClick( e ) }
                                >{ type[1] }</Tab>
                            </a>
                            : <a className={ style.link } href={ `#${ type[0] }` }>
                                <Tab key={ index } active={ false }
                                     value={ type[0] }
                                     onClick={ ( e ) => onTabClick( e ) }
                                >{ type[1] }</Tab>
                            </a>

                    ) )
                }
            </nav>
        </header>
    );
}

BurgerIngredientsHeader.propTypes = {
    ingredientTypes: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ) ).isRequired,
    activeIndex: PropTypes.number.isRequired,
};

export default BurgerIngredientsHeader;