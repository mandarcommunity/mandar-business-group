import sys
import re

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

# Add useFocusEffect import
content = content.replace('useNavigation,\\n  useRoute,\\n} from "@react-navigation/native";', 'useNavigation,\\n  useRoute,\\n  useFocusEffect,\\n} from "@react-navigation/native";')

# Add useCallback import if not present
if 'useCallback' not in content:
    content = content.replace('useEffect,\\n} from "react";', 'useEffect,\\n  useCallback,\\n} from "react";')

# Replace useEffect with useFocusEffect
old_use_effect = '''  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessToken();
        const res = await getBusinessById(businessId, token as string);
        
        // Map the backend data format to what the screen expects
        const data = res.data;
        if (data) {
          // If gst_number exists, it's verified, else not_verified
          const status = data.gst_number ? "verified" : "not_verified";
          setBusiness({
            ...data,
            verificationStatus: status,
            // also ensure verificationStatusCard can read it
          });
        }
        setHasError(false);
      } catch (err) {
        console.error("Error fetching business verification:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (businessId) {
      fetchBusiness();
    } else {
      setIsLoading(false);
    }
  }, [businessId]);'''

# Instead of regex, I'll just use simple replace or write a robust AST replacement because of whitespace.
# Let's see the exact text using python.
