const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  fetched_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CryptoData', cryptoDataSchema);
