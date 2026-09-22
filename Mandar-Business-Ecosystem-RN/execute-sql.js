const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient('https://bmrjwnarwzygswkzrski.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmp3bmFyd3p5Z3N3a3pyc2tpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY5MDUzOSwiZXhwIjoyMTA0MjY2NTM5fQ.nu832FnmENK3tlo-oOzWc_jIL7QU7sM_ok7yL9kAFug', {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  const sql = fs.readFileSync(process.argv[2], 'utf8');
  // There is no rpc('execute_sql') by default unless we created one.
  // Did we create a function called 'execute_sql' before?
}
main();
