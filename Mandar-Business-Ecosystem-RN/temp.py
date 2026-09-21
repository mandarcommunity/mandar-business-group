import sys
import re

with open('src/screens/CreateAdScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [productImage, setProductImage] = useState<string | null>(null);',
    'const [productImage, setProductImage] = useState<string | null>(null);\n  const [base64Image, setBase64Image] = useState<string | null>(null);'
)

# wait, how is useState formatted?
