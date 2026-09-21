import sys
import re

def process_file(filepath, state_name, api_body_key):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Add base64 state if not exists
        if f"const [{state_name}Base64, set{state_name.capitalize()}Base64]" not in content:
            # Find the state declaration of state_name
            # It's usually like: const [ productImage, setProductImage, ] = useState<string | null>(null);
            # We'll just add it after imageUploading state or somewhere safe
            
            # Since React Native code is messy, we'll just insert it after the component declaration
            comp_match = re.search(r'export default function \w+\(\) \{', content)
            if comp_match:
                insert_pos = comp_match.end()
                content = content[:insert_pos] + f"\n  const [{state_name}Base64, set{state_name.capitalize()}Base64] = useState<string | null>(null);" + content[insert_pos:]

        # Modify ImagePicker call
        content = re.sub(
            r'mediaTypes: (.*?),\s*allowsEditing: true,(\s*aspect: \[.*?\],)?(\s*quality: .*?,)?',
            r'mediaTypes: \1,\n          allowsEditing: true,\2\n          quality: 0.5,\n          base64: true,',
            content
        )
        content = re.sub(
            r'mediaTypes: \[\'images\'\],\s*allowsEditing: true,(\s*aspect: \[.*?\],)?(\s*quality: .*?,)?',
            r'mediaTypes: [\'images\'],\n          allowsEditing: true,\1\n          quality: 0.5,\n          base64: true,',
            content
        )

        # Modify the set state logic inside handleImageUpload
        # Usually: setProductImage(result.assets[0].uri);
        set_state_regex = r'(set' + state_name.capitalize() + r'\(result\.assets\[0\]\.uri\);)'
        if not re.search(r'set' + state_name.capitalize() + r'Base64', content):
            content = re.sub(
                set_state_regex,
                r'\1\n        set' + state_name.capitalize() + r'Base64(result.assets[0].base64 || null);',
                content
            )

        # Modify API Call Payload
        # Usually: image_url: productImage
        if api_body_key:
            payload_regex = api_body_key + r':\s*' + state_name
            if f"base64Image: {state_name}Base64" not in content:
                content = re.sub(
                    payload_regex,
                    r'\g<0>,\n            base64Image: ' + state_name + r'Base64',
                    content
                )

        with open(filepath, 'w') as f:
            f.write(content)
            
        print(f"Processed {filepath}")
    except Exception as e:
        print(f"Failed {filepath}: {e}")

process_file('src/screens/CreateAdScreen.tsx', 'productImage', 'image_url')
process_file('src/screens/CreateRequirementScreen.tsx', 'image', 'image_url')
process_file('src/screens/EditAdvertisementScreen.tsx', 'imageUri', 'image_url')
process_file('src/screens/EditRequirementScreen.tsx', 'imageUri', 'image_url')

