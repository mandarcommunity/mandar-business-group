import sys
import re

with open('backend/src/services/auth.service.ts', 'r') as f:
    content = f.read()

content = re.sub(
    r'if \(!user\) \{\s*throw new Error\(\s*"Invalid credentials"\s*\);\s*\}',
    '''if (!user) {
      throw new Error("Invalid credentials");
    }
    
    if (user.is_blocked) {
      throw new Error("Your account has been blocked. If you think this is a mistake, please contact us at support@paxzillionsolutions.com");
    }''',
    content
)

with open('backend/src/services/auth.service.ts', 'w') as f:
    f.write(content)
