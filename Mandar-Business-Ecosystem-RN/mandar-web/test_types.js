const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://bmrjwnarwzygswkzrski.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY5MDUzOSwiZXhwIjoyMTA0MjY2NTM5fQ.nu832FnmENK3tlo-oOzWc_jIL7QU7sM_ok7yL9kAFug'); // Service role to guarantee access

async function test() {
  const { data } = await supabase.from('businesses').select('business_name, industries').eq('business_name', 'Jain Trademart');
  console.log("Raw Jain Trademart data:", data[0]);
  console.log("Type of industries:", typeof data[0].industries, Array.isArray(data[0].industries));

  // Test `.contains` exactly like the web app
  const industryName = "Event Management";
  const { data: d2, error } = await supabase.from('businesses').select('business_name').contains('industries', [industryName]);
  console.log(".contains result:", d2, error);
  
  // Test `.cs` (contains string array?) - not valid in v2
  
  // Test if it's text search
  const { data: d3 } = await supabase.from('businesses').select('business_name').textSearch('industries', `'Event Management'`);
  console.log(".textSearch result:", d3);

  // Test `.contains` with stringified JSON string
  const { data: d4 } = await supabase.from('businesses').select('business_name').contains('industries', JSON.stringify([industryName]));
  console.log(".contains JSON.stringify result:", d4);
}
test();
