import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "./services/store";

const root = createRoot( document.getElementById( 'root' )! )
root.render(
    <Provider store={ store }>
        <DndProvider backend={ HTML5Backend }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DndProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
