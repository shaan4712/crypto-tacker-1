import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton, Switch } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import './drawer.css'

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = useState(false);
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
      setOpen(false); // Close drawer after logout
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className='link' />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className='drawer-div'>
          <Link to='/'>
            <p className='link'>Home</p>
          </Link>
          <Link to='/compare'>
            <p className='link'>Compare</p>
          </Link>
          <Link to='/watchlist'>
            <p className='link'>Watchlist</p>
          </Link>
          <Link to='/dashboard'>
            <p className='link'>Dashboard</p>
          </Link>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
            padding: '0.5rem 0'
          }}>
            <Switch checked={darkMode} onClick={() => changeMode()} />
          </div>
          <Divider style={{ margin: '0.5rem 0' }} />
          <div 
            className='link' 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '0.5rem'
            }}
          >
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}