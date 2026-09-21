import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { Alert } from "react-native";\\nimport * as ImagePicker from "expo-image-picker";\\n', 'import { Alert } from "react-native";\nimport * as ImagePicker from "expo-image-picker";\n')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
