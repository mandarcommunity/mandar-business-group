fetch("https://mandarcommunity.in/biz/jain-trademart")
  .then(r => {
    console.log("Status:", r.status);
    return r.text();
  })
  .then(data => {
    console.log(data.includes('Jain Trademart') ? "Profile Page WORKS!" : "Profile Page is BROKEN or 404!");
  });
