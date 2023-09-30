import style from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { request } from "../utils/api";
import { useForm } from "../hooks/useForm";

export const PasswordResetPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { values, handleInputChange } = useForm( {
        password: '',
        token: ''
    } );

    useEffect( () => {
        if ( !location.state ) {
            navigate( "/forgot-password", { replace: true } );
        }

    }, [ navigate, location.state ] );

    const resetPassword = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( values )
            };

            await request( 'password-reset/reset', options );

            navigate( '/login' );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
        }
    };

    const onSubmit = ( e ) => {
        e.preventDefault();
        resetPassword();
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Восстановление пароля</p>

            <form onSubmit={ onSubmit }>
                <PasswordInput
                    placeholder={ 'Введите новый пароль' }
                    onChange={ handleInputChange }
                    value={ values.password }
                    name={ 'password' }
                    extraClass="mt-6 mb-6"
                />

                <Input
                    type={ 'text' }
                    placeholder={ 'Введите код из письма' }
                    onChange={ handleInputChange }
                    value={ values.token }
                    name={ 'token' }
                    error={ false }
                    errorText={ 'Ошибка' }
                    size={ 'default' }
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                    Сохранить
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};