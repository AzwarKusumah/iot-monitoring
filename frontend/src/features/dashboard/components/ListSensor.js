import TitleCard from "../../../components/Cards/TitleCard"
import React, { useState, useEffect } from "react"

const SensorTable = ({ nodeName, sensorData }) => {
  const renderSensorStatus = (sensorName, sensorValue) => {
    const status = sensorValue !== null ? 'online 🟢' : 'offline 🔴';
    return (
      <tr key={sensorName}>
        <td>{sensorName}</td>
        <td>{status}</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="font-bold mt-1">{nodeName}</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="normal-case">Sensor</th>
            <th className="normal-case">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sensorData).map(([sensorName, sensorValue]) =>
            renderSensorStatus(sensorName, sensorValue)
          )}
        </tbody>
      </table>
    </div>
  );
};


function ListSensor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3000/mqtt-data');
        const datares = await result.json();
        setData(datares);
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
    <TitleCard title={"LIST Sensor"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <div>
          {Object.entries(data).map(([nodeName, sensorData]) => (
            <SensorTable key={nodeName} nodeName={nodeName} sensorData={sensorData} />
          ))}
        </div>
      </div>
    </TitleCard >
  );
}

export default ListSensor;
