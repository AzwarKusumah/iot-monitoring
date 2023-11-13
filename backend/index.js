const {startMqttDataProcessing} =require('./models/mqttModels')
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(require('./routes/route'));
startMqttDataProcessing();
app.get("/", (req, res) => {
    res.json({
      status: 200,
      message:
        "This API works!, please report if has any problems darlin❤️' - Ryuko",
    });
  });

app.listen(3000, '0.0.0.0', () => {
    console.log('API server is running on http://0.0.0.0:3000');
  });