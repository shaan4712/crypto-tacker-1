import React, { useState, useEffect } from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import convertNumbers from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { addToWatchlist, removeFromWatchlist } from '../../../backend/firestore/watchlist';
import { useAuth } from '../../../AuthContext';
import { toast } from 'react-toastify';
import { useWatchlist } from '../../../context/WatchlistContext';


const List = ({ coin, isWatchlist, onRemove }) => {

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
      <tr className='list-row'>
        <Tooltip title={coin.name}>
          <td className='td-image'>
            <img src={coin.image} className='coin-logo' />
          </td>
        </Tooltip>

        <Tooltip title="Coin info" placement='bottom-start'>
          <td>
            <div className='name-col'>
              <p className='coin-symbol'>{coin.symbol}</p>
              <p className='coin-name'>{coin.name}</p>
            </div>
          </td>
        </Tooltip>

        <Tooltip title="Price change In 24h" placement='bottom-start'>
          {coin.price_change_percentage_24h > 0 ? (
            <td className='chip-flex'>
              <div className='price-chip'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='icon-chip td-icon'>
                <TrendingUpRoundedIcon />
              </div>
            </td>)
            :
            (
              <td className='chip-flex'>
                <div className='price-chip chip-red'>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip icon-chip-red td-icon'>
                  <TrendingDownRoundedIcon />
                </div>
              </td>
            )}
        </Tooltip>

        <Tooltip title="Current Price">
          <td>
            <h3 className='coin-price td-center-align'
              style={{
                color: coin.price_change_percentage_24h > 0 ?
                  "var(--green)" : "var(--red)"
              }}>
              ${coin.current_price.toLocaleString()} </h3>
          </td>
        </Tooltip>

        <Tooltip title="Total Volume" placement='bottom-end'>
          <td>
            <p className='total-volume td-right-align td-disable'>
              {coin.total_volume.toLocaleString()}</p>
          </td>
        </Tooltip>

        <Tooltip title="Market Cap" placement='bottom-end'>
          <td className='desktop-td-mkt'>
            <p className='total-volume td-right-align'>
              {coin.market_cap.toLocaleString()}</p>
          </td>
        </Tooltip>

        <Tooltip title="Market Cap" placement='bottom-end'>
          <td className='mobile-td-mkt'>
            <p className='total-volume td-right-align'>
              {convertNumbers(coin.market_cap)}</p>
          </td>
        </Tooltip>

        <Tooltip title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}>
          <td className='td-star'>
            <div className='star-icon-list' onClick={handleClick}>
              {isAdded ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
            </div>
          </td>
        </Tooltip>
      </tr>
    </Link>
  )
}

export default List