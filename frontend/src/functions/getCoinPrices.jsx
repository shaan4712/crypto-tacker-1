import axios from "axios";

export const getCoinPrices = (id, days, priceType) => {
    const options = {
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': 'CG-CJdSxdjZ1C4vq3W23REXXZdR'
        },
        params: {
            vs_currency: 'usd',
            days: days,
            interval: 'daily'
        }
    };

    return axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, options)
        .then((response) => {
            return response.data[priceType];
        })
        .catch((error) => {
            console.log("ERROR>>>", error);
            // Re-throw to allow proper error handling in calling component
            throw error;
        });
};