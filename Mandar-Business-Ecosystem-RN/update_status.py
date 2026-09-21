import sys
import re

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

# Replace the data fetch logic
new_fetch_logic = '''
          const data = res.data;
          if (data) {
            const status = data.verification_status || (data.verified ? "verified" : "unverified");
            setBusiness({
              ...data,
              verificationStatus: status,
              rejectionReason: data.verification_rejection_reason
            });
          }
'''
content = re.sub(r'const data = res\.data;\s*if\s*\(data\)\s*{[\s\S]*?// also ensure verificationStatusCard can read it\s*}\s*}', new_fetch_logic.strip() + '\n        }', content)

# Replace the status boolean checks
new_status_checks = '''
  const verificationStatus = business.verificationStatus || "unverified";
  const isVerified = verificationStatus === "verified";
  const isPending = verificationStatus === "pending";
  const isRejected = verificationStatus === "rejected";
  const isNotVerified = verificationStatus === "unverified" || verificationStatus === "not_verified";
'''
content = re.sub(r'const verificationStatus =[\s\S]*?verificationStatus ===\s*"not_verified";', new_status_checks.strip(), content)

# Fix the render of Rejected to show reason
rejected_render_old = '''
          {isRejected && (
            <View style={styles.stateCard}>
              <View
                style={[
                  styles.iconCircle,
                  styles.rejectedIconBg,
                ]}
              >
                <XCircle
                  size={32}
                  color={COLORS.error}
                />
              </View>
              <Text style={styles.stateTitle}>
                Verification Rejected
              </Text>
              <Text
                style={styles.stateDescription}
              >
                Unfortunately, your business
                could not be verified.
                Please check your documents
                and try again.
              </Text>
            </View>
          )}
'''

rejected_render_new = '''
          {isRejected && (
            <View style={styles.stateCard}>
              <View
                style={[
                  styles.iconCircle,
                  styles.rejectedIconBg,
                ]}
              >
                <XCircle
                  size={32}
                  color={COLORS.error}
                />
              </View>
              <Text style={styles.stateTitle}>
                Verification Rejected
              </Text>
              <Text
                style={styles.stateDescription}
              >
                Unfortunately, your verification request was declined.
              </Text>
              {business.rejectionReason && (
                <View style={{ marginTop: 10, padding: 10, backgroundColor: COLORS.errorLight || '#ffebee', borderRadius: 8 }}>
                  <Text style={{ color: COLORS.error, fontWeight: 'bold' }}>Reason for Rejection:</Text>
                  <Text style={{ color: COLORS.error, marginTop: 4 }}>{business.rejectionReason}</Text>
                </View>
              )}
            </View>
          )}
'''
# Using replace for exact string or regex for flexibility
content = re.sub(r'\{isRejected && \([\s\S]*?try again\.\s*</Text>\s*</View>\s*\)\}', rejected_render_new.strip(), content)

# Make sure Get Verified button shows for both unverified and rejected
button_render_old = '''
          {(isNotVerified ||
            isRejected) && (
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                text={
                  isRejected
                    ? "Resubmit Verification"
                    : "Get Verified"
                }
                onPress={() =>
                  navigation.navigate(
                    "VerificationSubmission",
                    { businessId: business.id }
                  )
                }
              />
            </View>
          )}
'''
button_render_new = '''
          {(isNotVerified || isRejected) && (
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                text={
                  isRejected
                    ? "Re-apply for Verification"
                    : "Get Verified"
                }
                onPress={() =>
                  navigation.navigate(
                    "VerificationSubmission",
                    { businessId: business.id }
                  )
                }
              />
            </View>
          )}
'''
content = content.replace(button_render_old.strip(), button_render_new.strip())
content = re.sub(r'\{\(isNotVerified \|\|\s*isRejected\) && \([\s\S]*?</View>\s*\)\}', button_render_new.strip(), content)

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
print("Updated VerificationStatusScreen")
