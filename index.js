const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const fetchCryptoData = require('./jobs/cryptoJob');
const statsRoute = require('./routes/stats');
const app = express();

// Connect to MongoDB
connectDB();

// Schedule the job to run every 2 hours
//cron.schedule('0 */2 * * *', () => {
  //console.log('Fetching cryptocurrency data...');
  //fetchCryptoData();
//});
fetchCryptoData();  // Manually trigger the job once when the server starts
app.use('/stats', statsRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
