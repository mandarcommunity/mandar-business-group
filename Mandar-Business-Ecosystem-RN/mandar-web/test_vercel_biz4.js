fetch("https://mandarcommunity.in/biz/jain-trademart")
  .then(r => r.text())
  .then(data => {
    // Extract the JSON data injected by Next.js or find "industries" text
    const idx = data.indexOf('Event Management');
    console.log(data.substring(idx - 50, idx + 50));
  });
