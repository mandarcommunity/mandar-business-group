import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

# Strip all instances of these imports
content = re.sub(r'import\s*\{\s*getBusinessById\s*\}\s*from\s*["\']\.\./services/business\.service["\'];', '', content)
content = re.sub(r'import\s*\{\s*submitVerificationRequest\s*\}\s*from\s*["\']\.\./services/business\.service["\'];', '', content)
content = re.sub(r'import\s*\{\s*getBusinessById\s*,\s*submitVerificationRequest\s*\}\s*from\s*["\']\.\./services/business\.service["\'];', '', content)
content = re.sub(r'import\s*\{\s*getAccessToken\s*\}\s*from\s*["\']\.\./utils/storage["\'];', '', content)
content = re.sub(r'import\s*\{\s*Alert\s*\}\s*from\s*["\']react-native["\'];', '', content)
content = re.sub(r'import\s*\{\s*useNavigation\s*\}\s*from\s*["\']@react-navigation/native["\'];', '', content)

# Inject them precisely once at the top
content = content.replace('import {', 'import { Alert } from "react-native";\nimport { useNavigation, useRoute } from "@react-navigation/native";\nimport { getAccessToken } from "../utils/storage";\nimport { getBusinessById, submitVerificationRequest } from "../services/business.service";\nimport {', 1)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
