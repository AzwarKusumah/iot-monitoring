const Connection = require('../controllers/connection');
const express = require('express');
const app = express();
const router = express.Router();

// Objek untuk menyimpan data MQTT
const mqttData = {
  node25: {
    temperature: null,
    humidityDHT22: null,
    pressureBME280: null,
    status:null
  },
  node26: {
    temperature: null,
    humidityDHT22: null,
    pressureBME280: null,
    status:null
  },
  node27: {
    temperature: null,
    humidityDHT22: null,
    pressureBME280: null,
    status:null
  },
};

// Fungsi untuk meng-handle pesan MQTT
function routeIotData(node, topic, message) {
  switch (topic) {
    case process.env[`MQTT_TOPIC_TEMPERATURE_${node.toUpperCase()}`]:
      mqttData[node].temperature = message.toString();
      break;
    case process.env[`MQTT_TOPIC_HUMIDITY_${node.toUpperCase()}`]:
      mqttData[node].humidityDHT22 = message.toString();
      break;
    case process.env[`MQTT_TOPIC_PRESSURE_${node.toUpperCase()}`]:
      mqttData[node].pressureBME280 = message.toString();
      break;
    case process.env[`MQTT_TOPIC_STATUS_${node.toUpperCase()}`]:
      mqttData[node].status = message.toString();
      break;  
  }
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
