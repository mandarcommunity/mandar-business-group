import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import SavedBusinessesScreen from "../screens/SavedBusinessesScreen";

const Stack =
  createNativeStackNavigator();

export default function SavedBusinessesStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation: "fade",
      }}
    >

      <Stack.Screen
        name="SavedBusinessesMain"
        component={SavedBusinessesScreen}
      />

    </Stack.Navigator>
  );
}