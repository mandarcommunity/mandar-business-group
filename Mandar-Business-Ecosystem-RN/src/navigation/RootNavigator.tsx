import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AuthNavigator
from "./AuthNavigator";

import MainTabsNavigator
from "./MainTabsNavigator";

import NotificationsScreen
from "../screens/NotificationsScreen";

import {
  useAuth,
} from "../context/AuthContext";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  COLORS,
} from "../theme";

const Stack =
  createNativeStackNavigator();

const navigationTheme = {

  ...DefaultTheme,

  colors: {

    ...DefaultTheme.colors,

    background:
      "transparent",
  },
};

export default function RootNavigator() {

  const {

    isLoggedIn,

    loading,

  } = useAuth();

  /* LOADING */
  if (loading) {

    return (

      <View
        style={{

          flex: 1,

          justifyContent:
            "center",

          alignItems:
            "center",

          backgroundColor:
            COLORS.background,
        }}
      >

        <ActivityIndicator
          size="large"
          color={COLORS.accent}
        />

      </View>
    );
  }

  return (

    <NavigationContainer
      theme={navigationTheme}
    >

      {isLoggedIn ? (

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

          <Stack.Screen
            name="MainTabs"
            component={
              MainTabsNavigator
            }
          />

          <Stack.Screen
            name="Notifications"
            component={
              NotificationsScreen
            }
          />

        </Stack.Navigator>

      ) : (

        <AuthNavigator />

      )}

    </NavigationContainer>
  );
}