import sys
import re

files = ['src/screens/CreateRequirementScreen.tsx', 'src/screens/EditRequirementScreen.tsx']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add state
    if 'referenceImageBase64' not in content:
        content = re.sub(
            r'const \[referenceImage, setReferenceImage\] = useState<string \| null>\(null\);|const \[referenceImage, setReferenceImage\] = useState\(route\.params\?\.requirement\?\.image_url \|\| ""\);',
            r'\g<0>\n  const [referenceImageBase64, setReferenceImageBase64] = useState<string | null>(null);',
            content
        )
        
    # Add setting state
    if 'setReferenceImageBase64' not in content:
        content = re.sub(
            r'setReferenceImage\(result\.assets\[0\]\.uri\);',
            r'setReferenceImage(result.assets[0].uri);\n                    setReferenceImageBase64(result.assets[0].base64 || null);',
            content
        )

    # Add to API Call
    if 'base64Image: referenceImageBase64' not in content:
        content = re.sub(
            r'image_url: referenceImage(\s*})',
            r'image_url: referenceImage,\n          base64Image: referenceImageBase64\1',
            content
        )

    with open(filepath, 'w') as f:
        f.write(content)
