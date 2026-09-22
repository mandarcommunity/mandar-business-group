const http = require('https');
http.get('https://mandarcommunity.in/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(data.includes('Top Rated Businesses') ? "Has Top Rated Businesses Section" : "No Section");
    console.log(data.includes('/biz/') ? "Has Business Links!" : "No Business Links!");
  });
});
