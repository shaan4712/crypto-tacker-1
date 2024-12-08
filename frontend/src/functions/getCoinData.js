import axios from "axios";

export const getCoinData = (id) => {
    const options = {
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': 'CG-CJdSxdjZ1C4vq3W23REXXZdR'
        }
    };

    return axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`, options)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("ERROR>>>", error);
            // Re-throw the error so it can be caught by the calling function
            throw error;
        });
};