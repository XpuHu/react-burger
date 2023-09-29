import './app.module.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
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
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/burger-ingredient/ingredient-details/ingredient-details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUser } from "../../services/actions/auth";


function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const prevLocation = location.state?.prevLocation;

    // Получаем все ингредиенты с сервера
    useEffect( () => {
        dispatch( getIngredients() );
        dispatch( getUser() );
    }, [] );

    return (
        <>
            <AppHeader />

            <main className={ `text text_type_main-default` }>
                <Routes location={ prevLocation || location }>
                    <Route path="/" element={ <ConstructorPage /> } />

                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    <Route path="/forgot-password" element={ <PasswordForgotPage /> } />
                    <Route path="/reset-password" element={ <PasswordResetPage /> } />

                    <Route path="/profile" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />
                    <Route path="/profile/orders" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />
                    <Route path="/profile/orders/:id" element={ <ProtectedRoute element={ <ProfilePage /> } /> } />

                    <Route path="/ingredients/:id" element={ <IngredientPage /> } />

                    <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
                {
                    prevLocation && (
                        <Routes>
                            <Route path="/ingredients/:id" element={
                                <Modal handleClose={ () => navigate( '/' ) }>
                                    <IngredientDetails />
                                </Modal>
                            }
                            />
                        </Routes>
                    )
                }

            </main>
        </>
    );
}

export default App;
