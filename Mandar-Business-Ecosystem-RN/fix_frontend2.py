import sys

with open('admin-panel/src/screens/UserManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('{user.role.toUpperCase()}', '{(user.role || "user").toUpperCase()}')
content = content.replace('{selectedUser.role.toUpperCase()}', '{(selectedUser.role || "user").toUpperCase()}')
content = content.replace('user.role ===', '(user.role || "user") ===')
content = content.replace('selectedUser.role ===', '(selectedUser.role || "user") ===')

with open('admin-panel/src/screens/UserManagementScreen.tsx', 'w') as f:
    f.write(content)
