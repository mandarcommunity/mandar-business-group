const fs = require('fs');
['app/biz/[slug]/page.js', 'app/p/[slug]/page.js', 'app/ad/[slug]/page.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/biz\.profile_image \?/g, 'biz.profile_image && biz.profile_image.startsWith("http") ?');
  content = content.replace(/business\.profile_image \?/g, 'business.profile_image && business.profile_image.startsWith("http") ?');
  content = content.replace(/product\.images\s*&&\s*product\.images\.length\s*>\s*0\s*\?/g, 'product.images && product.images.length > 0 && product.images[0].startsWith("http") ?');
  content = content.replace(/ad\.image_url \?/g, 'ad.image_url && ad.image_url.startsWith("http") ?');
  fs.writeFileSync(file, content);
});
