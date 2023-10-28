import style from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { checkAuth, logout, updateUser } from "../services/actions/auth";
import { TUserData } from "../services/types/data";
import { useDispatch, useSelector } from "../hooks/hooks";

type TFields = {
    [name: string]: boolean
}

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth );
    const [ data, setData ] = useState<TUserData>( {
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: user?.password ?? ''
    } );

    const [ isDisabledFields, setIsDisabledFields ] = useState<TFields>( {
        name: true,
        email: true,
        password: true
    } );

    const [ isDataChanged, setIsDataChanged ] = useState<boolean>( false );

    useEffect( () => {

        dispatch( checkAuth() );
    }, [ dispatch ] );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData( { ...data, [e.target.name]: e.target.value } );
        setIsDataChanged( true );
    };

    const onIconClick = (fieldName: string) => {
        setIsDisabledFields( { ...isDisabledFields, [fieldName]: !isDisabledFields[fieldName] } );
    };

    const onLogout = () => {

        dispatch( logout() );
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        dispatch( updateUser( data ) );
        setIsDisabledFields( {
            name: true,
            email: true,
            password: true
        } );
        setIsDataChanged( false );
    };

    const resetData = () => {
        setData( {
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: user?.password ?? ''
        } );
        setIsDisabledFields( {
            name: true,
            email: true,
            password: true
        } );
        setIsDataChanged( false );
    };

    return (
        <div className={ style.wrapper }>
            <nav className={ `${ style.column } ${ style.menu } mr-15` }>

                <NavLink to={ '/profile' }
                         className={ ({ isActive }) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    Профиль
                </NavLink>

                <NavLink to={ '/profile/orders' }
                         className={ ({ isActive }) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    История заказов
                </NavLink>

                <NavLink to={ '/login' } onClick={ onLogout }
                         className={ ({ isActive }) => `${ style.profileLink } 
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
                        onChange={ onChange }
                        icon={ 'EditIcon' }
                        value={ data.name }
                        name={ 'name' }
                        onIconClick={ () => onIconClick( 'name' ) }
                        errorText={ 'Ошибка' }
                        size={ 'default' }
                        disabled={ isDisabledFields['name'] }
                        extraClass="mb-6"
                    />
                    <Input
                        type={ 'text' }
                        placeholder={ 'Логин' }
                        onChange={ onChange }
                        icon={ 'EditIcon' }
                        value={ data.email }
                        name={ 'email' }
                        onIconClick={ () => onIconClick( 'email' ) }
                        errorText={ 'Ошибка' }
                        size={ 'default' }
                        disabled={ isDisabledFields['email'] }
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={ onChange }
                        value={ data.password }
                        name={ 'password' }
                        icon="EditIcon"
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