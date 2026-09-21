import sys

def add_picker_to_setup(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the ImagePicker call in SetupBusinessScreen
    # It looks like: setProfileImage(result.assets[0].uri);
    
    if 'setProfileImageBase64(result.assets[0].base64' not in content:
        content = content.replace(
            'setProfileImage(result.assets[0].uri);',
            'setProfileImage(result.assets[0].uri);\n                  setProfileImageBase64(result.assets[0].base64 || null);'
        )
        
        content = content.replace(
            'mediaTypes: [\'images\'],',
            'mediaTypes: [\'images\'],\n                  allowsEditing: true,\n                  aspect: [1, 1],\n                  quality: 0.5,\n                  base64: true,'
        )

    with open(filepath, 'w') as f:
        f.write(content)

add_picker_to_setup('src/screens/SetupBusinessScreen.tsx')
