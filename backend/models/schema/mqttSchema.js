const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

const dataIotSchema = new mongoose.Schema({
    node25: {
        temperature: String,
        humidity: String,
        pressure: String
    },
    node26: {
        temperature: String,
        humidity: String,
        pressure: String
    },
    node27: {
        temperature: String,
        humidity: String,
        pressure: String
    },
    timestamp: { type: Date, default: Date.now }
});

const iotMonitoringData = mongoose.model('sensorData', dataIotSchema);

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    iotMonitoringData
};
