import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component'
import TemperatureChart from './components/TemperatureChart'
import HumidityChart from './components/HumidityChart'
import PressureChart from './components/PressureChart'
import GasMetanaChart from './components/GasMetanaChart';
import GasEtanolChart from './components/GasEtanolChart';
import AltitudeChart from './components/AltitudeChart';


function NodeOne() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://192.168.173.25:3000/mqtt-data');;
        const datares = await result.json();
        const node25 = datares.node25
        setData(node25);
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
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title dark:text-slate-300">Temperature</div>
            <GaugeComponent
              type="semicircle"
              arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                // gradient: true,
                subArcs: [
                  {
                    limit: 12,
                    color: '#EA4228',
                    showTick: true,
                    tooltip: {
                      text: 'Too low temperature!'
                    },
                    onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                    onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                    onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                  },
                  {
                    limit: 16,
                    color: '#F5CD19',
                    showTick: true,
                    tooltip: {
                      text: 'Low temperature!'
                    }
                  },
                  {
                    limit: 29,
                    color: '#5BE12C',
                    showTick: true,
                    tooltip: {
                      text: 'OK temperature!'
                    }
                  },
                  {
                    limit: 33, color: '#F5CD19', showTick: true,
                    tooltip: {
                      text: 'High temperature!'
                    }
                  },
                  {
                    color: '#EA4228',
                    tooltip: {
                      text: 'Too high temperature!'
                    }
                  }
                ]
              }}
              pointer={{
                type: "needle",
                color: '#345243',
                length: 0.80,
                width: 15,
                // elastic: true,
              }}
              labels={{
                valueLabel: { formatTextValue: value => value + 'ºC' },
                tickLabels: {
                  type: 'outer',
                  valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
                  ticks: [
                    { value: `${data.temperature}` },
                  ],
                }
              }}
              value={data.temperature}
              minValue={5}
              maxValue={40}
            />
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title dark:text-slate-300">Humidity(RH)</div>
            <GaugeComponent
              arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                  {
                    limit: 35,
                    color: '#EA4228',
                    showTick: true,
                    tooltip: {
                      text: 'Too Dry!'
                    }
                  },
                  {
                    limit: 65,
                    color: '#F5CD19',
                    showTick: true,
                    tooltip: {
                      text: 'Dry'
                    }
                  },
                  {
                    limit: 100,
                    color: '#5BE12C',
                    showTick: true,
                    tooltip: {
                      text: 'Moist'
                    }
                  },
                ]
              }}
              labels={{
                valueLabel: { formatTextValue: value => value + 'Rh' },
                tickLabels: {
                  type: 'outer',
                  valueConfig: { formatTextValue: value => value + 'Rh', fontSize: 10 },
                  ticks: [
                    { value: `${data.humidity}` },
                  ],
                }
              }}
              value={data.humidity}
            />
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title dark:text-slate-300">Pressure(PSi)</div>
            <GaugeComponent
              id="gauge-component8"
              arc={{
                nbSubArcs: 150,
                colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                width: 0.3,
                padding: 0.003
              }}
              labels={{
                valueLabel: {
                  formatTextValue: value => value + 'Hpa'
                },
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 1000 },
                    { value: 1500 },
                    { value: 2000 },
                    { value: 2500 },
                    { value: 3000 },
                  ],
                }
              }}
              value={data.pressure}
              maxValue={3000}
            />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <TemperatureChart />
        <HumidityChart />
        <PressureChart />
        <AltitudeChart />
        <GasMetanaChart />
        <GasEtanolChart />
      </div>

    </>
  )
}

export default NodeOne;