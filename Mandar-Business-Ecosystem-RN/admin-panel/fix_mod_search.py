import sys
import re

with open('admin-panel/src/screens/ModerationScreen.tsx', 'r') as f:
    content = f.read()

bad_logic = '''
  const filteredData = data.filter(item => {
    const title = (item.title || item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || desc.includes(q);
  });
'''

good_logic = '''
  const filteredData = data.filter(item => {
    const title = (item.title || item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const user = (item.users?.full_name || '').toLowerCase();
    const biz = (item.businesses?.business_name || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || desc.includes(q) || user.includes(q) || biz.includes(q);
  });
'''

content = content.replace(bad_logic.strip(), good_logic.strip())

with open('admin-panel/src/screens/ModerationScreen.tsx', 'w') as f:
    f.write(content)
