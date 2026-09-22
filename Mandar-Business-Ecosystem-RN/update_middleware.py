import sys

with open('backend/src/middleware/auth.middleware.ts', 'r') as f:
    content = f.read()

content = content.replace('Your account has been blocked.', 'Your account has been blocked. If you think this is a mistake, please contact us at support@mandarcommunity.in')

with open('backend/src/middleware/auth.middleware.ts', 'w') as f:
    f.write(content)
