const http = require('https');
http.get('https://mandarcommunity.in/biz/jain-trademart', (res) => {
  console.log("Status:", res.statusCode);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(data.includes('Jain Trademart') ? "Profile Page WORKS!" : "Profile Page is BROKEN or 404!");
  });
});
