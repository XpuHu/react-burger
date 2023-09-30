import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import style from './index.module.css';
import { useDispatch } from "react-redux";
import { login } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, handleInputChange } = useForm( {
        email: '',
        password: ''
    } );

    const onSubmit = ( e ) => {
        e.preventDefault();

        dispatch( login( values ) );
        navigate( '/' );
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Вход</p>

            <form onSubmit={ onSubmit }>
                <EmailInput
                    value={ values.email }
                    name={ 'email' }
                    onChange={ handleInputChange }
                    extraClass="mb-6 mt-6"
                />
                <PasswordInput
                    onChange={ handleInputChange }
                    value={ values.password }
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