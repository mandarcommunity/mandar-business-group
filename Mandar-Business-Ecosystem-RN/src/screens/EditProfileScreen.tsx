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
  useEffect,
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
  SafeAreaView,
} from "react-native-safe-area-context";

import ProfileSectionCard from "../components/profile/ProfileSectionCard";

import ProfileImageUpload from "../components/shared/ProfileImageUpload";

import PrimaryButton from "../components/shared/PrimaryButton";

import PrimaryInput from "../components/shared/PrimaryInput";

import PhoneInputField from "../components/shared/PhoneInputField";

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
  TYPOGRAPHY,
} from "../theme";

import {
  INDUSTRIES,
} from "../constants/industries";

import {

  getMyBusiness,

  updateBusiness,

} from "../services/auth.service";

import {

  getAccessToken,

} from "../utils/storage";

const BUSINESS_TYPES = [

  "Manufacturer",

  "Trader",

  "Wholesaler",

  "Exporter",

  "Distributor",

  "Service Provider",

];

export default function EditProfileScreen() {

  const navigation =
    useNavigation<any>();

  const [
    contactPerson,

    setContactPerson,

  ] = useState("");

  const [
    businessName,

    setBusinessName,

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
    selectedBusinessTypes,

    setSelectedBusinessTypes,

  ] = useState<string[]>([]);

  const [
    state,

    setState,

  ] = useState("");

  const [
    city,

    setCity,

  ] = useState("");

  const [
    address,

    setAddress,

  ] = useState("");

  const [
    email,

    setEmail,

  ] = useState("");

  const [

  mobile,

  setMobile,

] = useState("");

  const [
    website,

    setWebsite,

  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    profileImage,
    setProfileImage,
  ] = useState("");
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);

  const [
    saving,

    setSaving,

  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

const [

  hasError,

  setHasError,

] = useState(false);

  const contactLimit =
    80;

  const businessLimit =
    120;

  const descriptionLimit =
    500;

  const fetchBusiness =
  async () => {

    try {

      setIsLoading(true);

      const token =
        await getAccessToken();

      const response =
        await getMyBusiness(
          token as string
        );

      const business =
        response.data;

      setContactPerson(
        business.contactPerson || ""
      );

      setBusinessName(
        business.businessName || ""
      );

      setSelectedIndustries(
        business.industries || []
      );

      setSelectedBusinessTypes(
        business.businessTypes || []
      );

      setCity(
        business.city || ""
      );

      setState(
        business.state || ""
      );

      setAddress(
        business.address || ""
      );

      setEmail(
        business.email || ""
      );

      setMobile(
  business.mobile || ""
);

      setWebsite(
        business.website || ""
      );

      setDescription(
        business.description || ""
      );

      setProfileImage(
        business.profileImage || ""
      );

    } catch (error) {

      console.log(error);

      setHasError(true);

    } finally {

      setIsLoading(false);

    }

};  

useEffect(() => {

  fetchBusiness();

}, []);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading profile..."
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
          title="Unable to load profile"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (
    !contactPerson &&
    !businessName &&
    !email
  ) {

    console.log(
      "Editing empty profile"
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

          Edit Profile

        </Text>

      </View>

      {/* CONTENT */}
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

          automaticallyAdjustKeyboardInsets

          keyboardShouldPersistTaps="handled"

          keyboardDismissMode="interactive"

          contentInsetAdjustmentBehavior="always"

          contentContainerStyle={
            styles.contentContainer
          }
        >

          {/* BUSINESS IDENTITY */}
          <ProfileSectionCard
            title="Business Identity"

            subtitle="Build your professional business presence."
          >

            <ProfileImageUpload 
              imageUri={profileImage}
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ['images'],
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.5,
                  base64: true,
                });

                if (!result.canceled) {
                  setProfileImage(result.assets[0].uri);
                  setProfileImageBase64(result.assets[0].base64 || null);
                }
              }}
              onRemove={() => setProfileImage("")}
            />

            <CharacterCountInput
              label="Contact Person Name"

              value={contactPerson}

              onChangeText={
                setContactPerson
              }

              limit={
                contactLimit
              }

              placeholder="Contact Person Name"
            />

            <CharacterCountInput
              label="Business Name"

              value={businessName}

              onChangeText={
                setBusinessName
              }

              limit={
                businessLimit
              }

              placeholder="Business Name"
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
              
              maxSelectedItems={3}
            />

            {/* BUSINESS TYPES */}
            <View
              style={
                styles.businessTypeWrapper
              }
            >

              <Text
                style={
                  styles.sectionTitle
                }
              >

                Business Types

              </Text>

              <View
                style={
                  styles.optionsGrid
                }
              >

                {BUSINESS_TYPES.map(
                  (
                    item: string
                  ) => {

                    const isSelected =
                      selectedBusinessTypes.includes(
                        item
                      );

                    return (

                      <TouchableOpacity
                        key={item}

                        activeOpacity={0.9}

                        onPress={() => {

                          if (
                            isSelected
                          ) {

                            setSelectedBusinessTypes(

                              selectedBusinessTypes.filter(
                                (
                                  type: string
                                ) =>

                                  type !==
                                  item
                              )

                            );

                          } else {

                            setSelectedBusinessTypes([
                              ...selectedBusinessTypes,

                              item,
                            ]);

                          }

                        }}

                        style={[

                          styles.optionChip,

                          isSelected &&
                            styles.selectedChip,

                        ]}
                      >

                        <Text
                          style={[

                            styles.optionText,

                            isSelected &&
                              styles.selectedOptionText,

                          ]}
                        >

                          {item}

                        </Text>

                      </TouchableOpacity>

                    );
                  }
                )}

              </View>

            </View>

          </ProfileSectionCard>

          {/* BUSINESS LOCATION */}
          <ProfileSectionCard
            title="Business Location"

            subtitle="Add your business location details."
          >

            <CitySelector
              city={city}

              state={state}

              setCity={setCity}

              setState={setState}
            />

            <CharacterCountInput
              label="Full Business Address"

              value={address}

              onChangeText={
                setAddress
              }

              limit={250}

              multiline

              warningLimit={220}

              placeholder="Full Business Address"
            />

          </ProfileSectionCard>

          {/* CONTACT DETAILS */}
          <ProfileSectionCard
            title="Contact Details"

            subtitle="Businesses will use these details to connect with you."
          >

            <PhoneInputField

  value={mobile}

  onChangeText={
    setMobile
  }

/>

            <PrimaryInput
              value={email}

              onChangeText={
                setEmail
              }

              placeholder="Email Address"

              keyboardType="email-address"

              autoCapitalize="none"
            />

            <PrimaryInput
              value={website}

              onChangeText={
                setWebsite
              }

              placeholder="Website (Optional)"

              keyboardType="url"

              autoCapitalize="none"
            />

          </ProfileSectionCard>

          {/* BUSINESS DESCRIPTION */}
          <ProfileSectionCard
            title="Business Description"

            subtitle="Describe your business, services or products."
          >

            <CharacterCountInput
              label="Business Description"

              value={description}

              onChangeText={
                setDescription
              }

              limit={
                descriptionLimit
              }

              warningLimit={420}

              multiline

              placeholder="Write business description..."
            />

          </ProfileSectionCard>

          {/* SAVE BUTTON */}
          <View
            style={
              styles.buttonWrapper
            }
          >

            <PrimaryButton
              text={
                saving
                  ? "Saving..."
                  : "Save Profile"
              }

              disabled={
                saving ||
                !contactPerson.trim() ||
                !businessName.trim() ||
                selectedIndustries.length === 0 ||
                selectedBusinessTypes.length === 0 ||
                !state.trim() ||
                !city.trim() ||
                !address.trim() ||
                !email.trim() ||
                !description.trim()
              }

              onPress={async () => {

                try {

  setSaving(true);

  const token =
    await getAccessToken();

  await updateBusiness(

    {

      contactPerson,

      businessName,

      industries:
        selectedIndustries,

      businessTypes:
        selectedBusinessTypes,

      city,

      state,

      address,

      website,

      description,

      email,
      mobile,
      profileImage,
        base64Image: profileImageBase64,
    },

    token as string
  );

  alert(
    "Profile updated successfully"
  );

  navigation.goBack();

} catch (error: any) {

  console.log(error);

  alert(
    "Failed to update profile"
  );

} finally {

  setSaving(false);

}

              }}
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
      SPACING.md,

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
      140,

    gap: SPACING.md,
  },

  businessTypeWrapper: {
    marginTop:
      SPACING.lg,
  },

  sectionTitle: {
    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.md,
  },

  optionsGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,
  },

  optionChip: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 999,

    paddingHorizontal: 14,

    paddingVertical: 10,
  },

  selectedChip: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  optionText: {
    color:
      COLORS.textPrimary,

    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "600",
  },

  selectedOptionText: {
    color:
      COLORS.white,
  },

  buttonWrapper: {
    paddingBottom:
      80,

    paddingTop:
      SPACING.lg,
  },

});