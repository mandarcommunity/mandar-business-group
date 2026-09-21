import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('export default function VerificationSubmissionScreen() {', 'export default function VerificationSubmissionScreen({ navigation }: any) {')
content = content.replace('const navigation = useNavigation<any>();', '')
content = content.replace('navigation.navigate("VerificationStatus")', 'navigation.goBack()')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
