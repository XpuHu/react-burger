import './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
    ConstructorPage,
    FeedPage,
    IngredientPage,
    LoginPage,
    NotFoundPage,
    PasswordForgotPage,
    PasswordResetPage,
    ProfilePage,
    RegisterPage
} from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/burger-ingredient/ingredient-details/ingredient-details';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { checkAuth } from '../../services/actions/auth';
import { UserOrdersPage } from '../../pages/user-orders/user-orders';
import { useDispatch } from '../../hooks/hooks';
import { OrderInfo } from '../order-info/order-info';
import { OrderPage } from '../../pages/order/order';


function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const prevLocation = location.state?.prevLocation;

    // Получаем все ингредиенты с сервера
    useEffect( () => {
        dispatch( getIngredients() );
        dispatch( checkAuth() );
    }, [] );

    return (
        <>
            <AppHeader />

            <main className={ `text text_type_main-default` }>
                <Routes location={ prevLocation || location }>
                    <Route path='/' element={ <ConstructorPage /> } />

                    <Route path='/login' element={ <ProtectedRoute element={ <LoginPage /> } /> } />
                    <Route path='/register' element={ <ProtectedRoute element={ <RegisterPage /> } /> } />
                    <Route path='/forgot-password' element={ <ProtectedRoute element={ <PasswordForgotPage /> } /> } />
                    <Route path='/reset-password' element={ <ProtectedRoute element={ <PasswordResetPage /> } /> } />

                    <Route path='/profile'
                           element={ <ProtectedRoute element={ <ProfilePage /> } forAuthorized={ true } /> }
                    />
                    <Route path='/profile/orders'
                           element={ <ProtectedRoute element={ <UserOrdersPage /> } forAuthorized={ true } /> }
                    />
                    <Route path='/profile/orders/:id'
                           element={ <ProtectedRoute element={ <OrderPage /> } forAuthorized={ true } /> }
                    />

                    <Route path='/feed' element={ <FeedPage /> } />
                    <Route path='/feed/:id' element={ <OrderPage /> } />

                    <Route path='/ingredients/:id' element={ <IngredientPage /> } />

                    <Route path='*' element={ <NotFoundPage /> } />
                </Routes>
                {
                    prevLocation && (
                        <Routes>
                            <Route path='/ingredients/:id' element={
                                <Modal handleClose={ () => navigate( '/' ) }>
                                    <IngredientDetails />
                                </Modal>
                            }
                            />

                            <Route path='/profile/orders/:id' element={
                                <Modal handleClose={ () => navigate( '/profile/orders' ) }>
                                    <OrderInfo />
                                </Modal>
                            }
                            />

                            <Route path='/feed/:id' element={
                                <Modal handleClose={ () => navigate( '/feed' ) }>
                                    <OrderInfo />
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
