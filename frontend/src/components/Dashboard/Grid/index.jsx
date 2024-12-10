import React, { useState, useEffect } from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { addToWatchlist, removeFromWatchlist } from '../../../backend/firestore/watchlist';
import { useAuth } from '../../../AuthContext';
import { toast } from 'react-toastify';
import { useWatchlist } from '../../../context/WatchlistContext';

const Grid = ({ coin, isWatchlist, onRemove }) => {

  const [isAdded, setIsAdded] = useState(false);
  const { user } = useAuth();
  const { watchlistCoins, updateWatchlist } = useWatchlist();

   useEffect(() => {
    setIsAdded(watchlistCoins.includes(coin.id));
  }, [watchlistCoins, coin.id]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add to watchlist!");
      return;
    }

    try {
      if (isAdded) {
        await removeFromWatchlist(user.uid, coin.id);
        await updateWatchlist(); // Update global state
        setIsAdded(false);
        if (isWatchlist && onRemove) {
          onRemove(coin.id); // Immediately remove from watchlist view
        }
        toast.success(`${coin.name} removed from watchlist!`);
      } else {
        await addToWatchlist(user.uid, coin);
        await updateWatchlist(); // Update global state
        setIsAdded(true);
        toast.success(`${coin.name} added to watchlist!`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className={`grid-container 
    ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`} >
        <div className='star-icon' onClick={handleClick}>
          {isAdded ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
        </div>
        <div className='info-flex'>
          <img src={coin.image} className='coin-logo' />
          <div className='name-col'>
            <p className='coin-symbol'>{coin.symbol}</p>
            <p className='coin-name'>{coin.name}</p>
          </div>
        </div>

        {coin.price_change_percentage_24h > 0 ? (
          <div className='chip-flex'>
            <div className='price-chip'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='icon-chip'>
              <TrendingUpRoundedIcon />
            </div>
          </div>)
          :
          (
            <div className='chip-flex'>
              <div className='price-chip chip-red'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='icon-chip icon-chip-red'>
                <TrendingDownRoundedIcon />
              </div>
            </div>
          )}

        <div className='info-container'>
          <h3 className='coin-price'
            style={{ color: coin.price_change_percentage_24h > 0 ? "var(--green)" : "var(--red)" }}>
            ${coin.current_price.toLocaleString()} </h3>

          <p className='total-volume'>
            Total Volume : {coin.total_volume.toLocaleString()}</p>

          <p className='total-volume'>
            Market Cap : {coin.market_cap.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  )
}

export default Grid