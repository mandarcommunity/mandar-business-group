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
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import HomeStackNavigator from "./HomeStackNavigator";

import ChatsStackNavigator from "./ChatsStackNavigator";

import ProfileStackNavigator from "./ProfileStackNavigator";

import LeadsStackNavigator from "./LeadsStackNavigator";

import ExploreStackNavigator
from "./ExploreStackNavigator";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

const Tab =
  createBottomTabNavigator();

export default function MainTabsNavigator() {

  const insets =
    useSafeAreaInsets();

    const commonTabBarStyle = {

  height:
    64 + insets.bottom,

  paddingBottom:
    Math.max(
      insets.bottom,
      SPACING.sm
    ),

  paddingTop:
    SPACING.sm,

  backgroundColor:
    COLORS.surface,

  borderTopWidth: 1,

  borderTopColor:
    COLORS.border,
};

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor:
          COLORS.accent,

        tabBarInactiveTintColor:
          COLORS.iconInactive,

        tabBarStyle:
  commonTabBarStyle,

        tabBarLabelStyle: {

  fontSize:
    TYPOGRAPHY.small,

  fontWeight: "600",

  paddingBottom: 2,

  includeFontPadding:
    false,
},

        tabBarIcon: ({
          color,

          focused,
        }) => {

          const iconSize =
            focused
              ? 22
              : 20;

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
          HomeStackNavigator
        }
      />

      <Tab.Screen
        name="Explore"
        component={
          ExploreStackNavigator
        }
      />

      <Tab.Screen
        name="Leads"
        component={
          LeadsStackNavigator
        }
      />

      <Tab.Screen
        name="Chats"
        component={
          ChatsStackNavigator
        }

        options={({ route }) => {

          const routeName =
            getFocusedRouteNameFromRoute(
              route
            );

          const hideTabBar =
            routeName ===
            "Conversation";

          return {

            tabBarStyle:
  hideTabBar

    ? {
        display: "none",
      }

    : commonTabBarStyle,
          };
        }}
      />

      <Tab.Screen
        name="Profile"
        component={
          ProfileStackNavigator
        }
      />

    </Tab.Navigator>

  );
}