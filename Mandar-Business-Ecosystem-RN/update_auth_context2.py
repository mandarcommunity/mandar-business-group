import sys
import re

with open('src/context/AuthContext.tsx', 'r') as f:
    content = f.read()

old_use_effect = '''  /* RESTORE SESSION */
  useEffect(() => {

    restoreSession();

  }, []);'''
new_use_effect = '''  /* RESTORE SESSION */
  useEffect(() => {

    restoreSession();
    
    const sub = DeviceEventEmitter.addListener('force_logout', async () => {
      setIsLoggedIn(false);
      setUser(null);
    });
    
    return () => sub.remove();

  }, []);'''
content = content.replace(old_use_effect, new_use_effect)

with open('src/context/AuthContext.tsx', 'w') as f:
    f.write(content)
