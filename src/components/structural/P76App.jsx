import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router';

import P76Layout from './P76Layout';
import P76Home from '../content/P76Home';
import GameHistory from '../content/GameHistory';
import GameRecommendations from '../content/GameRecommendations';
import P76NoMatch from '../content/P76NoMatch';
import DemoShowcase from '../demoStuff/DemoShowcase';

function P76App() {
  const [gamePages, setGamePages] = useState([])

  //Set a use effect to get games from API (not made yet).

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<P76Layout />}>
          <Route index element={<P76Home />} />
          <Route path="history" element={<GameHistory />}></Route>
          <Route path="recommendation" element={<GameRecommendations />}></Route>
          <Route path="demoShowcase" element={<DemoShowcase />}></Route>
          {/* Add routes for game pages later */}
          <Route path="*" element={<P76NoMatch />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default P76App
