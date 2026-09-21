import sys
import re

with open('backend/src/controllers/admin.controller.ts', 'r') as f:
    content = f.read()

content = re.sub(r'message: `Your business verification was rejected(.*?)`', r'body: `Your business verification was rejected\1`', content)

with open('backend/src/controllers/admin.controller.ts', 'w') as f:
    f.write(content)
