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
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import FormSection from "../components/shared/FormSection";

import UploadBox from "../components/shared/UploadBox";
import ProductImageUpload from "../components/products/ProductImageUpload";
import * as ImagePicker from 'expo-image-picker';

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

import { createAdvertisement } from "../services/advertisement.service";
import { getAccessToken } from "../utils/storage";

import {
  COLORS,
  SPACING,
} from "../theme";

import {
  INDUSTRIES,
} from "../constants/industries";

export default function CreateAdScreen() {
  const [productImageBase64, setProductimageBase64] = useState<string | null>(null);

  const navigation =
    useNavigation<any>();

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
    ctaType,

    setCtaType,

  ] = useState<
    "connect_now" |
    "visit_catalog"
  >("connect_now");

  const [
    publishing,

    setPublishing,

  ] = useState(false);

  const [
    productImage,
    setProductImage,
  ] = useState<string | null>(null);

  const [
    imageUploading,
    setImageUploading,
  ] = useState(false);

  const [
    error,

    setError,

  ] = useState("");

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    searchFocused,

    setSearchFocused,

  ] = useState(false);

  const titleLimit =
    120;

  const descriptionLimit =
    2500;

  const handleImageUpload = async () => {
    setImageUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
          allowsEditing: true,
        aspect: [4, 3],
          quality: 0.5,
          base64: true,
      });

      if (!result.canceled) {
        setProductImage(result.assets[0].uri);
        setProductimageBase64(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.log('Image upload error:', error);
    } finally {
      setImageUploading(false);
    }
  };

  const handlePublish =
    async () => {

      if (
        !title.trim() ||
        !description.trim() ||
        selectedIndustries.length === 0 ||
        !city.trim() ||
        !state.trim()
      ) {

        setError(
          "Please complete all required details."
        );

        return;
      }

      setError("");
      
      try {
        setPublishing(true);
        const token = await getAccessToken();
        if (!token) throw new Error("Not logged in");

        await createAdvertisement(token as string, {
          title,
          description,
          industries: selectedIndustries,
          city,
          state,
          cta_type: ctaType,
          image_url: productImage,
            base64Image: productImageBase64 // actual upload string
        });

        navigation.goBack(); // or navigate to success state if we had one
      } catch (err: any) {
        console.log(err);
        setError(err.response?.data?.message || err.message || "Failed to create ad");
      } finally {
        setPublishing(false);
      }
    };

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading form..."
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
          title="Unable to load form"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (
    !publishing &&
    !error &&
    title &&
    description
  ) {}

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

              Create Advertisement

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Promote your business

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
              title="Advertisement Details"
              subtitle="Create a business showcase post for the ecosystem."
            >

              {/* TITLE */}
              <CharacterCountInput
                label="Advertisement Title"

                value={title}

                onChangeText={
                  setTitle
                }

                limit={titleLimit}

                placeholder="Business or Product Title"
              />

              {/* DESCRIPTION */}
              <CharacterCountInput
                label="Advertisement Description"

                value={description}

                onChangeText={
                  setDescription
                }

                limit={descriptionLimit}

                warningLimit={2200}

                multiline

                placeholder="Describe your business, products, services or business story..."
              />

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
              title="Business Location"
              subtitle="Add your business location details."
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
              title="Advertisement Image"
              subtitle="Upload a business, service or product related promotional image."
            >

            <UploadBox
              title={imageUploading ? "Uploading..." : "Upload Showcase Image"}
              imageUri={productImage || undefined}
              onPress={handleImageUpload}
              onRemove={() => { setProductImage(null); setProductimageBase64(null); }}
            />

            </FormSection>

            {/* CTA */}
            <FormSection
              title="Call To Action"
              subtitle="Choose how users should interact with your business."
            >

              <View
                style={styles.ctaRow}
              >

                {/* CONNECT NOW */}
                <TouchableOpacity
                  activeOpacity={0.9}

                  onPress={() =>
                    setCtaType(
                      "connect_now"
                    )
                  }

                  style={[

                    styles.ctaCard,

                    ctaType ===
                      "connect_now" &&
                      styles.activeCtaCard,

                  ]}
                >

                  <Text
                    style={[

                      styles.ctaTitle,

                      ctaType ===
                        "connect_now" &&
                        styles.activeCtaTitle,

                    ]}
                  >

                    Connect Now

                  </Text>

                </TouchableOpacity>

                {/* VISIT CATALOG */}
                <TouchableOpacity
                  activeOpacity={0.9}

                  onPress={() =>
                    setCtaType(
                      "visit_catalog"
                    )
                  }

                  style={[

                    styles.ctaCard,

                    ctaType ===
                      "visit_catalog" &&
                      styles.activeCtaCard,

                  ]}
                >

                  <Text
                    style={[

                      styles.ctaTitle,

                      ctaType ===
                        "visit_catalog" &&
                        styles.activeCtaTitle,

                    ]}
                  >

                    Visit Catalog

                  </Text>

                </TouchableOpacity>

              </View>

            </FormSection>

            {/* ERROR */}
            {error ? (

              <Text
                style={
                  styles.errorText
                }
              >

                {error}

              </Text>

            ) : null}

            {/* BUTTON */}
            <View
              style={
                styles.buttonWrapper
              }
            >

              <PrimaryButton
                text={
                  publishing
                    ? "Publishing..."
                    : "Publish Advertisement"
                }

                disabled={
                  publishing
                }

                onPress={
                  handlePublish
                }
              />

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
      "rgba(255,255,255,0.7)",
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

  ctaRow: {
    gap:
      SPACING.md,
  },

  ctaCard: {
    minHeight: 58,

    borderRadius: 20,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    backgroundColor:
      COLORS.surface,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal:
      SPACING.lg,
  },

  activeCtaCard: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  ctaTitle: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    textAlign: "center",
  },

  activeCtaTitle: {
    color:
      COLORS.white,
  },

  errorText: {
    marginTop:
      SPACING.sm,

    fontSize: 12,

    fontWeight: "600",

    color: "#ef4444",
  },

  buttonWrapper: {
    marginTop:
      SPACING.sm,
  },

});

