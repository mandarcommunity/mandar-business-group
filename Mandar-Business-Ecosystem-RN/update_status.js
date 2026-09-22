const fs = require('fs');

let reqFile = 'src/screens/MyRequirementsScreen.tsx';
let reqContent = fs.readFileSync(reqFile, 'utf8');
reqContent = reqContent.replace(
  'return { ...req, expiryText };',
  'let status = req.status;\n        if (daysLeft < 0 && status === "Active") status = "Expired";\n        return { ...req, expiryText, status };'
);
fs.writeFileSync(reqFile, reqContent, 'utf8');

let adFile = 'src/screens/MyAdvertisementsScreen.tsx';
let adContent = fs.readFileSync(adFile, 'utf8');
adContent = adContent.replace(
  'status: ad.status,',
  'status: daysLeft < 0 && ad.status === "Active" ? "Expired" : ad.status,'
);
fs.writeFileSync(adFile, adContent, 'utf8');

// The user also mentioned to REVERT the testing expiration extension
let dbUpdate = `
const { Client } = require('pg');

const client = new Client({
  host: 'db.bmrjwnarwzygswkzrski.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Future@2212199',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    const res = await client.query("UPDATE public.advertisements SET expires_at = NOW() - INTERVAL '1 days' WHERE expires_at > NOW() + INTERVAL '25 days'");
    console.log("Reverted updated rows:", res.rowCount);
  } catch (err) {
    console.error("Error connecting or querying:", err.message);
  } finally {
    await client.end();
  }
}

run();
`;
fs.writeFileSync('backend/revert_ads.js', dbUpdate, 'utf8');

