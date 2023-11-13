import TitleCard from "../../../components/Cards/TitleCard"
import React, { useState, useEffect } from "react"

function ListPerangkat() {
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
    <TitleCard title={"LIST PERANGKAT"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Perangkat</th>
              <th className="normal-case">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((deviceKey, index) => (
              <tr key={deviceKey}>
                <td>{index + 1}</td>
                <td>{deviceKey}</td>
                <td>{data[deviceKey].status == "online" ? "online": "offline"}</td>
                <td>{data[deviceKey].status == "online" ? "🟢": "🔴"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default ListPerangkat;
