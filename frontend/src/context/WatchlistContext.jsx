// Create new file: src/context/WatchlistContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { getWatchlist } from '../backend/firestore/watchlist';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const { user } = useAuth();

  const updateWatchlist = async () => {
    if (user) {
      const coins = await getWatchlist(user.uid);
      setWatchlistCoins(coins.map(coin => coin.id));
    }
  };

  useEffect(() => {
    updateWatchlist();
  }, [user]);

  return (
    <WatchlistContext.Provider value={{ watchlistCoins, updateWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};