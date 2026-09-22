async function test() {
  const res = await fetch('http://localhost:5000/api/business', {
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  const jt = data.data.find(b => b.business_name === "Jain Trademart");
  console.log(JSON.stringify(jt, null, 2));
}
test();
