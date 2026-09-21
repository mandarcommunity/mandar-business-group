import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('VerificationSubmissionScreen() {\\n  const navigation = useNavigation<any>();', 'VerificationSubmissionScreen() {\\n  const navigation = useNavigation<any>();')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
