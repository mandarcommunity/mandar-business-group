import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PrimaryTextareaProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export default function PrimaryTextarea({
  value,
  placeholder,
  onChangeText,
}: PrimaryTextareaProps) {

  return (
    <View style={styles.container}>

      <TextInput
        multiline
        textAlignVertical="top"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.textMuted}
        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    minHeight: 140,

    borderRadius:   SPACING.xxl,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.inputBackground,

    paddingHorizontal: SPACING.lg,

    paddingVertical: SPACING.lg,
  },

  input: {

  minHeight: 100,

  fontSize:
    TYPOGRAPHY.body,

  lineHeight:
    TYPOGRAPHY.body * 1.6,

  color:
    COLORS.textPrimary,

  padding: 0,

  includeFontPadding:
    false,
},
});