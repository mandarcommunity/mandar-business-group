import sys
import re

with open('backend/src/controllers/business.controller.ts', 'r') as f:
    content = f.read()

content = re.sub(r'const fileName = .*?;', 'const fileName = `verification_${business.id}_${Date.now()}.jpg`;', content)

with open('backend/src/controllers/business.controller.ts', 'w') as f:
    f.write(content)
