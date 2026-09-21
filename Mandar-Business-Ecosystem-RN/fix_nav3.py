import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('{ text: "OK", onPress: () => nav.goBack() }', '{ text: "OK", onPress: function() { nav.goBack(); } }')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
