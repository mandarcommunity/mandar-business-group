const fs = require('fs');
let file = 'admin-panel/src/components/Layout.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('/industries')) {
  // Add Factory icon to lucide imports if not present
  if (!content.includes('Factory')) {
    content = content.replace('Briefcase\n}', 'Briefcase,\n  Factory\n}');
  }

  // Add to MENU_ITEMS
  content = content.replace(
    "{ path: '/feedbacks', label: 'Feedback', icon: MessageSquare, hasBadge: true },",
    "{ path: '/feedbacks', label: 'Feedback', icon: MessageSquare, hasBadge: true },\n  { path: '/industries', label: 'Industries Master', icon: Factory },"
  );
  
  fs.writeFileSync(file, content, 'utf8');
}
