import React from 'react';
import './styles.css';

const Button = ({text, onClick, outlined}) => {
  return (
    <div className = {outlined ? 'outlined-btn' : 'btn'} 
    onClick={onClick ? () => onClick() : undefined}>
        {text}
    </div>
    //got value by passing props
  )
}

export default Button;