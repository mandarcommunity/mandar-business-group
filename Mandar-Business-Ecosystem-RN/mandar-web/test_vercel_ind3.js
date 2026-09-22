fetch("https://mandarcommunity.in/industry/event-management")
  .then(r => r.text())
  .then(data => {
    const idx = data.indexOf('Businesses Found');
    if (idx > -1) console.log(data.substring(idx - 20, idx + 20));
    
    const idx2 = data.indexOf('No businesses found yet');
    if (idx2 > -1) console.log("Found: No businesses found yet");
  });
