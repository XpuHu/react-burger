import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList
    from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import { ingredientsType } from "../../utils/types";
import PropTypes from "prop-types";
import { SelectedIngredientsContext } from "../app/app";
import Modal from "../modal/modal";
import OrderDetails from "./burger-constructor-total/order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOTAL_PRICE } from "../../services/actions/constructor";

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';


const BurgerConstructor = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ hasError, setHasError ] = useState( false );
    // const [ totalPrice, setTotalPrice ] = useState( 0 );
    const { constructorIngredientList, constructorBun, totalPrice } = useSelector( state => state.burgerConstructor );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: SET_TOTAL_PRICE})
    }, [dispatch])


    // const { selectedIngredients } = useContext( SelectedIngredientsContext );

    // const [ bun, setBun ] = useState( {} );
    // const [ otherIngredients, setOtherIngredients ] = useState( [] );

    const [ orderId, setOrderId ] = useState( Math.floor( Math.random() * (99999 - 1) + 1 ) );
    // const [ selectedIds, setSelectedIds ] = useState( [] );

    const [ showModal, setShowModal ] = useState( false );

    // useEffect( () => {
    //
    //     if ( typeof selectedIngredients !== 'undefined' && selectedIngredients.length > 0 ) {
    //
    //         setBun( selectedIngredients.find( ingredient => ingredient.type === 'bun' ) );
    //         setOtherIngredients( selectedIngredients.filter( ingredient => ingredient.type !== 'bun' ) );
    //
    //         setTotalPrice( otherIngredients.reduce( ( sum, ingredient ) => sum + ingredient.price, 0 ) + bun.price * 2 );
    //         setSelectedIds( [ ...selectedIngredients.map( ingredient => ingredient._id ) ] );
    //
    //         setIsLoading( false );
    //     }
    // }, [ selectedIngredients ] );


    // const handleMakeOrder = useCallback( async () => {
    //     setHasError( false );
    //
    //     try {
    //         const response = await fetch( ORDER_URL, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify( {
    //                 'ingredients': selectedIds
    //             } )
    //         } );
    //
    //         if ( !response.ok ) {
    //             throw new Error( `Ошибка ${ response.status }` );
    //         }
    //
    //         const body = await response.json();
    //         setOrderId( body.order.number );
    //
    //     } catch (e) {
    //         console.log( 'Произошла ошибка: ', e );
    //         setHasError( true );
    //
    //     } finally {
    //         setShowModal( true );
    //     }
    // }, [ selectedIds ] );

    const handleCloseModal = () => {
        setShowModal( false );
    };

    // id заказа всегда 6 цифр, если цифр меньше - в начале пишутся нули
    const transformOrderId = ( orderId ) => String( orderId ).padStart( 6, '0' );

    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>
            {
                constructorIngredientList.length !== 0 || constructorBun
                    ? <>
                        <BurgerConstructorList />
                        <BurgerConstructorTotal totalPrice={ totalPrice } onButtonClick={ () => {
                        } }
                        />
                    </>
                    : null
            }

            { showModal && (
                <Modal header={ '' } handleClose={ handleCloseModal }>
                    <OrderDetails orderId={ transformOrderId( orderId ) } />
                </Modal>
            ) }
        </section>
    );
};

BurgerConstructor.propTypes = {
    selectedIngredients: ingredientsType.ingredients
};

export default BurgerConstructor;