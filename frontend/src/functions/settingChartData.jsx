import { convertDate } from "./convertDate"

const settingChartData = (setChartData, prices1, prices2) => {

    if (prices2) {
        setChartData({
            labels: prices1.map((price) => convertDate(price[0])),
            datasets: [{
                label: "Coin 1",
                data: prices1.map((price) => price[1]),
                borderColor: '#3a80e9',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointRadius: 2,
                yAxisID: "crypto1"
            }, 
            {
                label: "Coin 2",
                data: prices2.map((price) => price[1]),
                borderColor: '#61c96f',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointRadius: 2,
                yAxisID: "crypto2"
            }
        ]
        });
    }

    else {
        setChartData({
            labels: prices1.map((price) => convertDate(price[0])),
            datasets: [{
                label: "Coin",
                data: prices1.map((price) => price[1]),
                borderColor: '#3a80e9',
                backgroundColor: "rgba(58, 128, 233, 0.1)",
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 2,
                yAxisID: "crypto1"
            }]
        });
    }
}

export default settingChartData