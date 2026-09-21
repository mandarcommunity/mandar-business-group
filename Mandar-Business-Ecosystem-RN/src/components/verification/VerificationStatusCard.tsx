import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ShieldCheck,
  Clock3,
  ShieldX,
  ShieldAlert,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface VerificationStatusCardProps {

  status:
    | "verified"
    | "pending"
    | "rejected"
    | "not_verified";
}

export default function VerificationStatusCard({

  status,

}: VerificationStatusCardProps) {

  const config = {

    verified: {

      title:
        "Business Verified",

      subtitle:
        "Your business identity has been successfully verified.",

      icon:
        ShieldCheck,

      accent:
        "#22C55E",
    },

    pending: {

      title:
        "Verification Under Review",

      subtitle:
        "Your submitted documents are currently being reviewed.",

      icon:
        Clock3,

      accent:
        "#F59E0B",
    },

    rejected: {

      title:
        "Verification Rejected",

      subtitle:
        "Your verification request was not approved. Please review and resubmit.",

      icon:
        ShieldX,

      accent:
        "#EF4444",
    },

    not_verified: {

      title:
        "Business Not Verified",

      subtitle:
        "Verify your business to build trust and unlock verified business status.",

      icon:
        ShieldAlert,

      accent:
        COLORS.accent,
    },

  };

  const current =
    config[status];

  const Icon =
    current.icon;

  return (

    <View
      style={[

        styles.card,

        {
          borderColor:
            current.accent,
        },

      ]}
    >

      {/* ICON */}
      <View
        style={[

          styles.iconWrapper,

          {
            backgroundColor:
              current.accent,
          },

        ]}
      >

        <Icon
          size={24}
          color={COLORS.white}
        />

      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        <Text
          style={styles.title}
        >

          {current.title}

        </Text>

        <Text
          style={styles.subtitle}
        >

          {current.subtitle}

        </Text>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 30,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1.5,

    padding:
      SPACING.xl,
  },

  iconWrapper: {
    width: 58,

    height: 58,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",
  },

  content: {
    marginTop:
      SPACING.lg,
  },

  title: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    lineHeight: 28,
  },

  subtitle: {
    marginTop:
      SPACING.sm,

    fontSize: 14,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

});