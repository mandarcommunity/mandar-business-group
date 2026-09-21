const fs = require('fs');
['app/biz/[slug]/page.js', 'app/p/[slug]/page.js', 'app/req/[slug]/page.js', 'app/ad/[slug]/page.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const \{ slug \} = params;/g, 'const { slug } = await params;');
  fs.writeFileSync(file, content);
});
