import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader'
import axios from "axios"
import { CoinObject } from '../functions/coinObject'
import List from '../components/Dashboard/List'
import Footer from '../components/Common/Footer'
import CoinInfo from '../components/Coin/CoinInfo'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinPrices'
import LineChart from '../components/Coin/LineChart'
import { convertDate } from '../functions/convertDate'

const CoinPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);


    //using axios for api fetch
    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            CoinObject(setCoinData, data); //now only useful info we defined in CoinObject file will go to coinData state var
            const prices = await getCoinPrices(id, days);
            if (prices) {
                console.log("Prices>>", prices);
                setChartData({
                    labels: prices.map((price) => convertDate(price[0])),
                    datasets: [{
                        data: prices.map((price) => price[1]),
                        fill: false,
                        borderColor: '#3a80e9',
                        backgroundColor: "rgba(58, 128, 233, 0.1)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3,
                        pointRadius: 2
                    }]
                })
                setIsLoading(false);
            }
        }
    }


    return (
        <div>
            <Header />
            {isLoading ? (<Loader />) :
                (
                    <>
                        <div className='grey-wrapper'>
                            <List coin={coinData} />
                        </div>
                        <div className='grey-wrapper'>
                            <LineChart chartData={chartData} />
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </>
                )}
            <Footer />
        </div>
    )
}

export default CoinPage