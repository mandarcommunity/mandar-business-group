const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8').replace(/\r/g, '');
const env = {};
envContent.split('\n').forEach(line => {
  if (line.includes('=')) {
    const parts = line.split('=');
    let val = parts.slice(1).join('=').trim();
    if(val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if(val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[parts[0].trim()] = val;
  }
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY']);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, description, price, image_url, slug, business_id,
      businesses(business_name, city, state, verified, slug, profile_image, industries, contact_person, mobile_number)
    `)
    .order('created_at', { ascending: false })
    .limit(5);
  
  console.log("Error 1:", error);
  console.log("Data 1:", data ? data.length : null);
}
run();
