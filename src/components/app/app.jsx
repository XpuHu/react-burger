import React from 'react';
import AppHeader from "../app-header/app-header";
import './app.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    ConstructorPage,
    IngredientPage,
    LoginPage,
    NotFoundPage,
    PasswordForgotPage,
    PasswordResetPage,
    ProfilePage,
    RegisterPage
} from "../../pages";
import { ProtectedRoute } from "../protected-route/protected-route";

function App() {
    return (
        <BrowserRouter>
            <AppHeader />

            <main className={ `text text_type_main-default` }>
                <Routes>
                    <Route path="/" element={ <ConstructorPage /> } />

                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    <Route path="/forgot-password" element={ <PasswordForgotPage /> } />
                    <Route path="/reset-password" element={ <PasswordResetPage /> } />

                    <Route path="/profile" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />
                    <Route path="/profile/orders" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />
                    <Route path="/profile/orders/:id" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />

                    <Route path="/ingredients/:id" element={ <IngredientPage /> } />

                    <Route path="/not-found" element={ <NotFoundPage /> } />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
