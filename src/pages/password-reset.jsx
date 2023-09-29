import style from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../utils/api";
import { useSelector } from "react-redux";

export const PasswordResetPage = () => {

    const [ data, setData ] = useState( {
        password: '',
        token: ''
    } );

    const { isAuthorized } = useSelector( state => state.auth );

    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () => {
        if ( !location.state ) {
            navigate( "/forgot-password", { replace: true } );
        }

    }, [ navigate, location.state ] );

    if ( isAuthorized ) {
        navigate( '/' );
    }

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

            navigate( '/login' )
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