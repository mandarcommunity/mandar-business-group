fetch("https://mandarcommunity.in/industry/event-management")
  .then(r => r.text())
  .then(data => {
    // Is it showing the JS filter or the old contains?
    // We can't see server-side code. But wait, if it's Next.js 15, we can check the build ID.
    // Or just fetch /industries and see if the search bar is there (from my previous commits)
    console.log(data.includes('Browse the complete list') ? "Old Subtitle" : "New Subtitle");
  });
