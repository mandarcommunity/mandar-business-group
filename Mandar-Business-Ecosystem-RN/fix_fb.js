const fs = require('fs');
let utilsCode = fs.readFileSync('mandar-web/lib/utils.js', 'utf8');
utilsCode = utilsCode.replace('"??"', '"??"');
fs.writeFileSync('mandar-web/lib/utils.js', utilsCode, 'utf8');
