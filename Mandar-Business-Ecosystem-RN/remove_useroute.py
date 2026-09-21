import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'import\s*\{\s*useRoute\s*,?\s*\}\s*from\s*["\']@react-navigation/native["\'];', '', content)

# I already put import { useNavigation, useRoute } from "@react-navigation/native"; at the top in the previous step,
# so removing the old ones will fix it.

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
