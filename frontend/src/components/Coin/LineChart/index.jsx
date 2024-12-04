import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import convertNumbers from "../../../functions/convertNumbers";

function LineChart({ chartData, priceType }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            if (priceType == "prices"){
              return "$" + value.toLocaleString();
            }
            else {
              return "$" + convertNumbers(value);
            }
           
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
