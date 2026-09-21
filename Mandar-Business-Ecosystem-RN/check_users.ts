import { Client } from 'pg';

const client = new Client({
  host: 'db.bmrjwnarwzygswkzrski.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Future@2212199',
});

async function run() {
  try {
    await client.connect();
    
    const users = await client.query("SELECT * FROM information_schema.columns WHERE table_name = 'users';");
    console.log(users.rows.map(r => r.column_name));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}
run();
