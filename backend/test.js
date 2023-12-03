const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://azwariot:azwar123@localhost:27017/IotMonitoring', {
  useUnifiedTopology: true,
});

const SensorData = mongoose.model('sensordatas', {
  // Definisi model seperti sebelumnya
});

const getDataByTimeRange = async (startTime, endTime) => {
  try {
    return await SensorData.find({
      timestamp: {
        $gte: startTime,
        $lte: endTime,
      },
    }).maxTimeMS(30000); // Atur waktu maksimum menjadi 30 detik (sesuaikan sesuai kebutuhan)
  } catch (error) {
    console.error('Error during data retrieval:', error.message);
    throw error; // Lepaskan kembali kesalahan untuk penanganan di lapisan yang lebih tinggi
  }
};

// Tambahkan indeks pada bidang timestamp
SensorData.collection.createIndex({ timestamp: 1 });

app.get('/data-1-hour-ago', async (req, res) => {
  const currentTime = new Date();
  const oneHourAgo = new Date(currentTime - 60 * 60 * 1000);
  try {
    const data = await getDataByTimeRange(oneHourAgo, currentTime);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/data-12-hours-ago', async (req, res) => {
  const currentTime = new Date();
  const twelveHoursAgo = new Date(currentTime - 12 * 60 * 60 * 1000);
  try {
    const data = await getDataByTimeRange(twelveHoursAgo, currentTime);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/data-1-day-ago', async (req, res) => {
  const currentTime = new Date();
  const oneDayAgo = new Date(currentTime - 24 * 60 * 60 * 1000);
  try {
    const data = await getDataByTimeRange(oneDayAgo, currentTime);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/data-1-week-ago', async (req, res) => {
  const currentTime = new Date();
  const oneWeekAgo = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);
  try {
    const data = await getDataByTimeRange(oneWeekAgo, currentTime);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
