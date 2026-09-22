const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  if(line && line.includes('=')) {
    const [key, ...val] = line.split('=');
    envVars[key.trim()] = val.join('=').trim().replace(/"/g, '');
  }
});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select(`
      id, name, description, price, image_url, slug, business_id,
      business:businesses!inner(business_name, city, state, verified, slug, profile_image, industries, contact_person, mobile_number)
    `)
    .order('created_at', { ascending: false });
  console.log("Error:", prodError);
  console.log("Count:", products ? products.length : 0);
  if(products && products.length === 0) {
    // Try without inner
    const { data: p2 } = await supabase.from('products').select(`id, name, business:businesses(business_name)`).limit(5);
    console.log("Without inner:", p2);
  }
}
run();
