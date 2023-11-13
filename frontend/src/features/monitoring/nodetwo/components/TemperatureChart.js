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

function TemperatureChart() {
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
        label: 'Temperature',
        data: [],
        borderColor: 'rgb(63, 232, 21)',
        backgroundColor: 'rgba(63, 232, 21, 0.2)',
        lineTension: 0.5
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3000/mqtt-data');;
        const datares = await result.json();
        const node26 = datares.node26
        const temperature = node26.temperature
        const currentTime = new Date().toLocaleTimeString();

        setData((prevData) => ({
          labels: [...prevData.labels, currentTime].slice(-10),
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, temperature].slice(-10),
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
    <TitleCard title={"Temperature"}>
      <Line data={data} options={options} />
    </TitleCard>
  )
}

export default TemperatureChart