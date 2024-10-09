const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const fetchCryptoData = require('./jobs/cryptoJob');
const statsRoute = require('./routes/stats');
const app = express();

connectDB();

cron.schedule('0 */2 * * *', () => {
  fetchCryptoData();
});

fetchCryptoData();  
app.use('/stats', statsRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
