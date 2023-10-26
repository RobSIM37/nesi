import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import theme from "./theme/theme.js"
import App from './App.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CssBaseline>
    </ThemeProvider>
);