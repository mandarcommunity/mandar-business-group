import sys

with open('admin-panel/src/screens/UserManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('setUsers(res.data.data);', 'setUsers(res.data.data || []);')

with open('admin-panel/src/screens/UserManagementScreen.tsx', 'w') as f:
    f.write(content)
