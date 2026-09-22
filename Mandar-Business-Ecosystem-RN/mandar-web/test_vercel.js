const http = require('https');
http.get('https://mandarcommunity.in/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(data.includes('Jain Trademart') ? "Home page HAS Jain Trademart!" : "Home page DOES NOT HAVE Jain Trademart!");
  });
});
