import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  COLORS,
} from "../../theme";

interface AdvertisementActionButtonProps {
  text: string;

  icon: React.ReactNode;

  variant?:
    | "default"
    | "danger";

  onPress?: () => void;
}

export default function AdvertisementActionButton({
  text,
  icon,
  variant = "default",
  onPress,
}: AdvertisementActionButtonProps) {

  const isDanger =
    variant === "danger";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,

        isDanger &&
          styles.dangerButton,
      ]}
    >

      {icon}

      <Text
        style={[
          styles.text,

          isDanger &&
            styles.dangerText,
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

    backgroundColor:
      COLORS.surfaceSecondary,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,
  },

  dangerButton: {
    backgroundColor: "#fff1f1",
  },

  text: {
    fontSize: 12,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  dangerText: {
    color: "#d44848",
  },
});