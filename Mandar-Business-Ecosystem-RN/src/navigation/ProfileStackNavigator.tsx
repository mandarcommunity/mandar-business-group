import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";

import EditProfileScreen from "../screens/EditProfileScreen";

import NotificationsScreen from "../screens/NotificationsScreen";

import VerificationStatusScreen from "../screens/VerificationStatusScreen";

import VerificationSubmissionScreen from "../screens/VerificationSubmissionScreen";

import TermsConditionsScreen from "../screens/TermsConditionsScreen";

import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

import FeedbackScreen from "../screens/FeedbackScreen";

import BusinessProfileScreen from "../screens/BusinessProfileScreen";

import ProductsStackNavigator from "./ProductsStackNavigator";

import RequirementsStackNavigator from "./RequirementsStackNavigator";

import AdvertisementsStackNavigator from "./AdvertisementsStackNavigator";

import DirectoryStackNavigator from "./DirectoryStackNavigator";

import SavedBusinessesStackNavigator from "./SavedBusinessesStackNavigator";

import BusinessCatalogScreen from "../screens/BusinessCatalogScreen";

const Stack =
  createNativeStackNavigator();

export default function ProfileStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{

  headerShown: false,

  animation:
    "slide_from_right",

  contentStyle: {
    backgroundColor:
      "transparent",
  },
}}
    >

      {/* PROFILE */}
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
      />

      {/* VIEW PROFILE */}
      <Stack.Screen
        name="BusinessProfile"
        component={
          BusinessProfileScreen
        }
      />

      <Stack.Screen
  name="BusinessCatalog"
  component={
    BusinessCatalogScreen
  }
/>

      {/* EDIT PROFILE */}
      <Stack.Screen
        name="EditProfile"
        component={
          EditProfileScreen
        }
      />

      {/* NOTIFICATIONS */}
<Stack.Screen
  name="Notifications"
  component={
    NotificationsScreen
  }
/>

      {/* VERIFICATION STATUS */}
      <Stack.Screen
        name="VerificationStatus"
        component={
          VerificationStatusScreen
        }
      />

      {/* VERIFICATION SUBMISSION */}
      <Stack.Screen
        name="VerificationSubmission"
        component={
          VerificationSubmissionScreen
        }
      />

      {/* TERMS & CONDITIONS */}
      <Stack.Screen
        name="TermsConditions"
        component={
          TermsConditionsScreen
        }
      />

      {/* PRIVACY POLICY */}
      <Stack.Screen
        name="PrivacyPolicy"
        component={
          PrivacyPolicyScreen
        }
      />

      {/* FEEDBACK */}
      <Stack.Screen
        name="Feedback"
        component={
          FeedbackScreen
        }
      />

      {/* PRODUCTS */}
      <Stack.Screen
        name="MyProducts"
        component={
          ProductsStackNavigator
        }
      />

      {/* REQUIREMENTS */}
      <Stack.Screen
        name="MyRequirements"
        component={
          RequirementsStackNavigator
        }
      />

      {/* ADS */}
      <Stack.Screen
        name="MyAdvertisements"
        component={
          AdvertisementsStackNavigator
        }
      />

      {/* DIRECTORY */}
      <Stack.Screen
        name="BusinessDirectory"
        component={
          DirectoryStackNavigator
        }
      />

      {/* SAVED BUSINESSES */}
      <Stack.Screen
        name="SavedBusinesses"
        component={
          SavedBusinessesStackNavigator
        }
      />

    </Stack.Navigator>
  );
}