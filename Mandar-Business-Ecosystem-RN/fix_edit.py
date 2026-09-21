import sys
import re

with open('src/screens/EditProductScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [images: images.map(i => i.uri),\n        base64Images: images.map(i => i.base64).filter(Boolean), setImages] = useState<string[]>(product?.images || []);',
    'const [images, setImages] = useState<ProductImage[]>((product?.images || []).map((uri: string) => ({ uri })));'
)

with open('src/screens/EditProductScreen.tsx', 'w') as f:
    f.write(content)
