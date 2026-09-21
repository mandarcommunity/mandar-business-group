import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import {
  Search,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

export default function SearchBar() {

  return (

    <View style={styles.container}>

      <Search
        size={18}
        color={COLORS.textMuted}
      />

      <TextInput
        placeholder="Search businesses or products..."
        placeholderTextColor={
          COLORS.textMuted
        }

        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    minHeight: 52,

    backgroundColor:
      COLORS.surface,

    borderRadius:
      SPACING.lg,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.sm,

    marginBottom:
      SPACING.xl,
  },

  input: {

    flex: 1,

    marginLeft:
      SPACING.md,

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textPrimary,

    paddingVertical: 0,

    includeFontPadding:
      false,
  },
});