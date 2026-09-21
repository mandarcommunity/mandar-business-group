import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PrimaryButtonProps {

  text: string;

  onPress?: () => void;

  disabled?: boolean;

  loading?: boolean;
}

export default function PrimaryButton({

  text,

  onPress,

  disabled = false,

  loading = false,

}: PrimaryButtonProps) {

  return (

    <TouchableOpacity
      activeOpacity={0.85}

      disabled={
        disabled || loading
      }

      onPress={onPress}

      style={[

        styles.button,

        (
          disabled ||
          loading
        ) &&
          styles.disabledButton,

      ]}
    >

      {loading ? (

        <ActivityIndicator
          color={COLORS.white}
        />

      ) : (

        <Text
          style={styles.text}
        >

          {text}

        </Text>

      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {

    minHeight: 54,

    backgroundColor:
      COLORS.primary,

    borderRadius:
      SPACING.lg,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.md,
  },

  disabledButton: {
    opacity: 0.6,
  },

  text: {
    color: COLORS.white,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    textAlign: "center",
  },
});