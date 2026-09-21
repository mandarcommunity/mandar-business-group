import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

# Let's clean up the top of the file explicitly
# Find the start of the imports and the end of the imports
# Actually, I can just use a simple regex to replace duplicate imports.
content = re.sub(r'import { getBusinessById, submitVerificationRequest } from "../services/business.service";\s*import { getAccessToken } from "../utils/storage";\s*import { Alert } from "react-native";', '', content, count=1)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
