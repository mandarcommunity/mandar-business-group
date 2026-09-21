import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

# Remove duplicate imports
content = content.replace('import { submitVerificationRequest } from "../services/business.service";\\nimport { getAccessToken } from "../utils/storage";\\nimport { Alert } from "react-native";\\nimport { useNavigation } from "@react-navigation/native";', '')

# We will add them carefully
new_imports = '''import { getBusinessById, submitVerificationRequest } from "../services/business.service";
import { getAccessToken } from "../utils/storage";
import { Alert } from "react-native";'''

content = re.sub(r'import\s*{\s*getBusinessById\s*}\s*from\s*"../services/business\.service";\s*import\s*{\s*getAccessToken\s*}\s*from\s*"../utils/storage";', new_imports, content)

# Inject the handler
state_block = '''  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!documentUploaded) return;
    setIsSubmitting(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("No token found");
      
      const docType = selectedDocument || "GST Certificate";
      const dummyUrl = "https://example.com/dummy-document.pdf";
      
      await submitVerificationRequest(token as string, dummyUrl, docType);
      
      Alert.alert("Success", "Your verification request has been submitted successfully.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };
'''

content = re.sub(r'const\s*\[\s*documentUploaded,\s*setDocumentUploaded,\s*\]\s*=\s*useState\(false\);', state_block, content)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
