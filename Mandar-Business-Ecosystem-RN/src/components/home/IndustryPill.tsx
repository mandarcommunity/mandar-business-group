import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  TYPOGRAPHY,
} from "../../theme";

interface IndustryPillProps {
  label: string;
}

export default function IndustryPill({
  label,
}: IndustryPillProps) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    minHeight: 44,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 14,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 12,

    paddingVertical: 8,
  },

  label: {

    color:
      COLORS.textPrimary,

    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "600",

    textAlign: "center",

    includeFontPadding:
      false,
  },
});