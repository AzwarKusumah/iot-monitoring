import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../../components/Cards/TitleCard';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function NodeAltitude({ selectedOption }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${selectedOption}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedOption) {
      fetchData();
    }
  }, [selectedOption]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const chartData = {
    labels: data.map((entry) => entry.timestamp),
    datasets: [
      {
        label: selectedOption,
        data: data.map((entry) => parseFloat(entry.node25.altitude)),
        fill: true,
        backgroundColor: 'rgba(227, 105, 11, 0.2)',
        tension: 1,
      },
    ],
  };


  return (
    <TitleCard title={"Node25-Altitude"} >
      {selectedOption && <Line data={chartData} options={options} />}
    </TitleCard>
  )
}


export default NodeAltitude