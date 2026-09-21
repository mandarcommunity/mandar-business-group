import sys

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

content = "import { useFocusEffect } from '@react-navigation/native';\\nimport { useCallback } from 'react';\\n" + content

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
