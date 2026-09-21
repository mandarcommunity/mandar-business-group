import sys

with open('backend/src/server.ts', 'r') as f:
    content = f.read()

content = content.replace('app.use(express.json());', 'app.use(express.json({ limit: "50mb" }));\napp.use(express.urlencoded({ limit: "50mb", extended: true }));')

with open('backend/src/server.ts', 'w') as f:
    f.write(content)
