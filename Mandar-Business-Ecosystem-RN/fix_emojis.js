const fs = require('fs');
let pathChatCard = 'src/components/chat/ChatCard.tsx';
let contentChatCard = fs.readFileSync(pathChatCard, 'utf8');

contentChatCard = contentChatCard.replace(/\?\? Photo/g, "\\uD83D\\uDCF7 Photo");
fs.writeFileSync(pathChatCard, contentChatCard, 'utf8');

let pathChatsScreen = 'src/screens/ChatsScreen.tsx';
let contentChatsScreen = fs.readFileSync(pathChatsScreen, 'utf8');
contentChatsScreen = contentChatsScreen.replace(/\?\? Blocked/g, "\\uD83D\\uDEAB Blocked");
fs.writeFileSync(pathChatsScreen, contentChatsScreen, 'utf8');

console.log("Emojis fixed!");
