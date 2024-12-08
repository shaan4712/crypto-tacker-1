import React, { useEffect, useState } from 'react';
import './styles.css';
import Stack from '@mui/material/Stack';
import Button from '../Button';
import AnchorTemporaryDrawer from './drawer';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { toast } from 'react-toastify';

const Header = () => {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") == "dark" ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") != "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <h1>CryptoTracker<span style={{ color: 'var(--blue)' }}>.</span></h1>
      </Link>
      <div className='links'>
        <Switch checked={darkMode} onClick={() => changeMode()} />
        <Link to='/'>
          <p className='link'>Home</p>
        </Link>
        <Link to='/compare'>
          <p className='link'>Compare</p>
        </Link>
        <Link to='/watchlist'>
          <p className='link'>Watchlist</p>
        </Link>
        <Link to='/cryptotips'>
          <p className='link'>Get Insights</p>
        </Link>
        <Link to='/dashboard'>
          <Button text={"Dashboard"}
            onClick={() => console.log("Clicked dashboard")}
          // outlined={true}
          />
          {/* giving value to prop  */}
        </Link>
      </div>

      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer />
      </div>
    </div>
  )
}

export default Header;