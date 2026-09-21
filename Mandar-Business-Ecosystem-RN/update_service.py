import sys

with open('src/services/business.service.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'export const submitVerificationRequest = async (token: string, documentUrl: string, documentType: string) => {',
    'export const submitVerificationRequest = async (token: string, documentUrl: string, documentType: string, base64Image?: string) => {'
)

content = content.replace(
    'documentUrl,',
    'documentUrl, base64Image,'
)

with open('src/services/business.service.ts', 'w') as f:
    f.write(content)
