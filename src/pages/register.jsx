import style from "./index.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const RegisterPage = () => {
    const { user } = useSelector( state => state.auth );
    if ( user ) {
        return (
            <Navigate to={ '/' } />
        );
    }
    
    return (
        <div className={ `${ style.wrapper } ${ style.column }` }>
            <p className="text text_type_main-medium">Регистрация</p>
            <Input
                type={ 'text' }
                placeholder={ 'Имя' }
                onChange={ () => {
                } }
                value={ '' }
                name={ 'firstName' }
                error={ false }
                errorText={ 'Ошибка' }
                size={ 'default' }
                extraClass="mt-6 mb-6"
            />
            <EmailInput
                placeholder={ 'E-mail' }
                onChange={ () => {
                } }
                value={ '' }
                name={ 'email' }
                isIcon={ false }
                extraClass="mb-6"
            />
            <PasswordInput
                placeholder={ 'Пароль' }
                onChange={ () => {
                } }
                value={ '' }
                name={ 'password' }
                extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы?&nbsp;
                <NavLink to={ '/login' } className={ style.link }>Войти</NavLink>
            </p>
        </div>
    );
};