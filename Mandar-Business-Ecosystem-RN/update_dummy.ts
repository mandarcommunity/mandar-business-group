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
    
    await client.query("UPDATE businesses SET verification_document_url = 'https://images.unsplash.com/photo-1633265486064-086b219458ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' WHERE verification_document_url = 'https://example.com/dummy-document.pdf';");
    console.log("Updated documents successfully!");
    
  } catch (err) {
    console.error("Error connecting or querying:", err);
  } finally {
    await client.end();
  }
}

run();
