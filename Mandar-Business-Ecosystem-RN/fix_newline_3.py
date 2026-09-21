import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('{\\n  const navigation', '{\n  const navigation')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
