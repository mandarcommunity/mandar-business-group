import sys

with open('src/screens/VerificationSubmissionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace('const dummyUrl = "https://example.com/dummy-document.pdf";', 'const dummyUrl = "https://images.unsplash.com/photo-1633265486064-086b219458ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // A sample document placeholder')

with open('src/screens/VerificationSubmissionScreen.tsx', 'w') as f:
    f.write(content)
