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

  loading?: boolean;

  disabled?: boolean;
}

export default function PrimaryButton({

  text,

  onPress,

  loading,

  disabled,

}: PrimaryButtonProps) {

  const isDisabled =
    loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.9}

      disabled={isDisabled}

      onPress={onPress}

      style={[

        styles.button,

        isDisabled &&
          styles.disabledButton,

      ]}
    >

      {loading ? (

        <ActivityIndicator
          color={COLORS.white}
        />

      ) : (

        <Text style={styles.text}>
          {text}
        </Text>

      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    height: 56,

    borderRadius: 20,

    backgroundColor:
      COLORS.primary,

    alignItems: "center",

    justifyContent: "center",
  },

  disabledButton: {
    backgroundColor:
      COLORS.border,
  },

  text: {
    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color: COLORS.white,
  },
});