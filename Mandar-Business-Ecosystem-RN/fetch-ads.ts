import { Client } from 'pg';
const client = new Client({
  host: 'db.bmrjwnarwzygswkzrski.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Future@2212199',
});
async function run() {
  await client.connect();
  const res = await client.query('SELECT title, row_placement FROM home_sponsored_ads');
  console.log(res.rows);
  await client.end();
}
run();
