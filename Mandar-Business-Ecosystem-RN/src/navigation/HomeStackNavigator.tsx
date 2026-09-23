import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import CreateAdScreen from "../screens/CreateAdScreen";

import CreateRequirementScreen from "../screens/CreateRequirementScreen";

import AllIndustriesScreen from "../screens/AllIndustriesScreen";
import IndustryDetailsScreen from "../screens/IndustryDetailsScreen";
import SponsorEnquiryScreen from "../screens/SponsorEnquiryScreen";

import NotificationsScreen from "../screens/NotificationsScreen";
import DirectoryStackNavigator from "./DirectoryStackNavigator";

const Stack =
  createNativeStackNavigator();

export default function HomeStackNavigator() {

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

      {/* HOME */}
      <Stack.Screen
        name="HomeMain"
        component={
          HomeScreen
        }
      />

      {/* CREATE AD */}
      <Stack.Screen
        name="CreateAd"
        component={
          CreateAdScreen
        }
      />

      {/* CREATE REQUIREMENT */}
      <Stack.Screen
        name="CreateRequirement"
        component={
          CreateRequirementScreen
        }
      />

      {/* ALL INDUSTRIES */}
      <Stack.Screen
        name="AllIndustries"
        component={
          AllIndustriesScreen
        }
      />

      {/* INDUSTRY DETAILS */}
      <Stack.Screen
        name="IndustryDetails"
        component={
          IndustryDetailsScreen
        }
      />

      {/* SPONSOR ENQUIRY */}
      <Stack.Screen
        name="SponsorEnquiry"
        component={
          SponsorEnquiryScreen
        }
      />

      {/* NOTIFICATIONS */}
      <Stack.Screen
        name="Notifications"
        component={
          NotificationsScreen
        }
      />

      {/* BUSINESS DIRECTORY */}
      <Stack.Screen
        name="BusinessDirectory"
        component={DirectoryStackNavigator}
      />

    </Stack.Navigator>

  );
}