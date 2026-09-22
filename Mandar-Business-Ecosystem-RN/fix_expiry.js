const fs = require('fs');

let reqFile = 'src/screens/MyRequirementsScreen.tsx';
let reqContent = fs.readFileSync(reqFile, 'utf8');
reqContent = reqContent.replace('Math.ceil(diffTime', 'Math.floor(diffTime');
fs.writeFileSync(reqFile, reqContent, 'utf8');

let adFile = 'src/screens/MyAdvertisementsScreen.tsx';
let adContent = fs.readFileSync(adFile, 'utf8');
adContent = adContent.replace('Math.ceil((new', 'Math.floor((new');
fs.writeFileSync(adFile, adContent, 'utf8');
