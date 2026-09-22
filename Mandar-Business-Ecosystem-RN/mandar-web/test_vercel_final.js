fetch("https://mandarcommunity.in/industry/event-management")
  .then(r => r.text())
  .then(data => {
    console.log(data.includes('Jain Trademart') ? "Industry Page HAS Jain Trademart!" : "Industry Page DOES NOT HAVE Jain Trademart!");
  });
