import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('const route =\\n    useRoute<any>();', 'const route =\\n    useRoute<any>();\\n  const navigation = useNavigation<any>();')
content = content.replace('const route =\n    useRoute<any>();', 'const route =\n    useRoute<any>();\n  const navigation = useNavigation<any>();')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
