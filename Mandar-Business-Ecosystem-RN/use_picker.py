import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = 'import * as ImagePicker from "expo-image-picker";\\n'
content = content.replace('import { Alert } from "react-native";', 'import { Alert } from "react-native";\\n' + import_statement)

# Modify document upload handler
# Search for onPress={() => setDocumentUploaded(true)}
new_handler = '''onPress={async () => {
                try {
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    quality: 0.8,
                  });
                  if (!result.canceled) {
                    setDocumentUploaded(true);
                  }
                } catch (error) {
                  Alert.alert("Error", "Failed to pick an image.");
                }
              }}'''

content = re.sub(r'onPress=\{\(\)\s*=>\s*setDocumentUploaded\(true\)\}', new_handler, content)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
