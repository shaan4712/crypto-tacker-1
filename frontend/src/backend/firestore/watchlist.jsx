import { db } from '../../firebase';
import { 
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

// Add coin to watchlist
export const addToWatchlist = async (userId, coin) => {
  try {
    const coinRef = doc(db, `users/${userId}/watchlist/${coin.id}`);
    await setDoc(coinRef, {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      total_volume: coin.total_volume,
      market_cap: coin.market_cap,
      addedAt: new Date().getTime(),
    });
    return true;
  } catch (error) {
    console.error("Error adding to watchlist: ", error);
    throw error;
  }
};

// Remove coin from watchlist
export const removeFromWatchlist = async (userId, coinId) => {
  try {
    const coinRef = doc(db, `users/${userId}/watchlist/${coinId}`);
    await deleteDoc(coinRef);
    return true;
  } catch (error) {
    console.error("Error removing from watchlist: ", error);
    throw error;
  }
};

// Get user's watchlist
export const getWatchlist = async (userId) => {
  try {
    const watchlistRef = collection(db, `users/${userId}/watchlist`);
    const querySnapshot = await getDocs(watchlistRef);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting watchlist: ", error);
    throw error;
  }
};

export const checkIfCoinInWatchlist = async (userId, coinId) => {
    try {
      const coinRef = doc(db, `users/${userId}/watchlist/${coinId}`);
      const coinDoc = await getDoc(coinRef);
      return coinDoc.exists();
    } catch (error) {
      console.error("Error checking watchlist status:", error);
      return false;
    }
  };