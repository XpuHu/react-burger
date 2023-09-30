import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import style from './index.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../services/actions/auth";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ data, setData ] = useState( {
        email: '',
        password: ''
    } );

    const { user } = useSelector( state => state.auth );
    useEffect( () => {
        if ( user ) {
            navigate( '/' );
        }
    }, [ user, navigate ] );

    const onChange = e => {
        setData( { ...data, [e.target.name]: e.target.value } );
    };

    const onSubmit = () => {
        dispatch( login( data ) );
        navigate( '/' );
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Вход</p>

            <form onSubmit={ onSubmit }>
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

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                    Войти
                </Button>
            </form>


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