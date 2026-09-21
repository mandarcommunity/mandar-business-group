import sys
import re

with open('src/screens/AddProductScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [images: images.map(i => i.uri),\n          base64Images: images.map(i => i.base64).filter(Boolean), setImages] = useState<ProductImage[]>([]);',
    'const [images, setImages] = useState<ProductImage[]>([]);'
)

with open('src/screens/AddProductScreen.tsx', 'w') as f:
    f.write(content)

with open('src/screens/EditProductScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [images: images.map(i => i.uri),\n        base64Images: images.map(i => i.base64).filter(Boolean), setImages] = useState<ProductImage[]>([]);',
    'const [images, setImages] = useState<ProductImage[]>([]);'
)

with open('src/screens/EditProductScreen.tsx', 'w') as f:
    f.write(content)
