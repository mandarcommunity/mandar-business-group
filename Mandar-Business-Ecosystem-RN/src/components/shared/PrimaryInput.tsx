import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PrimaryInputProps
  extends TextInputProps {}

export default function PrimaryInput({

  style,

  ...props

}: PrimaryInputProps) {

  return (
    <View style={styles.container}>

      <TextInput
        placeholderTextColor={
          COLORS.textMuted
        }

        style={[

          styles.input,

          style,

        ]}

        {...props}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 56,

    borderRadius: 18,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    backgroundColor:
      COLORS.inputBackground,

    paddingHorizontal:
      SPACING.lg,

    justifyContent: "center",
  },

  input: {
    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textPrimary,

    paddingVertical: 0,
  },
});