const url = "https://bmrjwnarwzygswkzrski.supabase.co/rest/v1/businesses?select=id,business_name,slug,profile_image,city,state,verified,industries,description,primary_phone,email,website&order=created_at.desc";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTA1MzksImV4cCI6MjA5NjQxNTM5MX0.Yk8bBA5-hRnlqkCLl-FJ5cnXvNA8jC7ReO_CH7eG7Kg";

fetch(url, {
  headers: {
    "apikey": token,
    "Authorization": `Bearer ${token}`
  }
}).then(r => r.json()).then(data => {
  console.log(data);
});
