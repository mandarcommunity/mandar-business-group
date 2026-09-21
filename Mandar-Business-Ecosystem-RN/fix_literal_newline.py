import sys

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { useFocusEffect } from '@react-navigation/native';\\nimport { useCallback } from 'react';\\n", "import { useFocusEffect } from '@react-navigation/native';\nimport { useCallback } from 'react';\n")

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
