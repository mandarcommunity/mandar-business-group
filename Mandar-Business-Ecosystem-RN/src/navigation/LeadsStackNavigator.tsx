import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LeadsScreen from "../screens/LeadsScreen";

const Stack =
  createNativeStackNavigator();

export default function LeadsStackNavigator() {

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
        name="LeadsMain"
        component={LeadsScreen}
      />

    </Stack.Navigator>
  );
}