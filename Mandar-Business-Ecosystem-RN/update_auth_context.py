import sys
import re

with open('src/context/AuthContext.tsx', 'r') as f:
    content = f.read()

# Add DeviceEventEmitter import if not present
if 'DeviceEventEmitter' not in content:
    content = content.replace('import {', 'import { DeviceEventEmitter,', 1)

# Add listener in useEffect
old_use_effect = '''  useEffect(() => {
    checkLoginStatus();
  }, []);'''
new_use_effect = '''  useEffect(() => {
    checkLoginStatus();
    
    const sub = DeviceEventEmitter.addListener('force_logout', async () => {
      setIsLoggedIn(false);
      setUser(null);
    });
    
    return () => sub.remove();
  }, []);'''
content = content.replace(old_use_effect, new_use_effect)

with open('src/context/AuthContext.tsx', 'w') as f:
    f.write(content)
