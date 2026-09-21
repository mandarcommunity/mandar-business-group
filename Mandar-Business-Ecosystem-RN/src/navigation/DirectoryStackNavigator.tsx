import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import BusinessDirectoryScreen from "../screens/BusinessDirectoryScreen";

const Stack =
  createNativeStackNavigator();

export default function DirectoryStackNavigator() {

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

      <Stack.Screen
        name="BusinessDirectoryMain"
        component={BusinessDirectoryScreen}
      />

    </Stack.Navigator>
  );
}