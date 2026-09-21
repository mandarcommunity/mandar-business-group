import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import MyAdvertisementsScreen from "../screens/MyAdvertisementsScreen";

import EditAdvertisementScreen from "../screens/EditAdvertisementScreen";

import CreateAdScreen from "../screens/CreateAdScreen";

const Stack =
  createNativeStackNavigator();

export default function AdvertisementsStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation: "fade",
      }}
    >

      <Stack.Screen
        name="MyAdvertisementsMain"
        component={MyAdvertisementsScreen}
      />

      <Stack.Screen
        name="CreateAdvertisement"
        component={CreateAdScreen}
      />

      <Stack.Screen
        name="EditAdvertisement"
        component={EditAdvertisementScreen}
      />

    </Stack.Navigator>
  );
}