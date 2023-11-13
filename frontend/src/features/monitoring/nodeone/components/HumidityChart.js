import React, { useState, useEffect } from 'react';
import TitleCard from '../../../../components/Cards/TitleCard';
import { Line } from 'react-chartjs-2';
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

function HumidityChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };


  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        label: 'Humidity',
        data: [],
        borderColor: 'rgba(39, 200, 245)',
        backgroundColor: 'rgba(39, 200, 245, 0.2)',
        lineTension: 0.5
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3000/mqtt-data');;
        const datares = await result.json();
        const node25 = datares.node25
        const humidity = node25.humidityDHT22
        const currentTime = new Date().toLocaleTimeString();

        setData((prevData) => ({
          labels: [...prevData.labels, currentTime].slice(-10),
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, humidity].slice(-10),
            },
          ],
        }));
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <TitleCard title={"Humidity"}>
      <Line data={data} options={options} />
    </TitleCard>
  )
}

export default HumidityChart