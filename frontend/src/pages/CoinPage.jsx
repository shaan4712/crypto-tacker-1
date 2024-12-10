import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader'
import axios from "axios"
import { CoinObject } from '../functions/CoinObject'
import List from '../components/Dashboard/List'
import Footer from '../components/Common/Footer'
import CoinInfo from '../components/Coin/CoinInfo'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinPrices'
import LineChart from '../components/Coin/LineChart'
import { convertDate } from '../functions/convertDate'
import SelectDays from '../components/Coin/SelectDays'
import settingChartData from '../functions/settingChartData'
import PriceType from '../components/Coin/PriceType'
import BackOnTop from '../components/Common/BackOnTop'

const CoinPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(7);
    const [chartData, setChartData] = useState({});
    const [priceType, setPriceType] = useState('prices');

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);


    //using axios for api fetch
    async function getData() {
        setIsLoading(true);
        let data = await getCoinData(id);
        if (data) {
            CoinObject(setCoinData, data); //now only useful info we defined in CoinObject file will go to coinData state var
            const prices = await getCoinPrices(id, days, priceType);
            if (prices) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);

        const prices = await getCoinPrices(id, event.target.value, priceType);
        if (prices) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);

        const prices = await getCoinPrices(id, days, newType);
        if (prices) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <BackOnTop />
            {isLoading ? (<Loader />) :
                (
                    <>
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={coinData} />
                        </div>
                        <div className='grey-wrapper'>
                            <SelectDays days={days} handleDaysChange={handleDaysChange} />
                            <PriceType priceType={priceType} 
                            handlePriceTypeChange={handlePriceTypeChange}/>
                            <LineChart chartData={chartData} priceType={priceType} />
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </>
                )}
            <Footer />
        </div>
    )
}

export default CoinPage