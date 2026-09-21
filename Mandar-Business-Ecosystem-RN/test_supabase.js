const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('advertisements')
    .select(`
      *,
      users (full_name, profile_image),
      businesses (business_name, profile_image)
    `)
    .limit(1);

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", JSON.stringify(data, null, 2));
  }
}

run();
