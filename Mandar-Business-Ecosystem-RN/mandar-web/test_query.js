require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase
    .from('businesses')
    .select('id, business_name, products(name)')
    .limit(2);
  console.log("Data:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
}
test();
