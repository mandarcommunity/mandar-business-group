const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY5MDUzOSwiZXhwIjoyMTA0MjY2NTM5fQ.nu832FnmENK3tlo-oOzWc_jIL7QU7sM_ok7yL9kAFug";
fetch("https://bmrjwnarwzygswkzrski.supabase.co/rest/v1/businesses?select=business_name,industries&business_name=eq.Jain%20Trademart", {
  headers: {
    "apikey": token,
    "Authorization": `Bearer ${token}`
  }
}).then(r => r.json()).then(console.log);
