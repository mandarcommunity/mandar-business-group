

async function test() {
  try {
    const loginRes = await fetch('http://10.210.217.85:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'primecorpindia01@gmail.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.data.token;
    
    const bRes = await fetch('http://10.210.217.85:5000/api/business/a4f520e7-d973-41cd-b998-32f706a70857', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const bData = await bRes.json();
    console.log(JSON.stringify(bData, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}
test();
