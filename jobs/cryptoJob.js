const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const fetchCryptoData = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price';
    const params = {
      ids: 'bitcoin,ethereum,matic-network',
      vs_currencies: 'usd',
      include_market_cap: 'true',
      include_24hr_change: 'true'
    };

    const response = await axios.get(url, { params });
    const data = response.data;

    console.log('Fetched data:', data);

    const cryptoList = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        current_price: data.bitcoin.usd,
        market_cap: data.bitcoin.usd_market_cap,
        price_change_percentage_24h: data.bitcoin.usd_24h_change
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        current_price: data.ethereum.usd,
        market_cap: data.ethereum.usd_market_cap,
        price_change_percentage_24h: data.ethereum.usd_24h_change
      },
      {
        name: 'Matic',
        symbol: 'MATIC',
        current_price: data['matic-network'].usd,
        market_cap: data['matic-network'].usd_market_cap,
        price_change_percentage_24h: data['matic-network'].usd_24h_change
      }
    ];

    // Save each cryptocurrency's data in MongoDB
    for (const crypto of cryptoList) {
      const newCryptoData = new CryptoData(crypto);
      await newCryptoData.save();
    }
    
    console.log(`${crypto.name} data saved to database`);
    console.log('Cryptocurrency data saved successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

module.exports = fetchCryptoData;
