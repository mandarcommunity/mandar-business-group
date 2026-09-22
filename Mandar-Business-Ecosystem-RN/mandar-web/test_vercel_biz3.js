fetch("https://mandarcommunity.in/biz/jain-trademart")
  .then(r => r.text())
  .then(data => {
    if (data.includes('Jain Trademart')) console.log("Has Jain Trademart Name");
    if (data.includes('Event Management')) console.log("Has Event Management");
    if (data.includes('Contact Business')) console.log("Has Contact Business");
  });
