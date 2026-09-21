import {
  ReactNode,
} from "react";

import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import NotificationBell from "../notification/NotificationBell";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface AppLayoutProps {

  title?: string;

  subtitle?: string;

  showHeader?: boolean;

  showBackButton?: boolean;

  showNotification?: boolean;

  children: ReactNode;
}

export default function AppLayout({

  title,

  subtitle,

  showHeader = true,

  showBackButton = false,

  showNotification = true,

  children,

}: AppLayoutProps) {

  const navigation =
  useNavigation<any>();

const insets =
  useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={["top"]}

      style={styles.safeArea}
    >

      <StatusBar
        backgroundColor={
          COLORS.primary
        }

        barStyle="light-content"
      />

      {/* HEADER */}
      {showHeader && (

        <View style={styles.header}>

          {/* LEFT */}
          <View style={styles.leftSection}>

            {showBackButton && (

              <TouchableOpacity
                onPress={() =>
                  navigation.goBack()
                }

                style={styles.backButton}
              >

                <ArrowLeft
                  size={20}
                  color={
                    COLORS.white
                  }
                />

              </TouchableOpacity>

            )}

            <View>

              <Text style={styles.headerTitle}>

                {title}

              </Text>

              {subtitle ? (

                <Text
                  style={
                    styles.headerSubtitle
                  }
                >

                  {subtitle}

                </Text>

              ) : null}

            </View>

          </View>

          {/* RIGHT */}
          {showNotification && (

            <View
              style={
                styles.notificationWrapper
              }
            >

              <NotificationBell />

            </View>

          )}

        </View>

      )}

      {/* BODY */}
      <View style={styles.body}>

        <View style={styles.content}>

          {children}

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,

    backgroundColor:
      COLORS.primary,
  },

  header: {
    backgroundColor:
      COLORS.primary,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    overflow: "visible",

    zIndex: 999,
  },

  leftSection: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  backButton: {
    width: SPACING.xxxl + 10,
height: SPACING.xxxl + 10,

    borderRadius: 14,

    backgroundColor:
      "rgba(255,255,255,0.10)",

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  headerTitle: {
    color: COLORS.white,

    fontSize:
  TYPOGRAPHY.heading,

    fontWeight: "700",
  },

  headerSubtitle: {
    marginTop: 2,

    color:
      "rgba(255,255,255,0.7)",

    fontSize:
      TYPOGRAPHY.caption,
  },

  notificationWrapper: {
    zIndex: 999,

    elevation: 999,
  },

  body: {
    flex: 1,

    backgroundColor:
      COLORS.primary,
  },

  content: {
  flex: 1,

  backgroundColor:
    COLORS.background,

  borderTopLeftRadius: 24,

  borderTopRightRadius: 24,

  paddingHorizontal:
    SPACING.lg,

  paddingBottom:
    SPACING.xl,

  overflow: "visible",
},
});