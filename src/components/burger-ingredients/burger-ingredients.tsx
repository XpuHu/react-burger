import React, { useRef, useState } from 'react';
import style from './burger-ingredients.module.css';
import BurgerIngredientsCategory from "./burger-ingredients-category/burger-ingredients-category";
import { Loader } from "../loader/loader";
import { TIngredient, TIngredientWithCount } from "../../services/types/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { SET_CURRENT_INGREDIENT } from "../../services/constants/ingredients";

function BurgerIngredients() {

    const { ingredients, ingredientsRequest } = useSelector( state => state.ingredients );
    const dispatch = useDispatch();

    const [ currentTab, setCurrentTab ] = useState<string>( 'bun' );
    const wrapperRef = useRef<HTMLDivElement | null>( null );
    const bunRef = useRef<HTMLDivElement | null>( null );
    const sauceRef = useRef<HTMLDivElement | null>( null );
    const mainRef = useRef<HTMLDivElement | null>( null );

    const handleOpenModal = (ingredient: TIngredientWithCount) => {
        dispatch( { type: SET_CURRENT_INGREDIENT, ingredient } );
    };

    const handleScroll = () => {
        // При скроле записываем положение элементов
        const containerTop = wrapperRef.current!.getBoundingClientRect().top;
        const bunTop = bunRef.current!.getBoundingClientRect().top;
        const sauceTop = sauceRef.current!.getBoundingClientRect().top;
        const mainTop = mainRef.current!.getBoundingClientRect().top;

        // В зависимости от удалённости от табов
        switch (true) {
            case Math.abs( containerTop - bunTop ) < Math.abs( containerTop - sauceTop ):
                setCurrentTab( 'bun' );
                break;
            case (Math.abs( containerTop - sauceTop ) < Math.abs( containerTop - bunTop ))
            && (Math.abs( containerTop - sauceTop ) < Math.abs( containerTop - mainTop )):
                setCurrentTab( 'sauce' );
                break;
            case Math.abs( containerTop - mainTop ) < Math.abs( containerTop - sauceTop ):
                setCurrentTab( 'main' );
                break;
            default:
                setCurrentTab( 'bun' );
                break;
        }
    };

    return (
        <section className={ `${ style.burgerIngredients } pt-10 mr-10` }>
            <header>
                <h1 className={ `text text_type_main-large mb-5` }>Соберите бургер</h1>
                <nav className={ `${ style.tabs }` }>
                    <a className={ style.link } href={ `#bun` }>
                        <Tab active={ currentTab === 'bun' } value={ 'bun' } onClick={ setCurrentTab }>Булки</Tab>
                    </a>
                    <a className={ style.link } href={ `#sauce` }>
                        <Tab active={ currentTab === 'sauce' } value={ 'sauce' } onClick={ setCurrentTab }>Соусы</Tab>
                    </a>
                    <a className={ style.link } href={ `#main` }>
                        <Tab active={ currentTab === 'main' } value={ 'main' } onClick={ setCurrentTab }>Начинки</Tab>
                    </a>
                </nav>
            </header>
            {
                ingredientsRequest
                    ? <Loader />
                    : (
                        <section className={ `${ style.ingredientsCategories } mt-10` }
                                 onScroll={ handleScroll }
                                 ref={ wrapperRef }
                        >
                            <BurgerIngredientsCategory
                                key={ 'bun' }
                                title={ 'Булки' }
                                ingredients={ ingredients.filter( (ingredient: TIngredient) => ingredient.type === 'bun' ) }
                                handleOpenModal={ handleOpenModal }
                                sectionId={ 'bun' }
                                customRef={ bunRef }
                            />
                            <BurgerIngredientsCategory
                                key={ 'sauce' }
                                title={ 'Соусы' }
                                ingredients={ ingredients.filter( (ingredient: TIngredient) => ingredient.type === 'sauce' ) }
                                handleOpenModal={ handleOpenModal }
                                sectionId={ 'sauce' }
                                customRef={ sauceRef }
                            />
                            <BurgerIngredientsCategory
                                key={ 'main' }
                                title={ 'Начинки' }
                                ingredients={ ingredients.filter( (ingredient: TIngredient) => ingredient.type === 'main' ) }
                                handleOpenModal={ handleOpenModal }
                                sectionId={ 'main' }
                                customRef={ mainRef }
                            />
                        </section>
                    )
            }
        </section>
    );
}

export default BurgerIngredients;