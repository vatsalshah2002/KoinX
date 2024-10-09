const express = require('express');
const CryptoData = require('../models/CryptoData'); 
const router = express.Router();

const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / prices.length;
    return Math.sqrt(variance);
  };

router.get('/', async (req, res) => {
  try {
    const { coin } = req.query;
    const coinNameMap = {
      bitcoin: 'Bitcoin',
      'matic-network': 'Matic',
      ethereum: 'Ethereum'
    };

    if (!coinNameMap[coin]) {
      return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    const latestData = await CryptoData.findOne({ name: coinNameMap[coin] })
      .sort({ fetched_at: -1 })
      .exec();

    if (!latestData) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.json({
      price: latestData.current_price,
      marketCap: latestData.market_cap,
      '24hChange': latestData.price_change_percentage_24h
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/deviation', async (req, res) => {
    try {
      const { coin } = req.query;
      const coinNameMap = {
        bitcoin: 'Bitcoin',
        'matic-network': 'Matic',
        ethereum: 'Ethereum'
      };
  
      if (!coinNameMap[coin]) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
      }
  
      const records = await CryptoData.find({ name: coinNameMap[coin] })
        .sort({ fetched_at: -1 })
        .limit(100)
        .exec();
  
      if (records.length === 0) {
        return res.status(404).json({ error: 'No data found' });
      }
  
      
      const prices = records.map(record => record.current_price);
  
      // Calculate standard deviation
      const deviation = calculateStandardDeviation(prices);
  
      res.json({
        deviation: deviation.toFixed(2) 
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
