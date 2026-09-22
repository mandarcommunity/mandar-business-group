fetch("https://mandarcommunity.in/api/debug-biz")
  .then(r => r.json())
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(e => console.log("Fetch Error:", e.message));
