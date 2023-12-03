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

function AltitudeChart() {
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
                label: 'Altitude',
                data: [],
                borderColor: 'rgb(227, 105, 11)',
                backgroundColor: 'rgba(227, 105, 11, 0.2)',
                lineTension: 0.5
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://192.168.173.25:3000/mqtt-data');;
                const datares = await result.json();
                const node26 = datares.node26
                const altitude = node26.altitude
                const currentTime = new Date().toLocaleTimeString();

                setData((prevData) => ({
                    labels: [...prevData.labels, currentTime].slice(-10),
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [...prevData.datasets[0].data, altitude].slice(-10),
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
        <TitleCard title={"Altitude"}>
            <Line data={data} options={options} />
        </TitleCard>
    )
}

export default AltitudeChart