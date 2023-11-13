const Connection = require('../controllers/connection');
const { iotMonitoringData } = require('./schema/mqttSchema');
const mongoose = require('mongoose');

// Fungsi untuk mengolah pesan MQTT
function handleMqttData(topic, message, receivedData) {
  const node = topic.split('/')[1]; // Mendapatkan nama node dari topik
  switch (node) {
    case 'node25':
      receivedData.temperatureNode25 = topic.includes('temperature') ? message.toString() : receivedData.temperatureNode25;
      receivedData.humidityNode25 = topic.includes('humidity') ? message.toString() : receivedData.humidityNode25;
      receivedData.pressureNode25 = topic.includes('pressure') ? message.toString() : receivedData.pressureNode25;
      break;
    case 'node26':
      receivedData.temperatureNode26 = topic.includes('temperature') ? message.toString() : receivedData.temperatureNode26;
      receivedData.humidityNode26 = topic.includes('humidity') ? message.toString() : receivedData.humidityNode26;
      receivedData.pressureNode26 = topic.includes('pressure') ? message.toString() : receivedData.pressureNode26;
      break;
    case 'node27':
      receivedData.temperatureNode27 = topic.includes('temperature') ? message.toString() : receivedData.temperatureNode27;
      receivedData.humidityNode27 = topic.includes('humidity') ? message.toString() : receivedData.humidityNode27;
      receivedData.pressureNode27 = topic.includes('pressure') ? message.toString() : receivedData.pressureNode27;
      break;
  }
}

// Fungsi untuk menyimpan data ke MongoDB
function saveDataToMongoDB(receivedData) {
  const dataToSave = {
    node25: {
      temperature: receivedData.temperatureNode25,
      humidity: receivedData.humidityNode25,
      pressure: receivedData.pressureNode25,
    },
    node26: {
      temperature: receivedData.temperatureNode26,
      humidity: receivedData.humidityNode26,
      pressure: receivedData.pressureNode26,
    },
    node27: {
      temperature: receivedData.temperatureNode27,
      humidity: receivedData.humidityNode27,
      pressure: receivedData.pressureNode27,
    },
    timestamp: new Date(),
  };

  const mqttData = new iotMonitoringData(dataToSave);

  mqttData
    .save()
    .then(() => {
      console.log('Data saved to MongoDB');
    })
    .catch((error) => {
      console.error('Error saving data to MongoDB:', error);
    });

  // Reset receivedData untuk data selanjutnya
  for (const node of ['node25', 'node26', 'node27']) {
    receivedData[`temperature${node}`] = null;
    receivedData[`humidity${node}`] = null;
    receivedData[`pressure${node}`] = null;
  }
}

// Fungsi untuk menjalankan pemrosesan data
function startMqttDataProcessing() {
  const receivedData = {
    temperatureNode25: null,
    humidityNode25: null,
    pressureNode25: null,
    temperatureNode26: null,
    humidityNode26: null,
    pressureNode26: null,
    temperatureNode27: null,
    humidityNode27: null,
    pressureNode27: null,
  };

  // Koneksi ke MongoDB
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Menghubungkan ke MQTT dengan callback handleMqttData
  Connection.connectionMqtt((topic, message) => {
    handleMqttData(topic, message, receivedData);
    saveDataToMongoDB(receivedData);
  });
}

// Panggil fungsi untuk memulai pemrosesan data
module.exports = {
  startMqttDataProcessing
}
