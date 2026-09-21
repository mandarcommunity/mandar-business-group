import sys

with open('src/context/AuthContext.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { DeviceEventEmitter,\n\n  createContext,', 'import { createContext,')
content = "import { DeviceEventEmitter } from 'react-native';\n" + content

with open('src/context/AuthContext.tsx', 'w') as f:
    f.write(content)
