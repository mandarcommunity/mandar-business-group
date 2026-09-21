import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('const navigation = useNavigation<any>();', 'const nav = useNavigation<any>();')
content = content.replace('navigation.goBack()', 'nav.goBack()')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
