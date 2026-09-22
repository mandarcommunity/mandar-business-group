import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useState,
} from "react";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";

import AuthHeader from "../components/auth/AuthHeader";

import PrimaryInput from "../components/auth/PrimaryInput";

import PrimaryButton from "../components/auth/PrimaryButton";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import MultiSelectDropdown
from "../components/shared/MultiSelectSearchDropdown";

import CitySelector
from "../components/shared/CitySelector";

import CharacterCountInput
from "../components/shared/CharacterCountInput";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import { useIndustries } from "../hooks/useIndustries";

import {

  createBusiness,

} from "../services/business.service";

import {
  useAuth,
} from "../context/AuthContext";

import {

  getAccessToken,

} from "../utils/storage";

import {

  getRefreshToken,

} from "../utils/storage";

import {

  getUser,

} from "../utils/storage";

const BUSINESS_TYPES = [

  "Manufacturer",

  "Trader",

  "Wholesaler",

  "Exporter",

  "Distributor",

  "Service Provider",

];

export default function SetupBusinessScreen() {
  const { industries: INDUSTRIES } = useIndustries();

  const navigation =
    useNavigation<any>();

    const { login } =
  useAuth();

  const insets =
    useSafeAreaInsets();

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
    city,

    setCity,

  ] = useState("");

  const [
    state,

    setState,

  ] = useState("");

  const [
    address,

    setAddress,

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
    selectedBusinessTypes,

    setSelectedBusinessTypes,

  ] = useState<string[]>([]);

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    submitting,

    setSubmitting,

  ] = useState(false);

  const businessNameLimit =
    80;

  const descriptionLimit =
    250;

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Preparing business setup..."
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
          title="Unable to load setup"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        keyboardDismissMode="interactive"

        enableOnAndroid

        enableAutomaticScroll

        extraScrollHeight={40}

        keyboardOpeningTime={0}

        contentContainerStyle={[

          styles.scrollContent,

          {
            paddingBottom:
              insets.bottom +
              40,
          },

        ]}
      >

        {/* HEADER */}
        <AuthHeader
          title="Business Setup"

          subtitle="Complete your professional business identity."
        />

        {/* FORM */}
        <View style={styles.form}>

          {/* BUSINESS NAME */}
          <CharacterCountInput
            label="Business Name"

            value={businessName}

            onChangeText={
              setBusinessName
            }

            limit={
              businessNameLimit
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

          {/* BUSINESS TYPE */}
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

              Business Type

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

                    <Pressable
                      key={item}

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

                    </Pressable>

                  );
                }
              )}

            </View>

          </View>

          {/* LOCATION */}
          <CitySelector
            city={city}

            state={state}

            setCity={setCity}

            setState={setState}
          />

          {/* ADDRESS */}
          <PrimaryInput
            value={address}

            onChangeText={
              setAddress
            }

            placeholder="Full Business Address"

            autoCapitalize="sentences"
          />

          {/* WEBSITE */}
          <PrimaryInput
            value={website}

            onChangeText={
              setWebsite
            }

            placeholder="Business Website (Optional)"

            keyboardType="url"

            autoCapitalize="none"
          />

          {/* DESCRIPTION */}
          <CharacterCountInput
            label="Business Description"

            value={description}

            onChangeText={
              setDescription
            }

            limit={
              descriptionLimit
            }

            warningLimit={220}

            multiline

            placeholder="Tell businesses about your products, services or expertise..."
          />

        </View>

        {/* ACTIONS */}
        <View
          style={
            styles.bottomSection
          }
        >

          <PrimaryButton
            text={
              submitting
                ? "Setting Up..."
                : "Complete Setup"
            }

            disabled={
              !businessName.trim() ||
              selectedIndustries.length === 0 ||
              !city.trim() ||
              !state.trim() ||
              selectedBusinessTypes.length === 0 ||
              submitting
            }

            onPress={async () => {

  try {

    setSubmitting(true);

    const token =
  await getAccessToken();

    const response =
      await createBusiness(

        {

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
        },

        token as string
      );

    console.log(
      response
    );

    const savedUser =
  await getUser();

await login({

  user:
    savedUser,

  accessToken:
    token,

  refreshToken:
    await getRefreshToken(),
});

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    alert(

      error?.response?.data
        ?.message ||

      "Business setup failed"
    );

  } finally {

    setSubmitting(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.navigate(
                "Login"
              )
            }

            style={
              styles.backButton
            }
          >

            <Text
              style={
                styles.backText
              }
            >

              Back to Login

            </Text>

          </Pressable>

        </View>

      </KeyboardAwareScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.xl,
  },

  form: {
    marginTop:
      SPACING.lg,
  },

  businessTypeWrapper: {
    marginTop:
      SPACING.lg,

    marginBottom:
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
    minHeight: 42,

    borderRadius: 999,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal: 14,

    paddingVertical: 10,

    alignItems: "center",

    justifyContent: "center",
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

    textAlign: "center",
  },

  selectedOptionText: {
    color:
      COLORS.white,
  },

bottomSection: {
  marginTop:
    SPACING.xxxl,

  paddingBottom:
    SPACING.lg,
},

  backButton: {
    marginTop:
      SPACING.lg,

    alignItems: "center",
  },

  backText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

});