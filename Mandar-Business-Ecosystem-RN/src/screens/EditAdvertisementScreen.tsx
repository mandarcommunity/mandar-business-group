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
  useEffect,
} from "react";

import * as ImagePicker from 'expo-image-picker';

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { updateAdvertisement } from "../services/advertisement.service";
import { getAccessToken } from "../utils/storage";

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

export default function EditAdvertisementScreen() {
  const [imageUriBase64, setImageuriBase64] = useState<string | null>(null);

  const navigation =
    useNavigation<any>();

  const route = useRoute<any>();
  const ad = route.params?.ad || {};

  const [
    title,

    setTitle,
  ] = useState("");

  const [
    description,

    setDescription,
  ] = useState("");

  const [
    productImage,
    setProductImage,
  ] = useState<string | null>(null);

  const [
    ctaType,

    setCtaType,
  ] = useState<
    "connect_now" |
    "visit_catalog"
  >("connect_now");

  const [
    saving,

    setSaving,
  ] = useState(false);

  const [
    saved,

    setSaved,
  ] = useState(false);

  const [
    imageUploading,

    setImageUploading,
  ] = useState(false);

  const [
    selectedIndustries,

    setSelectedIndustries,
  ] = useState<string[]>([]);

  const [
    industryInput,

    setIndustryInput,
  ] = useState("");

  const [
    selectedState,

    setSelectedState,
  ] = useState("");

  const [
    selectedCity,

    setSelectedCity,
  ] = useState("");

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const titleLimit =
    120;

  const descriptionLimit =
    2000;

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    try {
      setSaving(true);
      const token = await getAccessToken();
      
      await updateAdvertisement(
        token as string,
        ad.id,
        {
          title,
          description,
          ctaType,
          imageUrl: productImage,
          industries: selectedIndustries,
          city: selectedCity,
          state: selectedState,
          base64Image: imageUriBase64,
        }
      );
      
      alert("Advertisement updated successfully");
      navigation.goBack();
    } catch (error: any) {
      alert(error.message || "Failed to update advertisement");
    } finally {
      setSaving(false);
    }
  };

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading advertisement..."
        />

      </SafeAreaView>
    );
  }

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
        setImageuriBase64(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.log('Image upload error:', error);
    } finally {
      setImageUploading(false);
    }
  };

  useEffect(() => {
    if (ad) {
      setTitle(ad.title || "");
      setDescription(ad.description || "");
      
      const img = ad.image_url || ad.image;
      if (img && img !== "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d") {
        setProductImage(img);
      }
      
      setCtaType(ad.cta_type || "connect_now");

      if (ad.industries && Array.isArray(ad.industries)) {
        setSelectedIndustries(ad.industries);
      }
      if (ad.city) {
        setSelectedCity(ad.city);
      }
      if (ad.state) {
        setSelectedState(ad.state);
      }
    }
  }, []);

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Unable to load advertisement"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>
    );
  }

  /* SUCCESS */
  if (saved) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <EmptyState
          title="Advertisement updated"

          description="Your advertisement changes have been saved successfully."
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
              COLORS.textPrimary
            }
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>

          Edit Advertisement

        </Text>

      </View>

      {/* CONTENT */}
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
            title="Advertisement Details"

            subtitle="Update your business promotion details."
          >

            <CharacterCountInput
              label="Advertisement Title"

              value={title}

              onChangeText={
                setTitle
              }

              limit={
                titleLimit
              }

              placeholder="Advertisement Title"
            />

            <CharacterCountInput
              label="Advertisement Description"

              value={description}

              onChangeText={
                setDescription
              }

              limit={
                descriptionLimit
              }

              warningLimit={1800}

              multiline

              placeholder="Describe your business, products, services or promotional story..."
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

          </ProfileSectionCard>

          {/* LOCATION */}
          <ProfileSectionCard
            title="Business Location"

            subtitle="Update your business location details."
          >

            <CitySelector
              city={selectedCity}

              state={selectedState}

              setCity={setSelectedCity}

              setState={setSelectedState}
            />

          </ProfileSectionCard>

          {/* IMAGE UPLOAD */}
          <ProfileSectionCard title="Advertisement Image">
            <UploadBox
              title={imageUploading ? "Uploading..." : "Upload Showcase Image"}
              imageUri={productImage || undefined}
              onPress={handleImageUpload}
              onRemove={() => { setProductImage(null); setImageuriBase64(null); }}
            />
          </ProfileSectionCard>

          {/* CTA */}
          <ProfileSectionCard
            title="Call To Action"

            subtitle="Choose how users should interact with your business."
          >

            <View style={styles.ctaRow}>

              {/* CONNECT NOW */}
              <TouchableOpacity
                activeOpacity={0.9}

                onPress={() => setCtaType("connect_now")}

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

          </ProfileSectionCard>

          {/* VALIDITY */}
          <ProfileSectionCard
            title="Advertisement Validity"

            subtitle="Promotions automatically expire after 15 days."
          >

            <View
              style={styles.validityBox}
            >

              <Text
                style={
                  styles.validityTitle
                }
              >
                {ad?.expiryText || "Expires in 15 days"}
              </Text>

              <Text
                style={
                  styles.validitySubtitle
                }
              >

                Expired promotions are automatically hidden from discovery.

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
                  ? "Saving Changes..."
                  : "Save Changes"
              }

              loading={
                saving
              }

              disabled={
                saving ||
                !title.trim() ||
                !description.trim()
              }

              onPress={
                handleSave
              }
            />

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

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
      COLORS.background,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.lg,

    paddingTop: SPACING.md,

    paddingBottom:
      SPACING.lg,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 16,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  contentContainer: {
    padding: SPACING.lg,

    paddingBottom:
      SPACING.xxxl,

    gap: SPACING.md,
  },

  ctaRow: {
    gap: SPACING.md,
  },

  ctaCard: {
    height: 58,

    borderRadius: 20,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    backgroundColor:
      COLORS.surface,

    alignItems: "center",

    justifyContent: "center",
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
  },

  activeCtaTitle: {
    color: COLORS.white,
  },

  validityBox: {
    borderRadius: 20,

    backgroundColor:
      COLORS.surfaceSecondary,

    padding: SPACING.lg,
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

  uploadingBox: {
    marginTop: SPACING.md,

    borderRadius: 16,

    backgroundColor:
      COLORS.surfaceSecondary,

    padding: SPACING.md,
  },

  uploadingText: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  buttonWrapper: {
    paddingBottom:
      SPACING.xxxl,
  },

});


