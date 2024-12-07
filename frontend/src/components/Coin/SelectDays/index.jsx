import React, {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.css'

export default function SelectDays({days, handleDaysChange, noPTag}) {

  return (
    <div className="select-days">
        {!noPTag && <p>Price Change in </p>}
        <InputLabel id="demo-simple-select-label">Days</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={days}
          label="Days"
          onChange={(e) => handleDaysChange(e)}
          sx={{
            height: "2.5rem",
            color: "var(--white)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white)",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--white)",
            },
            "&:hover": {
              "&& fieldset": {
                borderColor: "#3a80e9",
              },
            },
          }}
        >
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={90}>90</MenuItem>
          <MenuItem value={120}>120</MenuItem>
          <MenuItem value={240}>240</MenuItem>
        </Select>
      
    </div>
  );
}
