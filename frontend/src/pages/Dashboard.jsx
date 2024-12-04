import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader'
import BackOnTop from '../components/Common/BackOnTop';
import Footer from '../components/Common/Footer';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  //pagination handling function
  const handlePageChange = (event, value) => {
    setPage(value);
    let previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10)); //[10, 20) - slice values eg
  }

  useEffect(() => {
    //using axios for api fetch
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
    .then((response) => {
      setCoins(response.data);
      //response.data has all coins
      setPaginatedCoins(response.data.slice(0, 10));
      setIsLoading(false);
    })
    .catch((error) => {
        console.log("ERROR>>>", error);
        setIsLoading(false);
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
    <>
      <Header />
      <BackOnTop />
      {
        isLoading ? ( 
          <Loader />
        ) : (
          <div>
              <Search search={search} onSearchChange={onSearchChange}/>
              <TabsComponent coins={search ? filteredCoins : paginatedCoins}/>
              {/* passing coins (array of 100 coins - objects) */}
              {
                !search && <PaginationComponent page={page} handleChange={handlePageChange}/>
              }
          </div>
        )
      }
      <Footer />
    </>
  )
}

export default Dashboard