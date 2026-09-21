import sys
import re

with open('backend/src/controllers/business.controller.ts', 'r') as f:
    content = f.read()

content = content.replace("const fileName = \\ erification_\\_\\.jpg\\;", "const fileName = `verification_${business.id}_${Date.now()}.jpg`;")

with open('backend/src/controllers/business.controller.ts', 'w') as f:
    f.write(content)
