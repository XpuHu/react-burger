import style from "./index.module.css";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { request } from "../utils/api";
import { useForm } from "../hooks/useForm";
import { TForm } from "../services/types/data";

export const PasswordForgotPage = () => {
    const [ btnDisabled, setBtnDisabled ] = useState<boolean>( true );
    const navigate = useNavigate();

    const { values, handleInputChange } = useForm<TForm>( {
        email: ''
    } );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleInputChange( e );
        setBtnDisabled( false );
    };

    const resetPassword = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "email": values.email
                } )
            };

            await request( 'password-reset', options );

            navigate( '/reset-password', { replace: true, state: { from: 'forgot-password' } } );
        } catch (e) {
            console.log( 'Произошла ошибка: ', e );
        }
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword();
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Восстановление пароля</p>

            <form onSubmit={ onSubmit }>
                <EmailInput
                    placeholder={ 'Укажите e-mail' }
                    onChange={ handleChange }
                    value={ values.email }
                    name={ 'email' }
                    isIcon={ false }
                    extraClass="mt-6 mb-6"
                />

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={ btnDisabled }>
                    Восстановить
                </Button>
            </form>


            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};