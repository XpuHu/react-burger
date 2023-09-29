import style from "./index.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../services/actions/auth";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ data, setData ] = useState( {
        firstName: '',
        email: '',
        password: ''
    } );

    const { isAuthorized } = useSelector( state => state.auth );
    if ( isAuthorized ) {
        navigate( '/', { replace: true, state: { from: 'register' } } );
    }

    const onChange = e => {
        setData( { ...data, [e.target.name]: e.target.value } );
    };

    const onClickHandler = () => {
        dispatch( register( data ) );
        navigate( '/login', { replace: true, state: { from: 'register' } } );
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Регистрация</p>

            <Input
                type={ 'text' }
                placeholder={ 'Имя' }
                onChange={ ( e ) => onChange( e ) }
                value={ data.firstName }
                name={ 'firstName' }
                error={ false }
                errorText={ 'Ошибка' }
                size={ 'default' }
                extraClass="mt-6 mb-6"
            />
            <EmailInput
                placeholder={ 'E-mail' }
                onChange={ ( e ) => onChange( e ) }
                value={ data.email }
                name={ 'email' }
                isIcon={ false }
                extraClass="mb-6"
            />
            <PasswordInput
                placeholder={ 'Пароль' }
                onChange={ ( e ) => onChange( e ) }
                value={ data.password }
                name={ 'password' }
                extraClass="mb-6"
            />

            <Button htmlType="button" type="primary" size="large" extraClass="mb-20" onClick={ onClickHandler }>
                Зарегистрироваться
            </Button>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};