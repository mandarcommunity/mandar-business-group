import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BriefcaseBusiness,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface LeadTypeChipProps {

  label: string;

  active?: boolean;

  onPress?: () => void;
}

export default function LeadTypeChip({

  label,

  active = false,

  onPress,

}: LeadTypeChipProps) {

  return (

    <TouchableOpacity
      activeOpacity={0.85}

      onPress={onPress}

      style={[

        styles.chip,

        active &&
          styles.activeChip,

      ]}
    >

      {/* ICON */}
      <View
        style={[

          styles.iconWrapper,

          active &&
            styles.activeIconWrapper,

        ]}
      >

        <BriefcaseBusiness
          size={14}
          color={

            active
              ? COLORS.white
              : COLORS.accent

          }
        />

      </View>

      {/* LABEL */}
      <Text
        numberOfLines={1}

        style={[

          styles.label,

          active &&
            styles.activeLabel,

        ]}
      >

        {label}

      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  chip: {
    height: 46,

    paddingHorizontal:
      SPACING.lg,

    borderRadius: 999,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 10,

    position: "relative",
  },

  activeChip: {
    backgroundColor:
      COLORS.primary,

    borderColor:
      COLORS.primary,
  },

  iconWrapper: {
    width: 26,

    height: 26,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  activeIconWrapper: {
    backgroundColor:
      "rgba(255,255,255,0.16)",
  },

  label: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  activeLabel: {
    color:
      COLORS.white,
  },

});