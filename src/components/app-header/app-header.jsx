import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './app-header.module.css';
import { NavLink } from "react-router-dom";

function AppHeader() {
    return (
        <header className={ style.header }>

            <nav className={ `${ style.mainMenu } text text_type_main-default p-4` }>

                <nav className={ `${ style.secondaryMenu } ` }>

                    <NavLink to={ '/' } className={ ( { isActive } ) => `${ style.menuItem } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } pl-5 pr-5 pt-4 pb-4` }
                    >
                        { ( { isActive } ) => (
                            <>
                                <BurgerIcon type={ isActive ? 'primary' : 'secondary' } />
                                <span className={ 'ml-2' }>Конструктор</span>
                            </>
                        ) }
                    </NavLink>

                    <NavLink to={ '/orders' } className={ ( { isActive } ) => `${ style.menuItem } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } ml-2 pl-5 pr-5 pt-4 pb-4` }
                    >
                        { ( { isActive } ) => (
                            <>
                                <ListIcon type={ isActive ? 'primary' : 'secondary' } />
                                <span className={ 'ml-2' }>Лента заказов</span>
                            </>
                        ) }
                    </NavLink>
                </nav>

                <NavLink to={ '/' } className={ `${ style.logo } mt-2 mb-2` }>
                    <Logo />
                </NavLink>

                <NavLink to={ '/profile' } className={ ( { isActive } ) => `${ style.menuItem } 
                         ${ isActive ? 'text_color_primary' : 'text_color_inactive' } pl-5 pr-5 pt-4 pb-4` }
                >
                    { ( { isActive } ) => (
                        <>
                            <ProfileIcon type={ isActive ? 'primary' : 'secondary' } />
                            <span className={ 'ml-2' }>Личный кабинет</span>
                        </>
                    ) }
                </NavLink>
            </nav>

        </header>
    );
}

export default AppHeader;