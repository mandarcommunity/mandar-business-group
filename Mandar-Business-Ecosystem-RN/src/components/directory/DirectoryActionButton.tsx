import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  COLORS,
} from "../../theme";

interface DirectoryActionButtonProps {
  icon: React.ReactNode;

  onPress?: () => void;

  active?: boolean;
}

export default function DirectoryActionButton({
  icon,
  onPress,
  active = false,
}: DirectoryActionButtonProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,

        active &&
          styles.activeButton,
      ]}
    >

      {icon}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    width: 44,

    height: 44,

    borderRadius: 16,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",

    overflow: "hidden",
  },

  activeButton: {
    backgroundColor:
      "#f6ead7",

    borderColor:
      "#ead5b7",
  },
});