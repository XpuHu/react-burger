import style from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../utils/api";

export const PasswordResetPage = () => {

    const [ data, setData ] = useState( {
        password: '',
        token: ''
    } );
    const navigate = useNavigate();

    const onChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        setData( { ...data, [field]: value } );
    };

    const resetPassword = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( data )
            };

            await request( 'password-reset/reset', options );

            // navigate( '/reset-password' );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
        }
    };

    const onClick = () => {
        resetPassword();
    };

    return (
        <div className={ style.wrapper }>
            <p className="text text_type_main-medium">Восстановление пароля</p>

            <PasswordInput
                placeholder={ 'Введите новый пароль' }
                onChange={ ( e ) => onChange( e ) }
                value={ data.password }
                name={ 'password' }
                extraClass="mt-6 mb-6"
            />

            <Input
                type={ 'text' }
                placeholder={ 'Введите код из письма' }
                onChange={ ( e ) => onChange( e ) }
                value={ data.token }
                name={ 'token' }
                error={ false }
                errorText={ 'Ошибка' }
                size={ 'default' }
                extraClass="mb-6"
            />

            <Button htmlType="button" type="primary" size="large" extraClass="mb-20" onClick={ onClick }>
                Сохранить
            </Button>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};