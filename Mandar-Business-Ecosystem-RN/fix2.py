import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { getBusinessById, submitVerificationRequest } from "../services/business.service";\\nimport { getAccessToken } from "../utils/storage";\\nimport { Alert } from "react-native";', '')

new_imports = '''
import { getBusinessById, submitVerificationRequest } from "../services/business.service";
import { getAccessToken } from "../utils/storage";
import { Alert } from "react-native";
'''
content = re.sub(r'import\s*{\s*getBusinessById\s*}\s*from\s*"../services/business\.service";', new_imports, content)

# Fix navigation.goBack() -> navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Profile')
content = content.replace('navigation.goBack()', 'navigation.navigate("VerificationStatus")')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
