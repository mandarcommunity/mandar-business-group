import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PrimaryInputProps
  extends TextInputProps {

  placeholder: string;

  secureTextEntry?: boolean;
}

export default function PrimaryInput({

  placeholder,

  secureTextEntry,

  style,

  ...props

}: PrimaryInputProps) {

  return (

    <TextInput
      placeholder={placeholder}

      placeholderTextColor={
        COLORS.textMuted
      }

      secureTextEntry={
        secureTextEntry
      }

      underlineColorAndroid="transparent"

      selectionColor={
        COLORS.accent
      }

      autoCorrect={false}

      autoCapitalize={
        props.autoCapitalize
      }

      style={[

        styles.input,

        style,

      ]}

      {...props}
    />

  );
}

const styles = StyleSheet.create({

  input: {

  minHeight: 56,

  backgroundColor:
    COLORS.surface,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  borderRadius:
    SPACING.xl,

  paddingHorizontal:
    SPACING.lg,

  paddingVertical:
    SPACING.md,

  fontSize:
    TYPOGRAPHY.body,

  color:
    COLORS.textPrimary,

  marginBottom:
    SPACING.lg,

  textAlignVertical:
    "center",
},
});