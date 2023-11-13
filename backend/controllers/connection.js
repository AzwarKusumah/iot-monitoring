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
      mqttClient.subscribe([
        process.env[`MQTT_TOPIC_TEMPERATURE_${node.toUpperCase()}`],
        process.env[`MQTT_TOPIC_HUMIDITY_${node.toUpperCase()}`],
        process.env[`MQTT_TOPIC_PRESSURE_${node.toUpperCase()}`],
        process.env[`MQTT_TOPIC_STATUS_${node.toUpperCase()}`],
        // Tambahkan lebih banyak langganan topik di sini sesuai kebutuhan
      ]);
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
