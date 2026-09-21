import sys
import re

with open('src/screens/LoginScreen.tsx', 'r') as f:
    content = f.read()

# Add Alert to react-native imports if missing
if 'Alert' not in content:
    content = content.replace('import {', 'import { Alert,', 1)

content = content.replace('alert(', 'Alert.alert("Login Failed", ')

with open('src/screens/LoginScreen.tsx', 'w') as f:
    f.write(content)
