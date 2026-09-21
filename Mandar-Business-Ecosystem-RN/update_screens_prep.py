import sys
import re

with open('src/screens/CreateAdScreen.tsx', 'r') as f:
    content = f.read()

# Make ImagePicker return base64
content = content.replace(
    'mediaTypes: ImagePicker.MediaTypeOptions.Images,',
    'mediaTypes: ImagePicker.MediaTypeOptions.Images,\n        base64: true,\n        quality: 0.5,'
)

# Set base64 to state or directly to formData
# We need to see how image is stored in CreateAdScreen
