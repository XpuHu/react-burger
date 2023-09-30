import style from "./profile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, updateUser } from "../services/actions/auth";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector( state => state.auth );
    const [ data, setData ] = useState( {
        firstName: user.name,
        email: user.email,
        password: ''
    } );

    const [ isDisabledFields, setIsDisabledFields ] = useState( {
        firstName: true,
        email: true,
        password: true
    } );

    const [ isDataChanged, setIsDataChanged ] = useState( false );

    useEffect( () => {
        dispatch( getUser() );
    }, [ dispatch ] );

    const onChange = e => {
        setData( { ...data, [e.target.name]: e.target.value } );
        setIsDataChanged( true );
    };

    const onIconClick = ( fieldName ) => {
        setIsDisabledFields( { ...isDisabledFields, [fieldName]: !isDisabledFields[fieldName] } );
    };

    const onLogout = () => {
        dispatch( logout() );
        navigate( '/login' );
    };

    const onSubmit = ( e ) => {
        e.preventDefault();

        dispatch( updateUser( data ) );
        setIsDisabledFields( {
            firstName: true,
            email: true,
            password: true
        } );
        setIsDataChanged( false );
    };

    const resetData = () => {
        setData( {
            firstName: user.name,
            email: user.email,
            password: ''
        } );
        setIsDisabledFields( {
            firstName: true,
            email: true,
            password: true
        } );
        setIsDataChanged( false );
    };

    return (
        <div className={ style.wrapper }>
            <nav className={ `${ style.column } ${ style.menu } mr-15` }>

                <NavLink to={ '/profile' }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    Профиль
                </NavLink>

                <NavLink to={ '/profile/orders' }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    История заказов
                </NavLink>

                <NavLink to={ '/login' } onClick={ onLogout }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    Выход
                </NavLink>

                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </nav>

            <div className={ style.column }>
                <form onSubmit={ onSubmit }>
                    <Input
                        type={ 'text' }
                        placeholder={ 'Имя' }
                        onChange={ ( e ) => onChange( e ) }
                        icon={ 'EditIcon' }
                        value={ data.firstName }
                        name={ 'firstName' }
                        error={ false }
                        ref={ null }
                        onIconClick={ () => onIconClick( 'firstName' ) }
                        errorText={ 'Ошибка' }
                        size={ 'default' }
                        disabled={ isDisabledFields['firstName'] }
                        extraClass="mb-6"
                    />
                    <EmailInput
                        onChange={ ( e ) => onChange( e ) }
                        value={ data.email }
                        name={ 'email' }
                        placeholder="Логин"
                        isIcon={ true }
                        disabled={ isDisabledFields['email'] }
                        onIconClick={ () => onIconClick( 'email' ) }
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={ ( e ) => onChange( e ) }
                        value={ data.password }
                        name={ 'password' }
                        icon="EditIcon"
                        disabled={ isDisabledFields['password'] }
                        onIconClick={ () => onIconClick( 'password' ) }
                    />

                    {
                        isDataChanged && (
                            <div className={ `${ style.submit } mt-6` }>
                                <Button htmlType="button" type="secondary" size="medium" onClick={ resetData }
                                >
                                    Отмена
                                </Button>
                                <Button htmlType="submit" type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    );
};