import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './app-header.module.css'

function AppHeader() {
    return (
        <header className={style.header}>

            <nav className={`${style.mainMenu} text text_type_main-default p-4`}>

                <nav className={`${style.secondaryMenu} `}>
                    <a className={`${style.menuItem} pl-5 pr-5 pt-4 pb-4`}>
                        <BurgerIcon type="primary"/>
                        <span className={'ml-2'}>Конструктор</span>
                    </a>
                    <a className={`${style.menuItem} text_color_inactive ml-2 pl-5 pr-5 pt-4 pb-4`}>
                        <ListIcon type="secondary"/>
                        <span className={'ml-2'}>Лента заказов</span>
                    </a>
                </nav>

                <div className={`${style.logo} mt-2 mb-2`}>
                    <Logo/>
                </div>

                <a className={`${style.menuItem} ${style.profile} text_color_inactive pl-5 pr-5 pt-4 pb-4`}>
                    <ProfileIcon type="secondary"/>
                    <span className={'ml-2'}>Личный кабинет</span>
                </a>

            </nav>

        </header>
    );
}

export default AppHeader;