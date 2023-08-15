import React, { useEffect, useState } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import { ingredientsType } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "./burger-constructor-total/order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_IDS, SET_TOTAL_PRICE } from "../../services/actions/constructor";

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';


const BurgerConstructor = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ hasError, setHasError ] = useState( false );
    // const [ totalPrice, setTotalPrice ] = useState( 0 );
    const { constructorIngredientList, constructorBun } = useSelector( state => state.burgerConstructor );
    const { orderId } = useSelector( state => state.order );

    const dispatch = useDispatch();


    useEffect( () => {
        dispatch( { type: SET_TOTAL_PRICE } );
        if ( constructorBun ) {
            dispatch( { type: SET_SELECTED_IDS } );
        }
    }, [ dispatch, constructorIngredientList, constructorBun ] );


    // const { selectedIngredients } = useContext( SelectedIngredientsContext );

    // const [ bun, setBun ] = useState( {} );
    // const [ otherIngredients, setOtherIngredients ] = useState( [] );

    // const [ orderId, setOrderId ] = useState( Math.floor( Math.random() * (99999 - 1) + 1 ) );
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

    // useEffect(() => {
    //     setSelectedIds([...constructorIngredientList.map(ingredient => ingredient._id )])
    // }, [constructorIngredientList])


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

    const handleOpenModal = () => {
        // Заглушка пока не разберусь почему запрос фейлится
        dispatch( { type: 'SET_ORDER_ID', id: Math.floor( Math.random() * (99999 - 1) + 1 ) } );

        // dispatch( getOrderId() );
        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    // id заказа всегда 6 цифр, если цифр меньше - в начале пишутся нули
    const transformOrderId = ( orderId ) => orderId ? String( orderId ).padStart( 6, '0' ) : String( '' ).padStart( 6, '0' );


    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>
            {/*{ constructorIngredientList.length !== 0 || constructorBun !== null*/ }
            {/*    ? <>*/ }
            {/*        < BurgerConstructorList />*/ }
            {/*        <BurgerConstructorTotal handleClick={ handleOpenModal } />*/ }
            {/*    </>*/ }
            {/*    : 'Перетащите желаемые ингредиенты'*/ }
            {/*}*/ }

            < BurgerConstructorList />
            { constructorIngredientList.length !== 0 || constructorBun !== null
                ? <BurgerConstructorTotal handleClick={ handleOpenModal } />
                : 'Перетащите желаемые ингредиенты'
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