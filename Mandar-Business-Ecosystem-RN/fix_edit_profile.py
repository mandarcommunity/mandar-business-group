import sys
import re

with open('src/screens/EditProfileScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [\n    profileImage,\n        base64Image: profileImageBase64,\n    setProfileImage,\n  ] = useState("");',
    'const [\n    profileImage,\n    setProfileImage,\n  ] = useState("");\n  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);'
)

with open('src/screens/EditProfileScreen.tsx', 'w') as f:
    f.write(content)
