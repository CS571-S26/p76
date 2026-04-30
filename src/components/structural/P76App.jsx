import { useState, useEffect, useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';

import { GameReviewProvider, GameReviewContext } from '../contexts/GameReviewsContext'
import P76Layout from './P76Layout';
import P76Home from '../content/P76Home';
import GameHistory from '../content/GameHistory';
import GameRecommendations from '../content/GameRecommendations';
import P76NoMatch from '../content/P76NoMatch';
import DemoShowcase from '../demoStuff/DemoShowcase';
import { gameDatabase } from './firebaseP76';
import IndividualGamePage from '../content/IndividualGamePage';


function P76App() {
    const { gameReviews } = useContext(GameReviewContext);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<P76Layout />}>
          <Route index element={<P76Home />} />
          <Route path="history" element={<GameHistory />}></Route>
          <Route path="recommendation" element={<GameRecommendations />}></Route>
          <Route path="demoShowcase" element={<DemoShowcase />}></Route>
          <Route path="review/:gameId" element={<IndividualGamePage />}></Route>
          <Route path="*" element={<P76NoMatch />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default P76App
