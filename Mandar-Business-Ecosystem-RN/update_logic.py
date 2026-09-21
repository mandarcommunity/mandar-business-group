import sys
import re

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace('useNavigation,\\n  useRoute,\\n} from "@react-navigation/native";', 'useNavigation,\\n  useRoute,\\n  useFocusEffect,\\n} from "@react-navigation/native";')

if 'useCallback' not in content:
    content = content.replace('useEffect,\\n} from "react";', 'useEffect,\\n  useCallback,\\n} from "react";')

# 2. Extract and replace the whole useEffect block
# We know it starts with useEffect(() => { and ends with }, [businessId]);
pattern = r'useEffect\(\(\) => \{.*?\},\s*\[businessId\]\);'

new_effect = '''useFocusEffect(
    useCallback(() => {
      const fetchBusiness = async () => {
        try {
          setIsLoading(true);
          const token = await getAccessToken();
          const res = await getBusinessById(businessId, token as string);
          
          const data = res.data;
          if (data) {
            let status = data.verification_status || "unverified";
            
            // Map our DB statuses to what the UI expects if they differ.
            // Expected UI statuses usually are "verified", "pending", "rejected", "not_verified"
            if (status === "unverified") status = "not_verified";
            
            setBusiness({
              ...data,
              verificationStatus: status,
              rejectionReason: data.verification_rejection_reason || null
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
    }, [businessId])
  );'''

content = re.sub(pattern, new_effect, content, flags=re.DOTALL)

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
