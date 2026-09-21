import sys
import re

files = [
    'src/screens/CreateAdScreen.tsx',
    'src/screens/CreateRequirementScreen.tsx',
    'src/screens/EditAdvertisementScreen.tsx',
    'src/screens/EditRequirementScreen.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix bad backslashes
    content = content.replace("mediaTypes: [\\'images\\'],", "mediaTypes: ['images'],")
    content = content.replace("quality: 0.5,\n          base64: true,\n          base64: true,", "quality: 0.5,\n          base64: true,")
    
    with open(filepath, 'w') as f:
        f.write(content)
