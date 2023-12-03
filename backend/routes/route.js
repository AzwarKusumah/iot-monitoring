const Connection = require('../controllers/connection');
const { iotMonitoringData } = require('../models/schema/mqttSchema');
const express = require('express');
const app = express();
const router = express.Router();

// Objek untuk menyimpan data MQTT
const mqttData = {
  node25: {
    temperature: null,
    humidity: null,
    pressure: null,
    altitude: null,
    gas_mq135: null,
    gas_mq2: null,
    status: null,
  },
  node26: {
    temperature: null,
    humidity: null,
    pressure: null,
    altitude: null,
    dustdensity: null,
    status: null,
  },
  node27: {
    temperature: null,
    humidity: null,
    pressure: null,
    status: null,
  },
};

const topicMappings = {
  temperature: 'MQTT_TOPIC_TEMPERATURE_',
  humidity: 'MQTT_TOPIC_HUMIDITY_',
  pressure: 'MQTT_TOPIC_PRESSURE_',
  altitude: 'MQTT_TOPIC_ALTITUDE_',
  dustdensity: 'MQTT_TOPIC_DUST_',
  gas_mq135: 'MQTT_TOPIC_GAS_MQ135_',
  gas_mq2: 'MQTT_TOPIC_GAS_MQ2_', // Adjusted since there was a duplicate status entry
  status: 'MQTT_TOPIC_STATUS_',
};

// filter data berdasarkan waktu
const getDataByTimeRange = async (startTime, endTime) => {
  return await iotMonitoringData.find({
    timestamp: {
      $gte: startTime,
      $lte: endTime,
    },
  }).maxTimeMS(30000); // Atur waktu maksimum menjadi 30 detik (sesuaikan sesuai kebutuhan)
};

router.get('/data-1-hour-ago', async (req, res) => {
  const currentTime = new Date();
  const oneHourAgo = new Date(currentTime - 60 * 60 * 1000);
  const data = await getDataByTimeRange(oneHourAgo, currentTime);
  res.json(data);
});

router.get('/data-12-hours-ago', async (req, res) => {
  const currentTime = new Date();
  const twelveHoursAgo = new Date(currentTime - 12 * 60 * 60 * 1000);
  const data = await getDataByTimeRange(twelveHoursAgo, currentTime);
  res.json(data);
});

router.get('/data-1-day-ago', async (req, res) => {
  const currentTime = new Date();
  const oneDayAgo = new Date(currentTime - 24 * 60 * 60 * 1000);
  const data = await getDataByTimeRange(oneDayAgo, currentTime);
  res.json(data);
});

router.get('/data-1-week-ago', async (req, res) => {
  const currentTime = new Date();
  const oneWeekAgo = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);
  const data = await getDataByTimeRange(oneWeekAgo, currentTime);
  res.json(data);
});

// Fungsi untuk meng-handle pesan MQTT
function routeIotData(node, topic, message) {
  Object.keys(topicMappings).forEach((property) => {
    const envVariable = `${topicMappings[property]}${node.toUpperCase()}`;
    if (topic === process.env[envVariable]) {
      mqttData[node][property] = message.toString();
    }
  });
}

// Jalankan koneksi MQTT untuk semua node
Connection.connectionMqtt((topic, message) => {
  // Loop through all nodes
  ['node25', 'node26', 'node27'].forEach((node) => {
    routeIotData(node, topic, message);
  });
});

// Rute untuk mengambil data MQTT
router.get('/mqtt-data', (req, res) => {
  res.json(mqttData);
});

module.exports = router;

