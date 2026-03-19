import React from 'react';
import ReactDom, { createRoot } from 'react-dom/client';
import P76App from './components/structural/P76App';
import { HashRouter, } from 'react-router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <HashRouter>
        <P76App />
    </HashRouter>
)
