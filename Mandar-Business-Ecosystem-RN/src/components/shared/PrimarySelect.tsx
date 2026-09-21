import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronDown,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface PrimarySelectProps {

  placeholder: string;

  value?: string;

  onPress?: () => void;

  onChange?: (
    value: string
  ) => void;

  onChangeText?: (
    value: string
  ) => void;
}

export default function PrimarySelect({

  placeholder,

  value,

  onPress,

}: PrimarySelectProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}

      onPress={onPress}

      style={styles.container}
    >

      <Text
        style={[

          styles.text,

          !value &&
            styles.placeholder,

        ]}
      >

        {value || placeholder}

      </Text>

      <View
        style={
          styles.iconWrapper
        }
      >

        <ChevronDown
          size={18}
          color={
            COLORS.textSecondary
          }
        />

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {

  minHeight: 56,

  borderRadius:
    SPACING.xl,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  backgroundColor:
    COLORS.inputBackground,

  paddingHorizontal:
    SPACING.lg,

  paddingVertical:
    SPACING.md,

  flexDirection: "row",

  alignItems: "center",

  justifyContent:
    "space-between",
},

  text: {

  flex: 1,

  fontSize:
    TYPOGRAPHY.body,

  color:
    COLORS.textPrimary,

  includeFontPadding:
    false,
},

  placeholder: {
    color:
      COLORS.textMuted,
  },

  iconWrapper: {
    marginLeft:
      SPACING.md,
  },
});