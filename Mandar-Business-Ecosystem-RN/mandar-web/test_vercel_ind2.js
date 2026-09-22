fetch("https://mandarcommunity.in/industry/event-management")
  .then(r => r.text())
  .then(data => {
    const match = data.match(/(\d+) Businesses Found/);
    console.log("Count:", match ? match[1] : "Not found");
  });
