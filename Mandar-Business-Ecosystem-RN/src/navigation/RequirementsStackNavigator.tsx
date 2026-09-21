import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import MyRequirementsScreen from "../screens/MyRequirementsScreen";

import EditRequirementScreen from "../screens/EditRequirementScreen";

import CreateRequirementScreen from "../screens/CreateRequirementScreen";

const Stack =
  createNativeStackNavigator();

export default function RequirementsStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation: "fade",
      }}
    >

      <Stack.Screen
        name="MyRequirementsMain"
        component={MyRequirementsScreen}
      />

      <Stack.Screen
  name="CreateRequirement"
  component={CreateRequirementScreen}
/>

      <Stack.Screen
        name="EditRequirement"
        component={EditRequirementScreen}
      />

    </Stack.Navigator>
  );
}