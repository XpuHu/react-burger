import style from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../utils/api";

export const PasswordResetPage = () => {

    const [ data, setData ] = useState( {
        password: '',
        token: ''
    } );

    // const { isAuthorized } = useSelector( state => state.auth );

    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () => {
        if ( !location.state ) {
            navigate( "/forgot-password", { replace: true } );
        }

    }, [ navigate, location.state ] );

    const onChange = e => {
        setData( { ...data, [e.target.name]: e.target.value } );
    };

    const resetPassword = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( data )
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