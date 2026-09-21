import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('mediaTypes: ImagePicker.MediaTypeOptions.Images', "mediaTypes: ['images']")

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
