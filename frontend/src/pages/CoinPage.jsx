import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader'
import axios from "axios"
import { CoinObject } from '../functions/coinObject'
import List from '../components/Dashboard/List'
import Footer from '../components/Common/Footer'
import CoinInfo from '../components/Coin/CoinInfo'

const CoinPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();

    useEffect(() => {
        if (id) {
            //using axios for api fetch
            axios
                .get(`https://api.coingecko.com/api/v3/coins/${id}`)
                .then((response) => {
                    console.log("Response>> ", response.data);
                    setIsLoading(false);
                    CoinObject(setCoinData, response.data); //now only useful info we defined in CoinObject file will go to coinData state var
                })
                .catch((error) => {
                    console.log("ERROR>>>", error);
                    setIsLoading(false);
                });
        }
    }, [id])

    return (
        <div>
            <Header />
            {isLoading ? (<Loader />) :
                (
                    <>
                        <div className='grey-wrapper'>
                            <List coin={coinData} />
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </>
                )}
            <Footer />
        </div>
    )
}

export default CoinPage