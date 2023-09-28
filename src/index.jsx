import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { initialState, rootReducer } from './services/reducers';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BrowserRouter } from "react-router-dom";

export const store = configureStore( {
    reducer: rootReducer,
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( thunk ),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
} );

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <DndProvider backend={ HTML5Backend }>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </DndProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
