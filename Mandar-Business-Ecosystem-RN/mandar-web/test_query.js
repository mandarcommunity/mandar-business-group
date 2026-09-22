const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://bmrjwnarwzygswkzrski.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY5MDUzOSwiZXhwIjoyMTA0MjY2NTM5fQ.nu832FnmENK3tlo-oOzWc_jIL7QU7sM_ok7yL9kAFug');
async function test() {
  const industryName = "Event Management";
  const { data, error } = await supabase.from('businesses').select('business_name, industries').contains('industries', [industryName]);
  console.log("Contains array filter:", data);

  const { data: d2, error: e2 } = await supabase.from('businesses').select('business_name, industries').cs('industries', [industryName]);
  console.log("cs filter:", d2);

  const { data: d3, error: e3 } = await supabase.from('businesses').select('business_name, industries');
  const filtered = d3.filter(b => b.industries && b.industries.includes(industryName));
  console.log("Manual JS filter count:", filtered.length);
}
test();
