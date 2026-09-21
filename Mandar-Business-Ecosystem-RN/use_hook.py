import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('export default function VerificationSubmissionScreen({ navigation }: any) {', 'export default function VerificationSubmissionScreen() {\\n  const navigation = useNavigation<any>();')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
