const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://bmrjwnarwzygswkzrski.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTA1MzksImV4cCI6MjA5NjQxNTM5MX0.Yk8bBA5-hRnlqkCLl-FJ5cnXvNA8jC7ReO_CH7eG7Kg');
async function test() {
  const industryName = "Event Management";
  const { data, error } = await supabase.from('businesses').select('business_name, industries').contains('industries', [industryName]);
  console.log("Anon key Contains filter:", data);
  console.log("Error:", error);
}
test();
