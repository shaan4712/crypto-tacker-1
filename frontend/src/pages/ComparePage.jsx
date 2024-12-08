import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinPrices'
import settingChartData from '../functions/settingChartData'
import Loader from '../components/Common/Loader'
import { CoinObject } from '../functions/CoinObject'
import List from '../components/Dashboard/List'
import CoinInfo from '../components/Coin/CoinInfo'
import LineChart from '../components/Coin/LineChart'
import PriceType from '../components/Coin/PriceType'
import Footer from '../components/Common/Footer'

const ComparePage = () => {
  // id states
  const [crypto1, setCrypto1] = useState('bitcoin')
  const [crypto2, setCrypto2] = useState('ethereum')
  // days state
  const [days, setDays] = useState(7)
  // data states
  const [crypto1Data, setCrypto1Data] = useState({})
  const [crypto2Data, setCrypto2Data] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [priceType, setPriceType] = useState('prices')
  //chart data
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setIsLoading(true)
    try {
      const data1 = await getCoinData(crypto1)
      const data2 = await getCoinData(crypto2)

      if (data1 && data2) {
        CoinObject(setCrypto1Data, data1)
        CoinObject(setCrypto2Data, data2)

        const prices1 = await getCoinPrices(crypto1, days, priceType)
        const prices2 = await getCoinPrices(crypto2, days, priceType)
        
        if (prices1 && prices2) {
          settingChartData(setChartData, prices1, prices2)
        }
      }
    } catch (error) {
      console.error("Error in getData:", error)
    }
    setIsLoading(false)
  }

  const handleDaysChange = async (event) => {
    try {
      setIsLoading(true)
      const newDays = event.target.value
      setDays(newDays)
      
      // Getting fresh data for both coins with new days
      const prices1 = await getCoinPrices(crypto1, newDays, priceType)
      const prices2 = await getCoinPrices(crypto2, newDays, priceType)
      
      if (prices1 && prices2) {
        console.log("Setting new chart data for days change")
        settingChartData(setChartData, prices1, prices2)
      }
    } catch (error) {
      console.error("Error in handleDaysChange:", error)
    }
    setIsLoading(false)
  }

  const handleCoinChange = async (event, isCoin2) => {
    try {
      setIsLoading(true)
      const newValue = event.target.value

      if (isCoin2) {
        setCrypto2(newValue)
        const data = await getCoinData(newValue)
        if (data) {
          CoinObject(setCrypto2Data, data)
          const prices1 = await getCoinPrices(crypto1, days, priceType)
          const prices2 = await getCoinPrices(newValue, days, priceType)
          if (prices1 && prices2) {
            console.log("Setting new chart data for coin2 change")
            settingChartData(setChartData, prices1, prices2)
          }
        }
      } else {
        setCrypto1(newValue)
        const data = await getCoinData(newValue)
        if (data) {
          CoinObject(setCrypto1Data, data)
          const prices1 = await getCoinPrices(newValue, days, priceType)
          const prices2 = await getCoinPrices(crypto2, days, priceType)
          if (prices1 && prices2) {
            console.log("Setting new chart data for coin1 change")
            settingChartData(setChartData, prices1, prices2)
          }
        }
      }
    } catch (error) {
      console.error("Error in handleCoinChange:", error)
    }
    setIsLoading(false)
  }

  const handlePriceTypeChange = async (newType) => {
    try {
      setIsLoading(true)
      setPriceType(newType)
      
      // Getting fresh data for both coins with new price type
      const prices1 = await getCoinPrices(crypto1, days, newType)
      const prices2 = await getCoinPrices(crypto2, days, newType)
      
      if (prices1 && prices2) {
        console.log("Setting new chart data for price type change")
        settingChartData(setChartData, prices1, prices2)
      }
    } catch (error) {
      console.error("Error in handlePriceTypeChange:", error)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='coins-days-flex'>
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
          <div className='grey-wrapper'>
            <PriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
      <Footer />
    </div>
  )
}

export default ComparePage