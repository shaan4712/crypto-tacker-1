import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './styles.css'

export default function PaginationComponent({page, handleChange}) {
  
  return (
    <div className='pagination-component'>
        <Pagination count={10} page={page} 
        onChange={(event, value) => handleChange(event, value)} 
        sx={{
            "& .MuiPaginationItem-text": {
              color: "var(--white) !important",
              border: "1px solid var(--grey)",
            },
            "& .MuiPaginationItem-text:hover": {
              backgroundColor: "transparent !important",
            },
            "& .Mui-selected  ": {
              backgroundColor: "var(--blue) !important",
              borderColor: "var(--blue)",
            },
            "& .MuiPaginationItem-ellipsis": {
              border: "none",
            },
          }}/>
    </div>
  );
}