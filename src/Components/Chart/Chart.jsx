import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "./Chart.css";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    axios
      .get("https://fe-task-api.mainstack.io/transactions")
      .then((response) => {
        const transactions = response.data;
        const dates = [];
        const amounts = [];

        // Group transactions by date and calculate total amount per day
        transactions.forEach((transaction) => {
          const date = new Date(transaction.date).toLocaleDateString();
          if (!dates.includes(date)) {
            dates.push(date);
            amounts.push(transaction.amount);
          } else {
            const index = dates.indexOf(date);
            amounts[index] += transaction.amount;
          }
        });

        // get the total balance

        setChartData({
          labels: dates, // Dates on the X-axis
          datasets: [
            {
              data: amounts, // Amounts on the Y-axis
              fill: false,
              borderColor: "rgb(247, 169, 109)", // Line color
              tension: 0.5, // Curved line
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("https://fe-task-api.mainstack.io/wallet");
        const data = await response.json();
        setBalance(data.balance || "0.00");
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="chart">
      <div class="balance-sect">
        <div class="bal">
          <p>Available Balance</p>
          <h2>USD {balance}</h2>
        </div>
        <button>Withdraw</button>
      </div>
      <div className="chart-container">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                  },
                  grid: {
                    display: false, // Hide grid lines
                  },
                  ticks: {
                    callback: (value, index, ticks) => {
                      // Show only the first and last dates on the X-axis
                      if (index === 0 || index === ticks.length - 1) {
                        return chartData.labels[index];
                      }
                      return ""; // Hide other labels
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                  },
                  grid: {
                    display: false, // Hide grid lines
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
