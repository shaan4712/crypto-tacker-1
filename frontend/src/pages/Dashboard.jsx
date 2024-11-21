import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Search from '../components/Dashboard/Search';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //using axios for api fetch
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
    .then((response) => {
      setCoins(response.data);
      //response.data has all coins
    })
    .catch((error) => {
            
    });
  }, [])

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  //filter function for search bar
  var filteredCoins = coins.filter((item) => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
        <Header />
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent coins={filteredCoins}/>
        {/* passing coins (array of 100 coins - objects) */}
    </div>
  )
}

export default Dashboard