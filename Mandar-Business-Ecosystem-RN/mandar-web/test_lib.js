const { supabase } = require('./lib/supabase.js');
async function test() {
  const industryName = "Event Management";
  const { data, error } = await supabase.from('businesses').select('business_name, industries').contains('industries', [industryName]);
  console.log(data);
}
test();
