const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'backend/.env' });
const fs = require('fs');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const INDUSTRIES_STR = fs.readFileSync('src/constants/industries.ts', 'utf8');
const match = INDUSTRIES_STR.match(/\[([\s\S]*?)\]/);
if (!match) throw new Error("Could not parse industries");

const industriesList = match[1]
  .split(',')
  .map(i => i.trim().replace(/"/g, '').replace(/'/g, ''))
  .filter(i => i.length > 0);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

async function setup() {
  console.log('Creating industries table...');
  const { error: sqlError } = await supabase.rpc('run_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.industries (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        icon TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });
  
  if (sqlError && sqlError.code !== 'PGRST202') {
    // If run_sql is not available, we can't create table from JS client. 
    // We will do it via a standard script.
    console.log('SQL Error:', sqlError);
  }

}

setup();
