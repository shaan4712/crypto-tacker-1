import React, { useEffect, useState } from 'react'
import { get100Coins } from '../../../functions/get100Coins'
import { InputLabel, MenuItem, Select } from '@mui/material';
import './styles.css'

const SelectCoins = ({ crypto1, crypto2, handleCoinChange }) => {

    const [allCoins, setAllCoins] = useState([]);

    const styles = {
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
    };


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const myCoins = await get100Coins();
        setAllCoins(myCoins);
    }

    return (
        <div className="coins-flex">
            <div className='coin'>
                <p>Coin 1</p>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={crypto1}
                    label="Coin 1"
                    onChange={(e) => handleCoinChange(e, false)}
                    sx={styles}
                >
                    {allCoins.filter((item) => item.id != crypto2).map((coin, i) => (
                        <MenuItem key={i} value={coin.id}> {coin.name} </MenuItem>
                    ))}
                </Select>
            </div>

            <div className='coin'>
                <p>Coin 2</p>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={crypto2}
                    label="Coin 2"
                    onChange={(e) => handleCoinChange(e, true)}
                    sx={styles}
                >
                    {allCoins.filter((item) => item.id != crypto1).map((coin, i) => (
                        <MenuItem key={i} value={coin.id}> {coin.name} </MenuItem>
                    ))}
                </Select>
            </div>

        </div>
    )
}

export default SelectCoins