import React, { useState, useEffect } from 'react';
import TitleCard from '../../../../components/Cards/TitleCard';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PressureChart() {
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
        label: 'Pressure',
        data: [],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)']
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://192.168.173.25:3000/mqtt-data');;
        const datares = await result.json();
        const node26 = datares.node26
        const humidity = node26.pressure
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
    <TitleCard title={"Pressure"}>
      <Bar data={data} options={options} />
    </TitleCard>
  )
}

export default PressureChart