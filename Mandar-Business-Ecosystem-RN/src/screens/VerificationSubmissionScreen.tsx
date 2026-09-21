import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useNavigation, useRoute } from "@react-navigation/native";
import { getAccessToken } from "../utils/storage";
import { getBusinessById, submitVerificationRequest } from "../services/business.service";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";







import {
  Upload,
  FileText,
  ChevronDown,
} from "lucide-react-native";



import {
  SafeAreaView,
} from "react-native-safe-area-context";

import VerificationInfoCard from "../components/verification/VerificationInfoCard";

import PrimaryButton from "../components/shared/PrimaryButton";

import EmptyState from "../components/states/EmptyState";

import {
  dummyBusinesses,
} from "../data/dummyBusinesses";

import {
  COLORS,
  SPACING,
} from "../theme";

const DOCUMENT_OPTIONS = [

  "Owner ID Proof",

  "Business Photo",

  "GST Certificate",

  "Business Registration Proof",
];



export default function VerificationSubmissionScreen() {
  const nav = useNavigation<any>();

  const route =
    useRoute<any>();
  

  const businessId =
    route.params?.businessId;

  const [business, setBusiness] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = await getAccessToken();
        const res = await getBusinessById(businessId, token as string);
        if (res.data) {
          const data = res.data;
          setBusiness({
            ...data,
            businessName: data.business_name || "",
            ownerName: data.contact_person || data.user?.full_name || "",
            industry: data.industries?.join(", ") || "",
            businessType: data.business_types?.join(", ") || "",
            fullAddress: [data.address, data.city, data.state].filter(Boolean).join(", "),
          });
        }
      } catch (err) {
        console.error("Error fetching business for submission:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (businessId) fetchBusiness();
    else setIsLoading(false);
  }, [businessId]);

  const [
    selectedDocument,

    setSelectedDocument,

  ] = useState("");

  const [
    showOptions,

    setShowOptions,

  ] = useState(false);

    const [documentUploaded, setDocumentUploaded] = useState(false);
  const [documentBase64, setDocumentBase64] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!documentUploaded) return;
    setIsSubmitting(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("No token found");
      
      const docType = selectedDocument || "GST Certificate";
      const dummyUrl = ""; // No dummy URL since we are uploading base64
      
      await submitVerificationRequest(token as string, dummyUrl, docType, documentBase64);
      
      Alert.alert("Success", "Your verification request has been submitted successfully.", [
        { text: "OK", onPress: function() { nav.goBack(); } }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isLoading) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.emptyWrapper}>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!business) {

    return (

      <SafeAreaView
        edges={["top"]}

        style={styles.container}
      >

        <View
          style={
            styles.emptyWrapper
          }
        >

          <EmptyState
            title="Business not found"

            description="Unable to load business verification details."
          />

        </View>

      </SafeAreaView>

    );
  }

  return (

    <SafeAreaView
      edges={["top"]}

      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <Text
          style={styles.headerTitle}
        >

          Verification Submission

        </Text>

        <Text
          style={
            styles.headerSubtitle
          }
        >

          Upload any one document to request verification.

        </Text>

      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={
          styles.content
        }
      >

        {/* INFO */}
        <View style={styles.section}>

          <Text style={styles.heading}>

            Business Information

          </Text>

          <VerificationInfoCard
            businessName={
              business.businessName
            }

            ownerName={
              business.ownerName
            }

            industry={
              business.industry
            }

            businessType={
              business.businessType
            }

            address={
              business.fullAddress
            }
          />

        </View>

        {/* DOCUMENT SECTION */}
        <View style={styles.section}>

          <Text style={styles.heading}>

            Verification Document

          </Text>

          <Text style={styles.subheading}>

            Select any one document
            type and upload it to
            request verification.

          </Text>

          {/* DROPDOWN */}
          <TouchableOpacity
            activeOpacity={0.9}

            onPress={() =>
              setShowOptions(
                !showOptions
              )
            }

            style={styles.selectCard}
          >

            <View
              style={
                styles.selectLeft
              }
            >

              <FileText
                size={18}
                color={
                  COLORS.accent
                }
              />

              <Text
                numberOfLines={1}

                style={
                  styles.selectText
                }
              >

                {selectedDocument
                  ? selectedDocument
                  : "Select Any One Document"}

              </Text>

            </View>

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

              {DOCUMENT_OPTIONS.map(
                (item) => (

                  <TouchableOpacity
                    key={item}

                    activeOpacity={0.9}

                    onPress={() => {

                      setSelectedDocument(
                        item
                      );

                      setShowOptions(
                        false
                      );
                    }}

                    style={
                      styles.dropdownOption
                    }
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

          {/* UPLOAD */}
          <TouchableOpacity
            activeOpacity={0.9}

            disabled={
              !selectedDocument
            }

            onPress={async () => {
              try {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ['images'],
                  allowsEditing: true,
                  quality: 0.6,
                  base64: true,
                });
                if (!result.canceled && result.assets[0].base64) {
                  setDocumentBase64(result.assets[0].base64);
                  setDocumentUploaded(true);
                }
              } catch (error) {
                Alert.alert("Error", "Failed to pick an image.");
              }
            }}

            style={[

              styles.uploadCard,

              documentUploaded &&
                styles.uploadedCard,

              !selectedDocument &&
                styles.disabledUpload,

            ]}
          >

            <View
              style={[
                styles.uploadIcon,

                documentUploaded &&
                  styles.uploadedIcon,
              ]}
            >

              <Upload
                size={22}
                color={
                  documentUploaded
                    ? COLORS.white
                    : COLORS.accent
                }
              />

            </View>

            <Text
              style={[

                styles.uploadTitle,

                documentUploaded &&
                  styles.uploadedText,

              ]}
            >

              {documentUploaded
                ? "Document Uploaded"
                : "Upload Document"}

            </Text>

            <Text
              style={[

                styles.uploadSubtitle,

                documentUploaded &&
                  styles.uploadedSubText,

              ]}
            >

              {documentUploaded
                ? selectedDocument
                : selectedDocument
                ? "Tap to upload selected document"
                : "Select a document type first"}

            </Text>

          </TouchableOpacity>

        </View>

        {/* NOTE */}
        <View style={styles.noteCard}>

          <Text style={styles.noteTitle}>

            Important Information

          </Text>

          <Text style={styles.noteText}>

            • Any one document is
            enough for verification.

            {"\n\n"}

            • Verification requests
            are manually reviewed by
            our team.

            {"\n\n"}

            • Verification usually
            takes 24-48 hours.

            {"\n\n"}

            • Fake or misleading
            submissions may result
            in rejection.

          </Text>

        </View>

        {/* ACTION */}
        <View style={styles.buttonWrapper}>

          <PrimaryButton
              text="Submit Verification Request"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={
                !documentUploaded || isSubmitting
              }
            />

          {!documentUploaded && (

            <Text
              style={styles.warningText}
            >

              Upload a document to
              continue.

            </Text>

          )}

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  header: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,
  },

  headerTitle: {
    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  headerSubtitle: {
    marginTop:
      SPACING.xs,

    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  content: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.sm,

    paddingBottom:
      SPACING.xxxl,
  },

  section: {
    marginBottom:
      SPACING.xxxl,
  },

  heading: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.sm,
  },

  subheading: {
    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,

    marginBottom:
      SPACING.xl,
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

  selectLeft: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    minWidth: 0,

    gap: SPACING.md,
  },

  selectText: {
    flex: 1,

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

  dropdownText: {
    fontSize: 14,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  uploadCard: {
    marginTop:
      SPACING.xl,

    borderRadius: 28,

    borderWidth: 1,

    borderStyle: "dashed",

    borderColor:
      COLORS.border,

    backgroundColor:
      COLORS.surface,

    paddingVertical:
      SPACING.xxxl,

    paddingHorizontal:
      SPACING.xl,

    alignItems: "center",
  },

  disabledUpload: {
    opacity: 0.5,
  },

  uploadedCard: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  uploadIcon: {
    width: 64,

    height: 64,

    borderRadius: 22,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  uploadedIcon: {
    backgroundColor:
      "rgba(255,255,255,0.18)",
  },

  uploadTitle: {
    marginTop:
      SPACING.lg,

    fontSize: 16,

    fontWeight: "700",

    textAlign: "center",

    color:
      COLORS.textPrimary,
  },

  uploadSubtitle: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    textAlign: "center",

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  uploadedText: {
    color:
      COLORS.white,
  },

  uploadedSubText: {
    color:
      "rgba(255,255,255,0.82)",
  },

  noteCard: {
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

  emptyWrapper: {
    flex: 1,

    justifyContent: "center",

    paddingHorizontal:
      SPACING.lg,
  },

});