import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PhoneInputFieldProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export default function PhoneInputField({
  value,
  placeholder = "Enter mobile number",
  onChangeText,
}: PhoneInputFieldProps) {

  return (
    <View style={styles.container}>

      {/* COUNTRY CODE */}
      <Text style={styles.code}>
        +91
      </Text>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* INPUT */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        keyboardType="phone-pad"
        maxLength={10}
        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 56,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.inputBackground,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: SPACING.lg,
  },

  code: {
    fontSize: TYPOGRAPHY.body,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  divider: {
    width: 1,

    height: 22,

    backgroundColor: COLORS.border,

    marginHorizontal: SPACING.md,
  },

  input: {
    flex: 1,

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textPrimary,
  },
});