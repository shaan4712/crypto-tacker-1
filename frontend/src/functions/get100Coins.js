import axios from "axios";

export const get100Coins = () => {
  const options = {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': 'CG-CJdSxdjZ1C4vq3W23REXXZdR'
    },
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1
    }
  };

  return axios
    .get('https://api.coingecko.com/api/v3/coins/markets', options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
      throw error;
    });
};