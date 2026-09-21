import sys
import re

with open('src/screens/VerificationStatusScreen.tsx', 'r') as f:
    content = f.read()

rejected_render_new = '''
          {/* REJECTED */}
          {isRejected && (
            <View style={styles.rejectedCard}>
              <Text style={styles.rejectedTitle}>Verification Rejected</Text>
              <Text style={styles.rejectedText}>
                Unfortunately, your verification request was declined.
              </Text>
              {business.rejectionReason && (
                <View style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: 8 }}>
                  <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>Reason for Rejection:</Text>
                  <Text style={{ color: '#d32f2f', marginTop: 4 }}>{business.rejectionReason}</Text>
                </View>
              )}
            </View>
          )}
'''

content = re.sub(r'\{\/\* REJECTED \*\/\}[\s\S]*?\{isRejected && \([\s\S]*?verified\.\s*</Text>\s*</View>\s*\)\}', rejected_render_new.strip(), content)

with open('src/screens/VerificationStatusScreen.tsx', 'w') as f:
    f.write(content)
