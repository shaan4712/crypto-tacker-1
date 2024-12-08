import React, { useEffect, useState } from 'react';
import './styles.css';
import Stack from '@mui/material/Stack';
import Button from '../Button';
import AnchorTemporaryDrawer from './drawer';
import { Link, useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
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
          />
        </Link>
        <Button 
          text={"Logout"}
          onClick={handleLogout}
          outlined={true}
        />
      </div>

      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer />
      </div>
    </div>
  )
}

export default Header;