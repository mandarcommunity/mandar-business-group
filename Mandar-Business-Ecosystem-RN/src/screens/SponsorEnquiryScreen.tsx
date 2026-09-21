import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";
import { useAuth } from "../context/AuthContext";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";
import { getAccessToken } from "../utils/storage";
import { getMyBusiness } from "../services/business.service";
import { API } from "../services/api";
import MultiSelectSearchDropdown from "../components/shared/MultiSelectSearchDropdown";
import { INDUSTRIES } from "../constants/industries";

export default function SponsorEnquiryScreen() {

  const navigation =
    useNavigation<any>();

  const [
    businessName,

    setBusinessName,

  ] = useState("");

  const [
    contactPerson,

    setContactPerson,

  ] = useState("");

  const [
    phoneNumber,

    setPhoneNumber,

  ] = useState("");

  const [
    email,

    setEmail,

  ] = useState("");

  const [
    category,

    setCategory,

  ] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMyBusiness() {
      try {
        if (user) {
          if (user.full_name) setContactPerson(user.full_name);
          if (user.mobile) setPhoneNumber(user.mobile);
          if (user.email) setEmail(user.email);
          
          const token = await getAccessToken();
          if (!token) return;

          const response = await getMyBusiness(token);
          if (response?.success && response?.data) {
            const business = response.data;
            if (business.businessName) setBusinessName(business.businessName);
            if (business.industries && Array.isArray(business.industries) && business.industries.length > 0) {
              setCategory(business.industries);
            }
          }
        }
      } catch (error) {
        // Ignore error if business not found
      }
    }
    fetchMyBusiness();
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchIndustry, setSearchIndustry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit() {
    const newErrors: Record<string, string> = {};
    if (!businessName?.trim()) newErrors.businessName = "Business Name is required";
    if (!contactPerson?.trim()) newErrors.contactPerson = "Contact Person is required";
    if (!phoneNumber?.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!category || category.length === 0) newErrors.category = "Business Category is required";
    if (!message?.trim()) newErrors.message = "Advertisement Details are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});

    setIsSubmitting(true);
    try {
      const response = await API.post("/system/sponsor-enquiries", {
        businessName,
        contactPerson,
        phoneNumber,
        email,
        category: category.join(", "),
        message,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to submit");
      }

      Alert.alert(
        "Enquiry Submitted",
        "Our team will contact you shortly regarding sponsored advertisement opportunities."
      );

      setBusinessName("");
      setContactPerson("");
      setPhoneNumber("");
      setEmail("");
      setCategory([]);
      setMessage("");

      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (

    <SafeAreaView
      edges={["top"]}
      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.headerLeft}>

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={() =>
              navigation.goBack()
            }

            style={styles.backButton}
          >

            <ArrowLeft
              size={20}
              color={COLORS.white}
            />

          </TouchableOpacity>

          <View style={styles.headerTextWrapper}>

            <Text
              numberOfLines={1}

              style={styles.headerTitle}
            >

              Sponsored Advertising

            </Text>

            <Text
              numberOfLines={1}

              style={
                styles.headerSubtitle
              }
            >

              Business Promotion Enquiry

            </Text>

          </View>

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>

        <KeyboardAvoidingView
          style={styles.flex}

          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
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
            <View style={styles.heroCard}>

              <Text style={styles.heroTitle}>

                Promote Your Business

              </Text>

              <Text
                style={
                  styles.heroDescription
                }
              >

                Promote your business
                across the Mandar
                Business ecosystem
                through sponsored
                visibility placements
                and premium business
                discovery.

              </Text>

            </View>

            {/* FORM */}
            <View style={styles.formCard}>

              {/* BUSINESS NAME */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Business Name *

                </Text>

                <TextInput
                  value={businessName}
                  onChangeText={(text) => {
                    setBusinessName(text.slice(0, 60));
                    if (errors.businessName) setErrors({ ...errors, businessName: "" });
                  }}
                  placeholder="Enter business name"
                  placeholderTextColor={
                    COLORS.textMuted
                  }
                  style={[styles.input, errors.businessName ? styles.inputError : null]}
                />

                <Text
                  style={
                    styles.helperText
                  }
                >

                  Maximum 60 characters

                </Text>

              </View>

              {/* CONTACT PERSON */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Contact Person *

                </Text>

                <TextInput
                  value={contactPerson}
                  onChangeText={(text) => {
                    setContactPerson(text.slice(0, 40));
                    if (errors.contactPerson) setErrors({ ...errors, contactPerson: "" });
                  }}
                  placeholder="Enter contact person"
                  placeholderTextColor={
                    COLORS.textMuted
                  }
                  style={[styles.input, errors.contactPerson ? styles.inputError : null]}
                />

                <Text
                  style={
                    styles.helperText
                  }
                >

                  Maximum 40 characters

                </Text>

              </View>

              {/* PHONE */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Phone Number *

                </Text>

                <TextInput
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text.slice(0, 15));
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" });
                  }}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  placeholderTextColor={
                    COLORS.textMuted
                  }
                  style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
                />

              </View>

              {/* EMAIL */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Email Address

                </Text>

                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text.slice(0, 80))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter email address"
                  placeholderTextColor={
                    COLORS.textMuted
                  }
                  style={styles.input}
                />

              </View>

              {/* CATEGORY */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Business Category *

                </Text>

                <View style={errors.category ? styles.dropdownError : null}>
                  <MultiSelectSearchDropdown
                    data={INDUSTRIES}
                    value={searchIndustry}
                    onChangeValue={setSearchIndustry}
                    selectedItems={category}
                    onChangeSelectedItems={(items) => {
                      setCategory(items);
                      if (errors.category) setErrors({ ...errors, category: "" });
                    }}
                    placeholder="Select industries..."
                  />
                </View>

              </View>

              {/* MESSAGE */}
              <View
                style={styles.fieldBlock}
              >

                <Text
                  style={styles.label}
                >

                  Advertisement Details *

                </Text>

                <TextInput
                  value={message}
                  onChangeText={(text) => {
                    setMessage(text.slice(0, 300));
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  multiline
                  textAlignVertical="top"
                  placeholder="Tell us about your business and how you would like your sponsored advertisement to appear."
                  placeholderTextColor={
                    COLORS.textMuted
                  }
                  style={[styles.messageInput, errors.message ? styles.inputError : null]}
                />

                <View
                  style={
                    styles.messageFooter
                  }
                >

                  <Text
                    style={
                      styles.helperText
                    }
                  >

                    Maximum 300 characters

                  </Text>

                  <Text
                    style={
                      styles.helperText
                    }
                  >

                    {message.length}/300

                  </Text>

                </View>

              </View>

              {/* SUBMIT */}
              <TouchableOpacity
                activeOpacity={0.9}

                style={styles.submitButton}

                onPress={handleSubmit}
              >

                <Text
                  style={
                    styles.submitButtonText
                  }
                >

                  Submit Enquiry

                </Text>

              </TouchableOpacity>

            </View>

            {/* GUIDELINES */}
            <View
              style={styles.guidelinesCard}
            >

              <Text
                style={
                  styles.guidelinesTitle
                }
              >

                Sponsored Advertisement Guidelines

              </Text>

              <View
                style={styles.guidelineItem}
              >

                <Text
                  style={
                    styles.guidelineHeading
                  }
                >

                  Badge

                </Text>

                <Text
                  style={
                    styles.guidelineText
                  }
                >

                  Maximum 12 characters

                </Text>

              </View>

              <View
                style={styles.guidelineItem}
              >

                <Text
                  style={
                    styles.guidelineHeading
                  }
                >

                  Title

                </Text>

                <Text
                  style={
                    styles.guidelineText
                  }
                >

                  Maximum 26 characters

                </Text>

              </View>

              <View
                style={styles.guidelineItem}
              >

                <Text
                  style={
                    styles.guidelineHeading
                  }
                >

                  Subtitle

                </Text>

                <Text
                  style={
                    styles.guidelineText
                  }
                >

                  Maximum 40 characters

                </Text>

              </View>

              <View
                style={styles.guidelineItem}
              >

                <Text
                  style={
                    styles.guidelineHeading
                  }
                >

                  Description

                </Text>

                <Text
                  style={
                    styles.guidelineText
                  }
                >

                  Maximum 65 characters

                </Text>

              </View>

              <View
                style={styles.guidelineItem}
              >

                <Text
                  style={
                    styles.guidelineHeading
                  }
                >

                  Image

                </Text>

                <Text
                  style={
                    styles.guidelineText
                  }
                >

                  Recommended ratio 16:9 with high quality business-related visuals

                </Text>

              </View>

              <Text
                style={styles.reviewNote}
              >

                Advertisements are reviewed before approval.

              </Text>

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

  headerTextWrapper: {
    flex: 1,
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

    gap:
      SPACING.xl,
  },

  heroCard: {
    borderRadius: 26,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  heroTitle: {
    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  heroDescription: {
    marginTop:
      SPACING.md,

    fontSize: 14,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

  formCard: {
    borderRadius: 26,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,
  },

  fieldBlock: {
    marginBottom:
      SPACING.lg,
  },

  label: {
    marginBottom:
      SPACING.sm,

    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 2,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  dropdownError: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 16,
  },
  textArea: {
    minHeight: 140,
    paddingTop: SPACING.md,
    lineHeight: 22,
  },

  helperText: {
    marginTop: 8,

    fontSize: 12,

    color:
      COLORS.textMuted,
  },

  messageInput: {
    minHeight: 140,

    borderRadius: 18,

    backgroundColor:
      COLORS.background,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.md,

    fontSize: 14,

    lineHeight: 22,

    color:
      COLORS.textPrimary,
  },

  messageFooter: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    gap: SPACING.md,
  },

  submitButton: {
    height: 56,

    borderRadius: 18,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",

    marginTop:
      SPACING.md,
  },

  submitButtonText: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  guidelinesCard: {
    borderRadius: 26,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,
  },

  guidelinesTitle: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,
  },

  guidelineItem: {
    marginBottom:
      SPACING.md,
  },

  guidelineHeading: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  guidelineText: {
    marginTop: 4,

    fontSize: 13,

    lineHeight: 21,

    color:
      COLORS.textSecondary,
  },

  reviewNote: {
    marginTop:
      SPACING.md,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.accent,
  },

});