import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ChatsScreen from "../screens/ChatsScreen";

import ConversationScreen from "../screens/ConversationScreen";

import BusinessProfileScreen from "../screens/BusinessProfileScreen";

import BusinessCatalogScreen from "../screens/BusinessCatalogScreen";

const Stack =
  createNativeStackNavigator();

export default function ChatsStackNavigator() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="ChatsMain"
        component={ChatsScreen}
      />

      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
      />

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

    </Stack.Navigator>

  );
}