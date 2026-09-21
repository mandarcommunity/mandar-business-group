import sys
import re

def update_product_screen(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Add import for ProductImage
        if 'ProductImage' not in content:
            content = content.replace('import ProductImageUpload', 'import ProductImageUpload, { ProductImage }')

        # Change state type
        content = content.replace('useState<string[]>([])', 'useState<ProductImage[]>([])')
        if filepath.endswith('EditProductScreen.tsx'):
            # EditProductScreen initializes images with map
            content = re.sub(
                r'setImages\(\s*product\.images\s*\|\|\s*\[\]\s*\);',
                r'setImages((product.images || []).map((uri: string) => ({ uri })));',
                content
            )

        # Modify API Payload
        if 'AddProductScreen' in filepath:
            content = re.sub(
                r'images,',
                r'images: images.map(i => i.uri),\n          base64Images: images.map(i => i.base64).filter(Boolean),',
                content
            )
        elif 'EditProductScreen' in filepath:
            content = re.sub(
                r'images,',
                r'images: images.map(i => i.uri),\n        base64Images: images.map(i => i.base64).filter(Boolean),',
                content
            )

        with open(filepath, 'w') as f:
            f.write(content)
            
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed {filepath}: {e}")

update_product_screen('src/screens/AddProductScreen.tsx')
update_product_screen('src/screens/EditProductScreen.tsx')
