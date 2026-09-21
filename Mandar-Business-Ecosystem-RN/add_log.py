import sys
import re

with open('backend/src/controllers/business.controller.ts', 'r') as f:
    content = f.read()

content = content.replace('res.status(500).json({ success: false, message: error.message });', 'console.error("VERIFY ERROR:", error);\n    res.status(500).json({ success: false, message: error.message });')

with open('backend/src/controllers/business.controller.ts', 'w') as f:
    f.write(content)
