import React from 'react';
import ReactDom, { createRoot } from 'react-dom/client';
import P76App from './components/structural/P76App';
import { HashRouter, } from 'react-router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameReviewProvider } from './components/contexts/GameReviewsContext';
import { ReviewUsernameProvider } from "./components/contexts/ReviewUsernameContext";

createRoot(document.getElementById('root')).render(
    <GameReviewProvider>
    <ReviewUsernameProvider>
        <P76App />
    </ReviewUsernameProvider>
    </GameReviewProvider>
)
