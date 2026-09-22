const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://bmrjwnarwzygswkzrski.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY5MDUzOSwiZXhwIjoyMTA0MjY2NTM5fQ.nu832FnmENK3tlo-oOzWc_jIL7QU7sM_ok7yL9kAFug');
async function test() {
  const { data } = await supabase.from('businesses').select('*').limit(1);
  console.log(Object.keys(data[0]));
}
test();
