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

interface ProfileStatCardProps {
  value: string;

  label: string;
}

export default function ProfileStatCard({
  value,
  label,
}: ProfileStatCardProps) {

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
      SPACING.xxxl,

    paddingVertical:
      SPACING.lg,

    paddingHorizontal:
      SPACING.md,

    alignItems: "center",

    justifyContent: "center",
  },

  value: {

    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

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

    textAlign: "center",

    includeFontPadding:
      false,
  },
});