import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Search,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

export default function SearchBar() {
  const navigation = useNavigation<any>();

  return (

    <Pressable style={styles.container} onPress={() => navigation.navigate("BusinessDirectory")}>

      <Search
        size={18}
        color={COLORS.textMuted}
      />

      <Text style={styles.input}>Search businesses or products...</Text>

    </Pressable>
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

    color: COLORS.textMuted,

    paddingVertical: 0,

    includeFontPadding:
      false,
  },
});