import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import style from './index.module.css';

export const LoginPage = () => {
    return (
        <div className={ style.wrapper }>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput value={ '' } name={ 'email' }
                        onChange={ () => {
                        } }
                        extraClass="mb-6 mt-6"
            />
            <PasswordInput
                onChange={ () => {
                } }
                value={ '' }
                name={ 'password' }
                extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
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