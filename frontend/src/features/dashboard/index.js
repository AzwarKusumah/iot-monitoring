import DashboardStats from './components/DashboardStats'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CpuChipIcon from '@heroicons/react/24/outline/CpuChipIcon'
import SignalIcon from '@heroicons/react/24/outline/SignalIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ListPerangkat from './components/ListPerangkat'
import ListSensor from './components/ListSensor'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'


function Dashboard() {


  const dispatch = useDispatch()
  const [data, setData] = useState([])

  //Jumlah Node
  const numberObject = Object.keys(data).length;

  //Jumlah Node aktif
  let activeNodeNumber = 0;
  for (const nodeKey in data) {
    if (data[nodeKey].status === "online") {
      activeNodeNumber++;
    }
  }

  //Jumlah sensor
  let totalSensors = 0;
  for (const nodeKey in data) {
    const node = data[nodeKey];
    if (node.status === "online") {
      const sensors = [node.temperature, node.humidityD, node.pressure, node.pressure, node.altitude, node.gas];
      totalSensors += sensors.filter(sensor => sensor !== null && sensor !== "0.00").length;
    }
  }
  const statsData = [
    { title: "Jumlah Node", value: `${numberObject}`, icon: <CpuChipIcon className='w-8 h-8 text-green-500' /> },
    { title: "Node Aktif", value: `${activeNodeNumber}`, icon: <BoltIcon className='w-8 h-8 text-yellow-500' /> },
    { title: "Jumlah Sensor", value: `${totalSensors}`, icon: <SignalIcon className='w-8 h-8 text-cyan-500' /> },
    { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' /> },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3000/mqtt-data');
        const datares = await result.json();
        console.log(datares)
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
    <>
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {
          statsData.map((d, k) => {
            return (
              <DashboardStats key={k} {...d} colorIndex={k} />
            )
          })
        }
      </div>
      {/** ---------------------- Different stats content 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <ListPerangkat />
        <ListSensor />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

    </>
  )
}

export default Dashboard