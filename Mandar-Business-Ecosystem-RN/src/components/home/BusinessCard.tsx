import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface BusinessCardProps {
  businessName: string;

  location: string;

  description: string;
}

export default function BusinessCard({
  businessName,
  location,
  description,
}: BusinessCardProps) {
  return (
    <TouchableOpacity style={styles.container}>

      <View style={styles.topRow}>

        <Text style={styles.name}>
          {businessName}
        </Text>

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            Verified
          </Text>

        </View>

      </View>

      <Text style={styles.location}>
        {location}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: 18,

    padding: SPACING.lg,

    marginBottom: SPACING.lg,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  name: {
    fontSize: TYPOGRAPHY.body,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  badge: {
    backgroundColor: "#dcfce7",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,
  },

  badgeText: {
    color: COLORS.success,

    fontSize: TYPOGRAPHY.small,

    fontWeight: "700",
  },

  location: {
    marginTop: 4,

    color: COLORS.textMuted,

    fontSize: TYPOGRAPHY.caption,
  },

  description: {
    marginTop: SPACING.md,

    color: COLORS.textSecondary,

    fontSize: TYPOGRAPHY.body,

    lineHeight: 20,
  },
});