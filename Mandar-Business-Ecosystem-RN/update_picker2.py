import sys
import re

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

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

# regex to match:
# onPress={() =>
#   setDocumentUploaded(
#     true
#   )
# }
content = re.sub(r'onPress=\{\(\)\s*=>\s*setDocumentUploaded\(\s*true\s*\)\s*\}', new_handler, content)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
