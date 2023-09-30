import style from "./index.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, handleInputChange } = useForm( {
        firstName: '',
        email: '',
        password: ''
    } );

    const onSubmit = ( e ) => {
        e.preventDefault();

        dispatch( register( values ) );
        navigate( '/login', { replace: true, state: { from: 'register' } } );
    };

    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Регистрация</p>

            <form onSubmit={ onSubmit }>
                <Input
                    type={ 'text' }
                    placeholder={ 'Имя' }
                    onChange={ handleInputChange }
                    value={ values.firstName }
                    name={ 'firstName' }
                    error={ false }
                    errorText={ 'Ошибка' }
                    size={ 'default' }
                    extraClass="mt-6 mb-6"
                />
                <EmailInput
                    placeholder={ 'E-mail' }
                    onChange={ handleInputChange }
                    value={ values.email }
                    name={ 'email' }
                    isIcon={ false }
                    extraClass="mb-6"
                />
                <PasswordInput
                    placeholder={ 'Пароль' }
                    onChange={ handleInputChange }
                    value={ values.password }
                    name={ 'password' }
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                    Зарегистрироваться
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};