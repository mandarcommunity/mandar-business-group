import sys

def inject_state(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add state declaration
    if 'profileImageBase64' not in content:
        content = content.replace(
            'const [profileImage, setProfileImage] = useState("");',
            'const [profileImage, setProfileImage] = useState("");\n  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);'
        )

    # Add to API payload (updateBusiness)
    # The payload looks like:
    # {
    #   businessName,
    #   contactPerson,
    #   profileImage,
    #   ...
    # }
    if 'base64Image: profileImageBase64' not in content:
        content = content.replace(
            'profileImage,\n',
            'profileImage,\n        base64Image: profileImageBase64,\n'
        )

    with open(filepath, 'w') as f:
        f.write(content)

inject_state('src/screens/EditProfileScreen.tsx')
inject_state('src/screens/SetupBusinessScreen.tsx')
