import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import style from './index.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../services/actions/auth";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ data, setData ] = useState( {
        email: 'xpuhu@yandex.ru',
        password: 'testtest'
    } );

    const { isAuthorized } = useSelector( state => state.auth );
    if ( isAuthorized ) {
        navigate( '/', { replace: true, state: { from: 'login' } } );
    }

    const onChange = e => {
        setData( { ...data, [e.target.name]: e.target.value } );
    };

    const onClickHandler = () => {
        dispatch( login( data ) );
        navigate( '/', { replace: true, state: { from: 'login' } } );
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Вход</p>

            <EmailInput
                value={ data.email }
                name={ 'email' }
                onChange={ ( e ) => onChange( e ) }
                extraClass="mb-6 mt-6"
            />
            <PasswordInput
                onChange={ ( e ) => onChange( e ) }
                value={ data.password }
                name={ 'password' }
                extraClass="mb-6"
            />

            <Button htmlType="button" type="primary" size="large" extraClass="mb-20" onClick={ onClickHandler }>
                Войти
            </Button>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вы — новый пользователь?&nbsp;
                <NavLink to={ '/register' } className={ style.link }>Зарегистрироваться</NavLink>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
                <NavLink to={ '/forgot-password' } className={ style.link }>Восстановить пароль</NavLink>
            </p>
        </div>
    );
};