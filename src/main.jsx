import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CssBaseline from '@mui/material/CssBaseline';

import './index.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.js';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </>
);
