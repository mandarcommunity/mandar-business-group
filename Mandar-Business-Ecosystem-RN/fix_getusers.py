import sys
import re

with open('backend/src/controllers/admin.controller.ts', 'r') as f:
    content = f.read()

content = content.replace('businesses:businesses(id, name, is_verified)', 'businesses:businesses(id, business_name, verified)')

with open('backend/src/controllers/admin.controller.ts', 'w') as f:
    f.write(content)
