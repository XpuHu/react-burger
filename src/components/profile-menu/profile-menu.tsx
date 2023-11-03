import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import { logout } from '../../services/actions/auth';
import { useDispatch } from '../../hooks/hooks';
import style from './profile-menu.module.css'

export const ProfileMenu = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const onLogout = () => {
        dispatch( logout() );
    };

    return (
        <nav className={ `${ style.menu } mr-15` }>
            <NavLink to={ '/profile' }
                     className={ ({ isActive }) => `${ style.profileLink }
                    ${ isActive && pathname === '/profile' ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
            >
                Профиль
            </NavLink>

            <NavLink to={ '/profile/orders' }
                     className={ ({ isActive }) => `${ style.profileLink }
                    ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
            >
                История заказов
            </NavLink>

            <NavLink to={ '/login' } onClick={ onLogout }
                     className={ ({ isActive }) => `${ style.profileLink } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } text text_type_main-medium ` }
            >
                Выход
            </NavLink>

            <p className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете
                изменить свои персональные данные</p>
        </nav>
    )
}