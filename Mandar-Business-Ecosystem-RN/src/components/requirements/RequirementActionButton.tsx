import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface RequirementActionButtonProps {
  text: string;

  icon: React.ReactNode;

  variant?:
    | "default"
    | "danger"
    | "success";

  onPress?: () => void;
}

export default function RequirementActionButton({
  text,
  icon,
  variant = "default",
  onPress,
}: RequirementActionButtonProps) {

  const isDanger =
    variant === "danger";

  const isSuccess =
    variant === "success";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,

        isDanger &&
          styles.dangerButton,

        isSuccess &&
          styles.successButton,
      ]}
    >

      {icon}

      <Text
        style={[
          styles.text,

          isDanger &&
            styles.dangerText,

          isSuccess &&
            styles.successText,
        ]}
      >
        {text}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    height: 38,

    paddingHorizontal: 14,

    borderRadius: 14,

    backgroundColor: COLORS.surfaceSecondary,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,
  },

  dangerButton: {
    backgroundColor: "#fff1f1",
  },

  successButton: {
    backgroundColor: "#eef7ee",
  },

  text: {
    fontSize: 12,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  dangerText: {
    color: "#d44848",
  },

  successText: {
    color: "#2e8b57",
  },
});