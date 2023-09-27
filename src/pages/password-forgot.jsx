import style from "./index.module.css";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../utils/api";
import { useSelector } from "react-redux";

export const PasswordForgotPage = () => {
    const [ value, setValue ] = useState( 'xpuhu@yandex.ru' );
    const navigate = useNavigate();
    const { user } = useSelector( state => state.auth );

    if ( user ) {
        return (
            <Navigate to={ '/' } />
        );
    }

    const onChange = e => {
        setValue( e.target.value );
    };

    const resetPassword = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {
                    "email": value
                } )
            };

            await request( 'password-reset', options );

            navigate( '/reset-password', { replace: true, state: { from: 'forgot-password' } } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
        }
    };

    const onClick = () => {
        resetPassword();
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Восстановление пароля</p>

            <EmailInput
                placeholder={ 'Укажите e-mail' }
                onChange={ ( e ) => onChange( e ) }
                value={ value }
                name={ 'email' }
                isIcon={ false }
                extraClass="mt-6 mb-6"
            />

            <Button htmlType="button" type="primary" size="large" extraClass="mb-20" onClick={ onClick }>
                Восстановить
            </Button>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};