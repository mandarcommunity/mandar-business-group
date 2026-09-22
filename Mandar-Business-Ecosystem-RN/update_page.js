const fs = require('fs');
let file = 'mandar-web/app/page.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "export default async function Home() {",
  "export default async function Home() {\n  const { data: industries } = await supabase.from('industries').select('*').eq('is_active', true).order('name');"
);

content = content.replace(
  "return <LandingPageClient businesses={businesses || []} />;",
  "return <LandingPageClient businesses={businesses || []} industries={industries || []} />;"
);

fs.writeFileSync(file, content, 'utf8');
