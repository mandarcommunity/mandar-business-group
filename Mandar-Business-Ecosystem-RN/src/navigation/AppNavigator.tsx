import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  House,
  Search,
  BriefcaseBusiness,
  MessageCircleMore,
  UserRound,
} from "lucide-react-native";

import {
  ActivityIndicator,
  View,
} from "react-native";

import HomeScreen from "../screens/HomeScreen";

import NotificationsScreen from "../screens/NotificationsScreen";

import AuthNavigator
from "./AuthNavigator";

import {
  COLORS,
} from "../theme";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  useAuth,
} from "../context/AuthContext";

const Tab =
  createBottomTabNavigator();

export default function AppNavigator() {

  const insets =
    useSafeAreaInsets();

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

  /* AUTH */
  if (!isLoggedIn) {

    return (
      <AuthNavigator />
    );
  }

  /* MAIN APP */
  return (

    <Tab.Navigator

      screenOptions={({
        route,
      }) => ({

        headerShown: false,

        tabBarActiveTintColor:
          COLORS.accent,

        tabBarInactiveTintColor:
          COLORS.iconInactive,

        tabBarStyle: {

          height:
            68 +
            insets.bottom,

          paddingBottom:
            insets.bottom,

          paddingTop: 10,

          backgroundColor:
            COLORS.surface,

          borderTopWidth: 1,

          borderTopColor:
            COLORS.border,
        },

        tabBarLabelStyle: {

          fontSize: 11,

          fontWeight: "600",
        },

        tabBarIcon: ({
          color,

          focused,
        }) => {

          const iconSize =
            focused
              ? 23
              : 21;

          switch (
            route.name
          ) {

            case "Home":

              return (

                <House
                  size={iconSize}
                  color={color}
                />
              );

            case "Explore":

              return (

                <Search
                  size={iconSize}
                  color={color}
                />
              );

            case "Leads":

              return (

                <BriefcaseBusiness
                  size={iconSize}
                  color={color}
                />
              );

            case "Chats":

              return (

                <MessageCircleMore
                  size={iconSize}
                  color={color}
                />
              );

            case "Profile":

              return (

                <UserRound
                  size={iconSize}
                  color={color}
                />
              );

            default:

              return null;
          }
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Explore"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Leads"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Chats"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Profile"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Notifications"

        component={
          NotificationsScreen
        }

        options={{
          tabBarButton: () =>
            null,
        }}
      />

    </Tab.Navigator>
  );
}