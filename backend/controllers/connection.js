const mqtt = require("mqtt");
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

const nodes = ['node25', 'node26', 'node27'];

const authMqtt = (node) => {
  const mqttUser = process.env.MQTT_USER;
  const mqttPass = process.env.MQTT_PASS;
  const mqttUrl = process.env.MQTT_ADDRESS;

  return `mqtt://${mqttUser}:${mqttPass}@${mqttUrl}/${node}`;
}

const connectionMqtt = (onMessageCallback) => {
  // Membuat koneksi sekali dan menggunakannya untuk semua node
  const mqttClient = mqtt.connect(authMqtt(nodes[0]));
  let connected = false; // Variabel untuk melacak apakah sudah terhubung

  mqttClient.on('connect', () => {
    if (!connected) {
      console.log(`Connected to MQTT broker for ${nodes[0]} ❤️`);
      connected = true; // Setel connected menjadi true setelah koneksi pertama
    }

    // Melakukan langganan topik untuk semua node
    nodes.forEach((node) => {
      let topicsToSubscribe = [];

      // Tambahkan topik yang spesifik untuk setiap node
      if (node === 'node25') {
        topicsToSubscribe.push(
          process.env[`MQTT_TOPIC_TEMPERATURE_NODE25`],
          process.env[`MQTT_TOPIC_HUMIDITY_NODE25`],
          process.env[`MQTT_TOPIC_PRESSURE_NODE25`],
          process.env[`MQTT_TOPIC_ALTITUDE_NODE25`],
          process.env[`MQTT_TOPIC_GAS_MQ135_NODE25`],
          process.env[`MQTT_TOPIC_GAS_MQ2_NODE25`],
          process.env[`MQTT_TOPIC_STATUS_NODE25`]
          // Tambahkan lebih banyak topik khusus untuk node25 jika diperlukan
        );
      } else if (node === 'node26') {
        topicsToSubscribe.push(
          process.env[`MQTT_TOPIC_TEMPERATURE_NODE26`],
          process.env[`MQTT_TOPIC_HUMIDITY_NODE26`],
          process.env[`MQTT_TOPIC_PRESSURE_NODE26`],
          process.env[`MQTT_TOPIC_DUST_NODE26`],
          process.env[`MQTT_TOPIC_STATUS_NODE26`],
          process.env[`MQTT_TOPIC_ALTITUDE_NODE26`]
          // Tambahkan lebih banyak topik khusus untuk node26 jika diperlukan
        );
      } else if (node === 'node27') {
        // Tambahkan topik khusus untuk node27 jika diperlukan
      }

      // Subscribe ke topik yang telah ditentukan untuk node tertentu
      mqttClient.subscribe(topicsToSubscribe);
    });

    mqttClient.on('message', onMessageCallback);
  });

  mqttClient.on('error', (error) => {
    console.error(`Error connecting to MQTT broker for ${nodes[0]}:`, error);
  });
}

module.exports = {
  connectionMqtt
}
