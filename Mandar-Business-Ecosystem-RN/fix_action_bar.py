import sys
import re

filepath = 'src/components/business/BusinessActionBar.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Share logic
content = re.sub(
    r'message:\s*`\$\{\s*businessName\s*\|\|\s*"Business"\s*\}\s*on\s*MyTiffin\s*Business\s*Network`,',
    r'message: `Check out ${businessName || "this business"} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${businessId}` /* Note: using businessId here as slug might not be available in props yet, we should use slug if we have it, else fallback to id */,',
    content,
    flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BusinessActionBar!")
