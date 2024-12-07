import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinPrices'
import settingChartData from '../functions/settingChartData'
import Loader from '../components/Common/Loader'
import { CoinObject } from '../functions/coinObject';
import List from '../components/Dashboard/List'

const ComparePage = () => {
  // id states
  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('ethereum');
  // days state
  const [days, setDays] = useState(7);
  // data states
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState('prices');

  useEffect(() => {
    getData();
  }, []);

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  }

  async function getData() {
    try {
      setIsLoading(true);
      const data1 = await getCoinData(crypto1);

      if (data1) {
        const data2 = await getCoinData(crypto2);
        CoinObject(setCrypto1Data, data1); //now only useful info we defined in CoinObject file will go to coinData state var
        if (data2) {
          CoinObject(setCrypto2Data, data2); //now only useful info we defined in CoinObject file will go to coinData state var
          const prices1 = await getCoinPrices(crypto1, days, priceType);
          const prices2 = await getCoinPrices(crypto2, days, priceType);
          console.log('BOTH PRICES FETCHED', prices1, prices2);
        }
      }
    }
    catch (error) {
      console.error("Error in handleCoinChange:", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    try {
      setIsLoading(true);
      const newValue = event.target.value;

      if (isCoin2) {
        setCrypto2(newValue);
        const data = await getCoinData(newValue);
        CoinObject(setCrypto2Data, data); //now only useful info we defined in CoinObject file will go to coinData state var

        const [prices1, prices2] = await Promise.all([
          getCoinPrices(crypto1, days, priceType),
          getCoinPrices(newValue, days, priceType)
        ]);

        if (prices1 && prices2) {
          console.log("BOTH PRICES FETCHED>> ", prices1, prices2);
        }
      }

      else {
        setCrypto1(newValue);
        const data = await getCoinData(newValue);
        CoinObject(setCrypto1Data, data); //now only useful info we defined in CoinObject file will go to coinData state var

        const [prices1, prices2] = await Promise.all([
          getCoinPrices(newValue, days, priceType),
          getCoinPrices(crypto2, days, priceType)
        ]);

        if (prices1 && prices2) {
          console.log("BOTH PRICES FETCHED>> ", prices1, prices2);
        }
      }
    }
    catch (error) {
      console.error("Error in handleCoinChange:", error);
    }
    finally {
      setIsLoading(false);
    }
  }


  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='coins-days-flex'>
            <SelectCoins crypto1={crypto1} crypto2={crypto2}
              handleCoinChange={handleCoinChange} />
            <SelectDays days={days} handleDaysChange={handleDaysChange}
              noPTag={true} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
        </>
      )}
    </div>
  )
}

export default ComparePage