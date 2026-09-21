import sys
import re

files = ['src/screens/EditProfileScreen.tsx', 'src/screens/SetupBusinessScreen.tsx']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    if 'profileImageBase64' not in content:
        # Add base64 state
        content = re.sub(
            r'const \[profileImage, setProfileImage\] = useState[^\n]*\n',
            r'\g<0>  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);\n',
            content
        )

        # In EditProfileScreen, `setProfileImage` inside ProfileImageUpload is handled via:
        # const result = await ImagePicker.launchImageLibraryAsync
        content = re.sub(
            r'mediaTypes: \[\'images\'\],(\s*allowsEditing: true,)?\s*aspect: \[1, 1\],\s*quality: \d\.\d,?',
            r"mediaTypes: ['images'],\n                  allowsEditing: true,\n                  aspect: [1, 1],\n                  quality: 0.5,\n                  base64: true,",
            content
        )

        content = re.sub(
            r'setProfileImage\(result\.assets\[0\]\.uri\);',
            r'setProfileImage(result.assets[0].uri);\n                  setProfileImageBase64(result.assets[0].base64 || null);',
            content
        )

        # Update API payload
        content = re.sub(
            r'profileImage: profileImage',
            r'profileImage,\n        base64Image: profileImageBase64',
            content
        )
        content = re.sub(
            r'profileImage,(\s*description:)',
            r'profileImage,\n            base64Image: profileImageBase64,\1',
            content
        )
        
    with open(filepath, 'w') as f:
        f.write(content)
