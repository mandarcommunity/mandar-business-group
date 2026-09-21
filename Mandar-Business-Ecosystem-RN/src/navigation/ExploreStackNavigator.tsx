import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ExploreScreen from "../screens/ExploreScreen";

import AllIndustriesScreen from "../screens/AllIndustriesScreen";

import IndustryDetailsScreen from "../screens/IndustryDetailsScreen";

import BusinessCatalogScreen from "../screens/BusinessCatalogScreen";

import AdvertisementFeedScreen from "../screens/AdvertisementFeedScreen";

import AdvertisementDetailsScreen from "../screens/AdvertisementDetailsScreen";

import BusinessProfileScreen from "../screens/BusinessProfileScreen";

const Stack =
  createNativeStackNavigator();

export default function ExploreStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="ExploreHome"
        component={ExploreScreen}
      />

      <Stack.Screen
        name="AllIndustries"
        component={
          AllIndustriesScreen
        }
      />

      <Stack.Screen
        name="IndustryDetails"
        component={
          IndustryDetailsScreen
        }
      />

      <Stack.Screen
        name="BusinessCatalog"
        component={
          BusinessCatalogScreen
        }
      />

      <Stack.Screen
        name="BusinessProfile"
        component={
          BusinessProfileScreen
        }
      />

      <Stack.Screen
        name="AdvertisementFeed"
        component={
          AdvertisementFeedScreen
        }
      />

      <Stack.Screen
        name="AdvertisementDetails"
        component={
          AdvertisementDetailsScreen
        }
      />



    </Stack.Navigator>
  );
}