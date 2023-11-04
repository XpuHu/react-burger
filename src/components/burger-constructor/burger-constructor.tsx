import React, { useEffect } from 'react';
import style from './burger-constructor.module.css';
import BurgerConstructorList from './burger-constructor-list/burger-constructor-list';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import Modal from '../modal/modal';
import OrderDetails from './burger-constructor-total/order-details/order-details';
import { getOrderId } from '../../services/actions/order';
import { useModal } from '../../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';
import { SET_TOTAL_PRICE } from '../../services/constants/constructor';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getOrderData, getUserAuth } from '../../services/selectors';

const BurgerConstructor = () => {
    const { constructorIngredientList, constructorBun } = useSelector( state => state.burgerConstructor )
    const data = useSelector( getOrderData );
    const isAuthorized = useSelector( getUserAuth );

    const { showModal, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        dispatch( { type: SET_TOTAL_PRICE } );
    }, [ constructorIngredientList, constructorBun, dispatch ] );

    useEffect( () => {
        if ( showModal && constructorBun ) {
            const orderIngredientsIds: Array<string> = [ constructorBun._id, ...constructorIngredientList.map( (ingredient: TIngredient) => ingredient._id ), constructorBun._id ];

            isAuthorized ? dispatch( getOrderId( orderIngredientsIds ) ) : navigate( '/login', { replace: true } );
        }
    }, [ showModal ] );

    // id заказа всегда 6 цифр, если цифр меньше - в начале пишутся нули
    const transformOrderId = (orderId: number | null) => orderId ? String( orderId ).padStart( 6, '0' ) : String( '' ).padStart( 6, '0' );

    return (
        <section className={ `${ style.burgerConstructor } pt-25 pl-4` }>
            < BurgerConstructorList />
            { constructorIngredientList.length !== 0 || constructorBun !== null
                ? <BurgerConstructorTotal handleClick={ openModal } />
                : null
            }

            { showModal && (
                <Modal handleClose={ closeModal }>
                    <OrderDetails orderId={ transformOrderId( data ? data.number : null ) } />
                </Modal>
            ) }
        </section>
    );
};

export default BurgerConstructor;