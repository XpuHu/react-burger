import style from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {

    return (
        <div className={ style.wrapper }>
            <nav className={ `${ style.column } ${ style.menu } mr-15` }>

                <NavLink to={ '/profile' }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    Профиль
                </NavLink>

                <NavLink to={ '/profile/orders' }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    История заказов
                </NavLink>

                <NavLink to={ '/profile/orders' }
                         className={ ( { isActive } ) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
                >
                    Выход
                </NavLink>

                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </nav>

            <div className={ style.column }>
                <Input
                    type={ 'text' }
                    placeholder={ 'Имя' }
                    onChange={ e => {
                    } }
                    icon={ 'EditIcon' }
                    value={ '' }
                    name={ 'firstName' }
                    error={ false }
                    ref={ null }
                    onIconClick={ () => {
                    } }
                    errorText={ 'Ошибка' }
                    size={ 'default' }
                    disabled={ true }
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={ () => {
                    } }
                    value={ '' }
                    name={ 'email' }
                    placeholder="Логин"
                    isIcon={ true }
                    disabled={ true }
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={ () => {
                    } }
                    value={ '' }
                    name={ 'password' }
                    icon="EditIcon"
                    disabled={ true }
                />
            </div>
        </div>
    );
};