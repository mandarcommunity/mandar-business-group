import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
} from "react";
import { updateRequirement } from "../services/requirement.service";
import { getAccessToken } from "../utils/storage";
import * as ImagePicker from 'expo-image-picker';

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import UploadBox from "../components/shared/UploadBox";

import ProfileSectionCard from "../components/profile/ProfileSectionCard";

import PrimaryButton from "../components/shared/PrimaryButton";

import MultiSelectDropdown
from "../components/shared/MultiSelectSearchDropdown";

import CitySelector
from "../components/shared/CitySelector";

import CharacterCountInput
from "../components/shared/CharacterCountInput";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
} from "../theme";

import {
  INDUSTRIES,
} from "../constants/industries";

const requirementTags = [
  {
    key: "urgent",
    label: "Urgent",
  },

  {
    key: "bulk",
    label: "Bulk Requirement",
  },

  {
    key: "longTerm",
    label: "Long-term Supplier",
  },
];

export default function EditRequirementScreen() {
  const [referenceImageBase64, setReferenceImageBase64] = useState<string | null>(null);

  const navigation =
    useNavigation<any>();

  const route = useRoute<any>();
  const requirement = route.params?.requirement || {};

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<string[]>(requirement.tags || []);

  const [
    title,
    setTitle,
  ] = useState(requirement.title || "");

  const [
    description,
    setDescription,
  ] = useState(requirement.description || "");

  const [
    selectedIndustries,
    setSelectedIndustries,
  ] = useState<string[]>(requirement.industries || []);

  const [
    industryInput,
    setIndustryInput,
  ] = useState("");

  const [
    state,
    setState,
  ] = useState(requirement.state || "");

  const [
    city,
    setCity,
  ] = useState(requirement.city || "");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    referenceImage,
    setReferenceImage,
  ] = useState(requirement.image_url || "");

  const titleLimit =
    80;

  const descriptionLimit =
    500;

  const toggleTag = (
    tag: string
  ) => {

    if (
      selectedTags.includes(tag)
    ) {

      setSelectedTags(
        selectedTags.filter(
          (item) =>
            item !== tag
        )
      );

    } else {

      setSelectedTags([
        ...selectedTags,
        tag,
      ]);
    }
  };

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading requirement..."
        />

      </SafeAreaView>

    );
  }

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Unable to load requirement"

          description="Please try again later."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (!requirement.id) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <EmptyState
          title="Requirement not found"

          description="This requirement may have been removed."
        />

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

        <TouchableOpacity
          activeOpacity={0.85}

          onPress={() =>
            navigation.goBack()
          }

          style={styles.backButton}
        >

          <ArrowLeft
            size={20}
            color={
              COLORS.white
            }
          />

        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >

          Edit Requirement

        </Text>

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
              styles.contentContainer
            }
          >

            {/* DETAILS */}
            <ProfileSectionCard
              title="Requirement Details"

              subtitle="Update your business requirement details."
            >

              <CharacterCountInput
                label="Requirement Title"

                value={title}

                onChangeText={
                  setTitle
                }

                limit={
                  titleLimit
                }

                placeholder="Requirement Title"
              />

              <CharacterCountInput
                label="Requirement Description"

                value={description}

                onChangeText={
                  setDescription
                }

                limit={
                  descriptionLimit
                }

                warningLimit={420}

                multiline

                placeholder="Describe your requirement..."
              />

              {/* TAGS */}
              <View
                style={
                  styles.tagsSection
                }
              >

                <Text
                  style={
                    styles.tagsTitle
                  }
                >

                  Requirement Type

                </Text>

                <View
                  style={
                    styles.tagsContainer
                  }
                >

                  {requirementTags.map(
                    (tag) => {

                      const active =
                        selectedTags.includes(
                          tag.key
                        );

                      return (

                        <TouchableOpacity
                          key={tag.key}

                          activeOpacity={
                            0.85
                          }

                          onPress={() =>
                            toggleTag(
                              tag.key
                            )
                          }

                          style={[

                            styles.tagChip,

                            active &&
                              styles.activeTagChip,
                          ]}
                        >

                          <Text
                            style={[

                              styles.tagText,

                              active &&
                                styles.activeTagText,
                            ]}
                          >

                            {
                              tag.label
                            }

                          </Text>

                        </TouchableOpacity>

                      );
                    }
                  )}

                </View>

              </View>

              {/* INDUSTRIES */}
              <MultiSelectDropdown
                label="Industries"

                placeholder="Search Industries"

                data={INDUSTRIES}

                value={industryInput}

                onChangeValue={
                  setIndustryInput
                }

                selectedItems={
                  selectedIndustries
                }

                onChangeSelectedItems={
                  setSelectedIndustries
                }
              />

            </ProfileSectionCard>

            {/* LOCATION */}
            <ProfileSectionCard
              title="Requirement Location"

              subtitle="Update preferred supplier or business location."
            >

              <CitySelector
                city={city}

                state={state}

                setCity={setCity}

                setState={setState}
              />

            </ProfileSectionCard>

            {/* IMAGE */}
            <ProfileSectionCard
              title="Reference Image"

              subtitle="Update sample or reference images if needed."
            >

              <UploadBox
                title="Upload Reference Image"
                imageUri={referenceImage}
                onPress={async () => {
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
          allowsEditing: true,
                    aspect: [16, 9],
          quality: 0.5,
          base64: true,
                  });

                  if (!result.canceled) {
                    setReferenceImage(result.assets[0].uri);
                    setReferenceImageBase64(result.assets[0].base64 || null);
                  }
                }}
                onRemove={() => setReferenceImage("")}
              />

            </ProfileSectionCard>

            {/* VALIDITY */}
            <ProfileSectionCard
              title="Requirement Validity"

              subtitle="Requirements automatically expire after 30 days."
            >

              <View
                style={
                  styles.validityBox
                }
              >

                <Text
                  style={
                    styles.validityTitle
                  }
                >

                  {requirement?.expiryText || "Expires in 30 Days"}

                </Text>

                <Text
                  style={
                    styles.validitySubtitle
                  }
                >

                  Expired requirements are automatically hidden from leads discovery.

                </Text>

              </View>

            </ProfileSectionCard>

            {/* BUTTON */}
            <View
              style={
                styles.buttonWrapper
              }
            >

              <PrimaryButton
                text={
                  saving
                    ? "Saving..."
                    : "Save Changes"
                }

                disabled={
                  saving ||
                  !title.trim() ||
                  !description.trim() ||
                  selectedIndustries.length === 0 ||
                  !state.trim() ||
                  !city.trim()
                }

                onPress={async () => {

                  setSaving(true);

                  try {
                    const token = await getAccessToken();
                    await updateRequirement(token as string, requirement.id, {
                      title,
                      description,
                      tags: selectedTags,
                      industries: selectedIndustries,
                      city,
                      state,
                      image_url: referenceImage,
          base64Image: referenceImageBase64
                    });
                    navigation.goBack();
                  } catch (err: any) {
                    console.log("Update Error:", err.response?.data || err);
                  } finally {
                    setSaving(false);
                  }

                }}
              />

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor:
      COLORS.primary,
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

    color: COLORS.white,
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 26,

    borderTopRightRadius: 26,

    overflow: "hidden",
  },

  contentContainer: {
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,

    gap: SPACING.md,
  },

  tagsSection: {
    marginTop:
      SPACING.lg,
  },

  tagsTitle: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.sm,
  },

  tagsContainer: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,
  },

  tagChip: {
    height: 38,

    paddingHorizontal:
      SPACING.lg,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },

  activeTagChip: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  tagText: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  activeTagText: {
    color: COLORS.white,
  },

  validityBox: {
    borderRadius: 20,

    backgroundColor:
      COLORS.surfaceSecondary,

    padding:
      SPACING.lg,
  },

  validityTitle: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  validitySubtitle: {
    marginTop: 6,

    fontSize: 12,

    lineHeight: 18,

    color:
      COLORS.textSecondary,
  },

  buttonWrapper: {
    marginTop:
      SPACING.sm,

    paddingBottom:
      SPACING.xxxl,
  },

});
