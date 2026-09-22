fetch("https://mandarcommunity.in/")
  .then(r => r.text())
  .then(data => {
    console.log(data.includes('Top Rated Businesses') ? "Home Page HAS Businesses!" : "Home Page is BROKEN!");
  });
