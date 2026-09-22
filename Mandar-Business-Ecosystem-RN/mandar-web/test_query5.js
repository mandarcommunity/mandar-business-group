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
  const { data, error } = await supabase.from('products').select('*').limit(1);
  console.log("Error:", error);
  if(data && data.length > 0) {
     console.log("Columns:", Object.keys(data[0]));
  }
}
run();
