import sys

with open('backend/src/controllers/admin.controller.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'message: "Congratulations! Your business has been successfully verified. A blue tick is now active on your profile."',
    'body: "Congratulations! Your business has been successfully verified. A blue tick is now active on your profile."'
)

content = content.replace(
    'message: \\Your business verification was rejected. Reason: \\\\',
    'body: \\Your business verification was rejected. Reason: \\\\'
)

with open('backend/src/controllers/admin.controller.ts', 'w') as f:
    f.write(content)
