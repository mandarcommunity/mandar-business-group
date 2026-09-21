import sys
import re

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

# Make sure we import useFocusEffect and useCallback
if 'useFocusEffect' not in content[:1000]:
    content = content.replace('useNavigation,\\n  useRoute,\\n} from "@react-navigation/native";', 'useNavigation,\\n  useRoute,\\n  useFocusEffect,\\n} from "@react-navigation/native";')
    content = content.replace('useNavigation,\\r\\n  useRoute,\\r\\n} from "@react-navigation/native";', 'useNavigation,\\r\\n  useRoute,\\r\\n  useFocusEffect,\\r\\n} from "@react-navigation/native";')

if 'useCallback' not in content[:1000]:
    content = content.replace('useEffect,\\n} from "react";', 'useEffect,\\n  useCallback,\\n} from "react";')
    content = content.replace('useEffect,\\r\\n} from "react";', 'useEffect,\\r\\n  useCallback,\\r\\n} from "react";')

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
