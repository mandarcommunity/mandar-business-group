import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface StatsCardProps {
  value: string;

  label: string;
}

export default function StatsCard({
  value,
  label,
}: StatsCardProps) {
  return (
    <View style={styles.container}>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius:
      SPACING.xl,

    padding:
      SPACING.lg,

    justifyContent:
      "center",
  },

  value: {

    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.primary,

    includeFontPadding:
      false,
  },

  label: {

    marginTop:
      SPACING.xs,

    fontSize:
      TYPOGRAPHY.caption,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },
});