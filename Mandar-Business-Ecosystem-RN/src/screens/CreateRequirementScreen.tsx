import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
} from "react";
import * as ImagePicker from 'expo-image-picker';

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView as SafeArea,
} from "react-native-safe-area-context";

import FormSection from "../components/shared/FormSection";

import UploadBox from "../components/shared/UploadBox";

import PrimaryButton from "../components/auth/PrimaryButton";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import MultiSelectDropdown
from "../components/shared/MultiSelectSearchDropdown";

import CitySelector
from "../components/shared/CitySelector";

import CharacterCountInput
from "../components/shared/CharacterCountInput";

import { createRequirement } from "../services/requirement.service";
import { getAccessToken } from "../utils/storage";

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

export default function CreateRequirementScreen() {
  const [referenceImageBase64, setReferenceImageBase64] = useState<string | null>(null);

  const navigation =
    useNavigation<any>();

  const [
    selectedTags,

    setSelectedTags,
  ] = useState<string[]>([]);

  const [
    title,

    setTitle,
  ] = useState("");

  const [
    description,

    setDescription,
  ] = useState("");

  const [
    selectedIndustries,

    setSelectedIndustries,
  ] = useState<string[]>([]);

  const [
    industryInput,

    setIndustryInput,
  ] = useState("");

  const [
    city,

    setCity,
  ] = useState("");

  const [
    state,

    setState,
  ] = useState("");

  const [
    hasError,
    setHasError,
  ] = useState(false);

  const [
    referenceImage,
    setReferenceImage,
  ] = useState("");

  const [
    posting,

    setPosting,
  ] = useState(false);

  const [
    posted,

    setPosted,
  ] = useState(false);

  const [
    isLoading,
  ] = useState(false);

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

  const handlePost =
    async () => {

      if (
        !title.trim() ||
        !description.trim() ||
        selectedIndustries.length === 0
      ) {

        return;
      }

      try {
        setPosting(true);
        const token = await getAccessToken();
        if (!token) throw new Error("Not logged in");

        await createRequirement(token as string, {
          title,
          description,
          tags: selectedTags,
          industries: selectedIndustries,
          city,
          state,
          image_url: referenceImage,
          base64Image: referenceImageBase64
        });

        setPosted(true);
      } catch (error) {
        console.log(error);
        // We could set an error state here, but for now just log it
      } finally {
        setPosting(false);
      }
    };

  /* LOADING */
  if (isLoading) {

    return (

      <SafeArea
        style={styles.container}
      >

        <LoadingState
          title="Loading requirement form..."
        />

      </SafeArea>

    );
  }

  /* ERROR */
  if (hasError) {

    return (

      <SafeArea
        style={styles.container}
      >

        <ErrorState
          title="Unable to load requirement form"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeArea>

    );
  }

  /* SUCCESS */
  if (posted) {

    return (

      <SafeArea
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

                Requirement Posted

              </Text>

              <Text
                style={
                  styles.headerSubtitle
                }
              >

                Your requirement is live

              </Text>

            </View>

          </View>

        </View>

        <View
          style={
            styles.contentWrapper
          }
        >

          <View
            style={
              styles.successWrapper
            }
          >

            <EmptyState
              title="Requirement posted successfully"

              description="Businesses and suppliers can now discover your requirement."
            />

          </View>

        </View>

      </SafeArea>

    );
  }

  return (

    <SafeArea
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

              Post Requirement

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Find suppliers & opportunities

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

            {/* DETAILS */}
            <FormSection
              title="Requirement Details"
              subtitle="Describe what your business is looking for."
            >

              {/* TITLE */}
              <CharacterCountInput
                label="Requirement Title"

                value={title}

                onChangeText={
                  setTitle
                }

                limit={titleLimit}

                placeholder="Requirement Title"
              />

              {/* DESCRIPTION */}
              <CharacterCountInput
                label="Requirement Description"

                value={description}

                onChangeText={
                  setDescription
                }

                limit={descriptionLimit}

                warningLimit={420}

                multiline

                placeholder="Describe your requirement..."
              />

              {/* TAGS */}
              <View
                style={styles.tagsSection}
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

                            {tag.label}

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

            </FormSection>

            {/* LOCATION */}
            <FormSection
              title="Requirement Location"
              subtitle="Select where you want suppliers or businesses from."
            >

              <CitySelector
                city={city}

                state={state}

                setCity={setCity}

                setState={setState}
              />

            </FormSection>

            {/* IMAGE */}
            <FormSection
              title="Reference Image"
              subtitle="Upload sample, product or reference images if available."
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

            </FormSection>

            {/* BUTTON */}
            <View
              style={
                styles.buttonWrapper
              }
            >

              <PrimaryButton
                text={
                  posting
                    ? "Posting Requirement..."
                    : "Post Requirement"
                }

                loading={
                  posting
                }

                disabled={
                  posting ||
                  !title.trim() ||
                  !description.trim() ||
                  selectedIndustries.length === 0
                }

                onPress={
                  handlePost
                }
              />

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </View>

    </SafeArea>

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

    gap:
      SPACING.lg,
  },

  successWrapper: {
    flex: 1,

    justifyContent:
      "center",

    padding:
      SPACING.lg,
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
    minHeight: 38,

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

    textAlign: "center",
  },

  activeTagText: {
    color:
      COLORS.white,
  },

  buttonWrapper: {
    marginTop:
      SPACING.sm,
  },

});
