import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  BadgeCheck,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

const BENEFITS = [

  {
    icon: BadgeCheck,

    title:
      "Verified Badge",

    subtitle:
      "Build stronger trust with businesses across the platform.",
  },

  {
    icon: TrendingUp,

    title:
      "Better Visibility",

    subtitle:
      "Verified businesses receive stronger profile credibility.",
  },

  {
    icon: Shield,

    title:
      "Business Authenticity",

    subtitle:
      "Show businesses that your profile is genuine and trusted.",
  },

  {
    icon: Users,

    title:
      "Professional Network",

    subtitle:
      "Increase confidence while connecting with new businesses.",
  },

];

export default function VerificationBenefits() {

  return (

    <View style={styles.container}>

      {BENEFITS.map(
        (item) => {

          const Icon =
            item.icon;

          return (

            <View
              key={item.title}

              style={styles.card}
            >

              {/* ICON */}
              <View
                style={
                  styles.iconWrapper
                }
              >

                <Icon
                  size={20}
                  color={
                    COLORS.accent
                  }
                />

              </View>

              {/* CONTENT */}
              <View
                style={
                  styles.content
                }
              >

                <Text
                  style={
                    styles.title
                  }
                >

                  {item.title}

                </Text>

                <Text
                  style={
                    styles.subtitle
                  }
                >

                  {item.subtitle}

                </Text>

              </View>

            </View>

          );
        }
      )}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    gap:
      SPACING.lg,
  },

  card: {
    flexDirection: "row",

    alignItems: "flex-start",

    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  iconWrapper: {
    width: 50,

    height: 50,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  content: {
    flex: 1,

    marginLeft:
      SPACING.lg,

    minWidth: 0,
  },

  title: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    lineHeight: 22,
  },

  subtitle: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

});