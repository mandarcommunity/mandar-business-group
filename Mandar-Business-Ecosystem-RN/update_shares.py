import sys
import re

files = [
    'src/screens/BusinessDirectoryScreen.tsx',
    'src/screens/BusinessCatalogScreen.tsx',
    'src/screens/SavedBusinessesScreen.tsx',
    'src/screens/MyProductsScreen.tsx',
    'src/screens/AdvertisementDetailsScreen.tsx',
    'src/screens/MyAdvertisementsScreen.tsx',
    'src/screens/MyRequirementsScreen.tsx',
    'src/screens/LeadsScreen.tsx',
    'src/screens/IndustryDetailsScreen.tsx'
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Common share replace for businesses
        content = re.sub(
            r'Share\.share\(\{\s*message:.*?\}\);',
            r'Share.share({ message: `Check out ${business.business_name} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${business.slug || business.id}` });',
            content,
            flags=re.DOTALL
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed {filepath}: {e}")

for file in files:
    process_file(file)
