import React, { useEffect, useState } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import BurgerConstructorTotal from "./burger-constructor-total/burger-constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "./burger-constructor-total/order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOTAL_PRICE } from "../../services/actions/constructor";
import { getOrderId } from "../../services/actions/order";

const BurgerConstructor = () => {
    const { constructorIngredientList, constructorBun } = useSelector( state => state.burgerConstructor );
    const { number } = useSelector( state => state.order.data );
    const [ showModal, setShowModal ] = useState( false );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( { type: SET_TOTAL_PRICE } );
    }, [ dispatch, constructorIngredientList, constructorBun ] );

    const handleOpenModal = () => {
        const orderIngredientsIds = [ constructorBun._id, ...constructorIngredientList.map( ingredient => ingredient._id ), constructorBun._id ];
        dispatch( getOrderId( orderIngredientsIds ) );
        setShowModal( true );
    };

    const handleCloseModal = () => {
        setShowModal( false );
    };

    // id заказа всегда 6 цифр, если цифр меньше - в начале пишутся нули
    const transformOrderId = ( orderId ) => orderId ? String( orderId ).padStart( 6, '0' ) : String( '' ).padStart( 6, '0' );

    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>
            < BurgerConstructorList />
            { constructorIngredientList.length !== 0 || constructorBun !== null
                ? <BurgerConstructorTotal handleClick={ handleOpenModal } />
                : null
            }

            { showModal && (
                <Modal header={ '' } handleClose={ handleCloseModal }>
                    <OrderDetails orderId={ transformOrderId( number ) } />
                </Modal>
            ) }
        </section>
    );
};

export default BurgerConstructor;