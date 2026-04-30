import { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { gameDatabase } from '../structural/firebaseP76';

export const GameReviewContext = createContext();

export function GameReviewProvider({ children }) {
  const [gameReviews, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const querySnapshot = await getDocs(collection(gameDatabase, 'gamereviews'));
      
      const gamesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setGames(gamesData);
    }

    fetchGames();
  }, []);

  return (
    <GameReviewContext.Provider value={{ gameReviews }}>
      {children}
    </GameReviewContext.Provider>
  );
}