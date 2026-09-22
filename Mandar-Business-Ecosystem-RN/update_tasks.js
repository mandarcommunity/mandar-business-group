const fs = require('fs');
const taskFile = 'c:/Users/HP/.gemini/antigravity/brain/7629382e-982e-4505-a56f-bf9b4894d20a/task.md';
let content = fs.readFileSync(taskFile, 'utf8');

content = content.replace('- [ ] 5.', '- [x] 5.');

fs.writeFileSync(taskFile, content, 'utf8');
