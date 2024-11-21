import * as React from 'react';
import './styles.css';
import Stack from '@mui/material/Stack';
import Button from '../Button';
import AnchorTemporaryDrawer from './drawer';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='navbar'>
      <Link to='/'>
        <h1>CryptoTracker<span style={{color: 'var(--blue)'}}>.</span></h1>
      </Link>  
      <div className='links'>
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