import sys
import re

def replace_in_file(filepath, pattern, replacement):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Businesses (BusinessDirectoryScreen, SavedBusinessesScreen)
biz_files = ['src/screens/BusinessDirectoryScreen.tsx', 'src/screens/SavedBusinessesScreen.tsx']
for f in biz_files:
    replace_in_file(f, 
        r'Share\.share\(\{\s*message:.*?\}\);', 
        r'Share.share({ message: `Check out ${business.business_name} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${business.slug || business.id}` });'
    )

# 2. Business Catalog
replace_in_file('src/screens/BusinessCatalogScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `Check out this product on Mandar Community!\\n\\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });'
)

# 3. My Products
replace_in_file('src/screens/MyProductsScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `Check out my product ${item.name} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });'
)

# 4. My Advertisements
replace_in_file('src/screens/MyAdvertisementsScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `Check out my advertisement on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/ad/${item.slug || item.id}` });'
)

# 5. Ad Details
replace_in_file('src/screens/AdvertisementDetailsScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `Check out this advertisement on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/ad/${ad.slug || ad.id}` });'
)

# 6. My Requirements
replace_in_file('src/screens/MyRequirementsScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `I have a requirement for ${item.title} on Mandar Community Ecosystem.\\n\\nhttps://mandarcommunity.in/req/${item.slug || item.id}` });'
)

# 7. Leads
replace_in_file('src/screens/LeadsScreen.tsx',
    r'Share\.share\(\{\s*message:.*?\}\);',
    r'Share.share({ message: `Check out this requirement lead on Mandar Community Ecosystem.\\n\\nhttps://mandarcommunity.in/req/${lead.slug || lead.id}` });'
)

print("Carefully replaced all share buttons with Universal Links!")
