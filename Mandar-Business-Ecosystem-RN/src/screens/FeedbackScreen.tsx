import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { getAccessToken } from "../utils/storage";
import { submitFeedback } from "../services/system.service";

import {
  useState,
} from "react";

import {
  ChevronDown,
  MessageSquareMore,
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import PrimaryButton
from "../components/shared/PrimaryButton";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

const FEEDBACK_OPTIONS = [

  "Bug Report",

  "Feature Request",

  "UI / UX Feedback",

  "Business Verification",

  "Performance Issue",

  "Other",
];

export default function FeedbackScreen() {

  const navigation =
    useNavigation<any>();

  const [
    selectedCategory,

    setSelectedCategory,

  ] = useState("");

  const [
    showOptions,

    setShowOptions,

  ] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = selectedCategory && feedback.trim().length >= 10 && !isSubmitting;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        Alert.alert("Error", "Please log in to submit feedback.");
        return;
      }
      
      const res = await submitFeedback({ subject: selectedCategory, message: feedback }, token);
      if (res.data?.success) {
        Alert.alert("Success", "Thank you for your feedback! Your insights help us improve the platform.");
        navigation.goBack();
      } else {
        throw new Error(res.data?.message || "Failed to submit feedback");
      }
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <SafeAreaView
      edges={["top"]}

      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View
          style={
            styles.headerLeft
          }
        >

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={() =>
              navigation.goBack()
            }

            style={
              styles.backButton
            }
          >

            <ArrowLeft
              size={20}
              color={COLORS.white}
            />

          </TouchableOpacity>

          <View>

            <Text
              style={
                styles.headerTitle
              }
            >

              Feedback

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Share suggestions & report issues

            </Text>

          </View>

        </View>

      </View>

      {/* CONTENT */}
      <View
        style={
          styles.contentWrapper
        }
      >

        <KeyboardAvoidingView
          style={styles.flex}

          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }

          keyboardVerticalOffset={
            Platform.OS === "ios"
              ? 0
              : 20
          }
        >

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }

            keyboardShouldPersistTaps="handled"

            keyboardDismissMode="interactive"

            contentContainerStyle={
              styles.content
            }
          >

            {/* INTRO */}
            <View style={styles.card}>

              <View
                style={
                  styles.iconWrapper
                }
              >

                <MessageSquareMore
                  size={26}
                  color={COLORS.accent}
                />

              </View>

              <Text
                style={
                  styles.introTitle
                }
              >

                We Value Your Feedback

              </Text>

              <Text
                style={
                  styles.introText
                }
              >

                Your feedback helps us
                improve the platform,
                business experience and
                overall community quality.

              </Text>

            </View>

            {/* CATEGORY */}
            <View
              style={styles.section}
            >

              <Text
                style={styles.heading}
              >

                Feedback Category

              </Text>

              {/* DROPDOWN */}
              <TouchableOpacity
                activeOpacity={0.9}

                onPress={() =>
                  setShowOptions(
                    !showOptions
                  )
                }

                style={
                  styles.selectCard
                }
              >

                <Text
                  numberOfLines={1}

                  style={
                    styles.selectText
                  }
                >

                  {selectedCategory
                    ? selectedCategory
                    : "Select Feedback Category"}

                </Text>

                <ChevronDown
                  size={18}
                  color={
                    COLORS.textSecondary
                  }
                />

              </TouchableOpacity>

              {/* OPTIONS */}
              {showOptions && (

                <View
                  style={
                    styles.dropdownWrapper
                  }
                >

                  {FEEDBACK_OPTIONS.map(
                    (item, index) => (

                      <TouchableOpacity
                        key={item}

                        activeOpacity={
                          0.9
                        }

                        onPress={() => {

                          setSelectedCategory(
                            item
                          );

                          setShowOptions(
                            false
                          );
                        }}

                        style={[

                          styles.dropdownOption,

                          index ===
                            FEEDBACK_OPTIONS.length - 1 &&
                            styles.lastDropdownOption,

                        ]}
                      >

                        <Text
                          style={
                            styles.dropdownText
                          }
                        >

                          {item}

                        </Text>

                      </TouchableOpacity>
                    )
                  )}

                </View>

              )}

            </View>

            {/* FEEDBACK INPUT */}
            <View
              style={styles.section}
            >

              <View
                style={
                  styles.headerRow
                }
              >

                <Text
                  style={
                    styles.heading
                  }
                >

                  Your Feedback

                </Text>

                <Text
                  style={
                    styles.limitText
                  }
                >

                  {
                    feedback.length
                  }
                  /500

                </Text>

              </View>

              <TextInput
                value={feedback}

                onChangeText={(
                  text
                ) => {

                  if (
                    text.length <= 500
                  ) {

                    setFeedback(
                      text
                    );
                  }
                }}

                multiline

                textAlignVertical="top"

                placeholder="Describe your feedback, suggestion or issue..."

                placeholderTextColor={
                  COLORS.textMuted
                }

                style={
                  styles.textarea
                }
              />

            </View>

            {/* NOTE */}
            <View
              style={
                styles.noteCard
              }
            >

              <Text
                style={
                  styles.noteTitle
                }
              >

                Note

              </Text>

              <Text
                style={
                  styles.noteText
                }
              >

                Feedback submissions help
                improve platform quality,
                business trust and user
                experience across the
                community ecosystem.

              </Text>

            </View>

            {/* ACTION */}
            <View
              style={
                styles.buttonWrapper
              }
            >

              <PrimaryButton
                text="Submit Feedback"
                disabled={!isFormValid || isSubmitting}
                loading={isSubmitting}
                onPress={handleSubmit}
              />

              {!isFormValid && (

                <Text
                  style={
                    styles.warningText
                  }
                >

                  Select category and
                  enter at least 10
                  characters.

                </Text>

              )}

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.primary,
  },

  flex: {
    flex: 1,
  },

  header: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,

    backgroundColor:
      COLORS.primary,
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.12)",

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  headerSubtitle: {
    marginTop: 2,

    fontSize: 12,

    color:
      "rgba(255,255,255,0.72)",
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 26,

    borderTopRightRadius: 26,

    overflow: "hidden",
  },

  content: {
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,
  },

  card: {
    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,

    alignItems: "center",
  },

  iconWrapper: {
    width: 72,

    height: 72,

    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  introTitle: {
    marginTop:
      SPACING.lg,

    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  introText: {
    marginTop:
      SPACING.md,

    textAlign: "center",

    fontSize: 13,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

  section: {
    marginTop:
      SPACING.xxxl,
  },

  heading: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,
  },

  selectCard: {
    minHeight: 60,

    borderRadius: 22,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  selectText: {
    flex: 1,

    paddingRight:
      SPACING.md,

    fontSize: 14,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  dropdownWrapper: {
    marginTop:
      SPACING.md,

    borderRadius: 22,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    overflow: "hidden",
  },

  dropdownOption: {
    paddingVertical:
      SPACING.lg,

    paddingHorizontal:
      SPACING.lg,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,
  },

  lastDropdownOption: {
    borderBottomWidth: 0,
  },

  dropdownText: {
    fontSize: 14,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  headerRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.lg,
  },

  limitText: {
    fontSize: 12,

    color:
      COLORS.textMuted,
  },

  textarea: {
    minHeight: 160,

    borderRadius: 24,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.lg,

    fontSize:
      TYPOGRAPHY.body,

    lineHeight: 24,

    color:
      COLORS.textPrimary,
  },

  noteCard: {
    marginTop:
      SPACING.xxxl,

    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  noteTitle: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.md,
  },

  noteText: {
    fontSize: 13,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

  buttonWrapper: {
    marginTop:
      SPACING.xxxl,
  },

  warningText: {
    marginTop:
      SPACING.md,

    textAlign: "center",

    fontSize: 12,

    fontWeight: "600",

    color: "#dc2626",
  },

});