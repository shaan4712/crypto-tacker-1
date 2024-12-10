// src/pages/Watchlist.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Loader from '../components/Common/Loader';
import BackOnTop from '../components/Common/BackOnTop';
import Footer from '../components/Common/Footer';
import { getWatchlist } from '../backend/firestore/watchlist';
import { useAuth } from '../AuthContext';

const Watchlist = () => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    console.log("User state:", user); // Debug log
    if (!user) {
      setIsLoading(false);
      return;
    }
    fetchWatchlist();
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      console.log("Fetching watchlist for user:", user.uid); // Debug log
      const coins = await getWatchlist(user.uid);
      console.log("Fetched coins:", coins); // Debug log
      setWatchlistCoins(coins);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (coinId) => {
    // Immediately update the UI by filtering out the removed coin
    setWatchlistCoins(prev => prev.filter(coin => coin.id !== coinId));
  };

  console.log("Render state:", { isLoading, watchlistCoins }); // Debug log

  if (!user) {
    return (
      <>
        <Header />
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h1>Please Login</h1>
          <p>You need to be logged in to view your watchlist.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BackOnTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ minHeight: '80vh' }}>
          {watchlistCoins.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '60vh',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <h1>No Coins Added</h1>
              <p>Please add coins to your watchlist from the dashboard.</p>
            </div>
          ) : (
            <TabsComponent coins={watchlistCoins} isWatchlist={true} onRemove={handleRemove} />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Watchlist;