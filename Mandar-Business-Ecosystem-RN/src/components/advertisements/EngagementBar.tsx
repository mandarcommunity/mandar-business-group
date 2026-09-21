import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Share2,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface EngagementBarProps {
  shared?: boolean;
  onSharePress?: () => void;
}

export default function EngagementBar({
  shared = false,
  onSharePress,
}: EngagementBarProps) {

  return (
    <View style={styles.container}>



      {/* SHARE */}
      <TouchableOpacity
        activeOpacity={0.85}

        onPress={onSharePress}

        style={[

          styles.actionButton,

          shared &&
            styles.activeButton,

        ]}
      >

        <Share2
          size={18}

          color={
            shared
              ? COLORS.accent
              : COLORS.textPrimary
          }
        />

        <Text
          style={[
            styles.actionText,

            shared &&
              styles.sharedText,

          ]}
        >

          Share

        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.sm,
  },

  actionButton: {
    height: 42,

    paddingHorizontal:
      SPACING.md,

    borderRadius: 14,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      "transparent",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,
  },

  activeButton: {
    borderColor:
      COLORS.border,
  },

  actionText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  likedText: {
    color: "#ef4444",
  },

  sharedText: {
    color: COLORS.accent,
  },
});