import sys

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

# 1. State for base64
if 'documentBase64' not in content:
    content = content.replace('const [documentUploaded, setDocumentUploaded] = useState(false);', 'const [documentUploaded, setDocumentUploaded] = useState(false);\n  const [documentBase64, setDocumentBase64] = useState<string>("");')

# 2. Modify ImagePicker call
old_picker = '''const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ['images'],
                  allowsEditing: true,
                  quality: 0.8,
                });
                if (!result.canceled) {
                  setDocumentUploaded(true);
                }'''
new_picker = '''const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ['images'],
                  allowsEditing: true,
                  quality: 0.6,
                  base64: true,
                });
                if (!result.canceled && result.assets[0].base64) {
                  setDocumentBase64(result.assets[0].base64);
                  setDocumentUploaded(true);
                }'''
content = content.replace(old_picker, new_picker)

# 3. Modify submit call
old_submit = '''const dummyUrl = "https://images.unsplash.com/photo-1633265486064-086b219458ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // A sample document placeholder
      
      await submitVerificationRequest(token as string, dummyUrl, docType);'''
new_submit = '''const dummyUrl = ""; // No dummy URL since we are uploading base64
      
      await submitVerificationRequest(token as string, dummyUrl, docType, documentBase64);'''
content = content.replace(old_submit, new_submit)

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
