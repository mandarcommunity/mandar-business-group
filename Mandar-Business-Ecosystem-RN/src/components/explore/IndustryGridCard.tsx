import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface IndustryGridCardProps {

  icon: string;

  title: string;

  seeMore?: boolean;

  onPress?: () => void;
}

export default function IndustryGridCard({
  icon,
  title,
  seeMore = false,
  onPress,
}: IndustryGridCardProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >

      {/* ICON */}
      <View style={styles.iconWrapper}>

        {seeMore ? (

          <ChevronRight
            size={26}
            color={COLORS.accent}
          />

        ) : (

          <Text style={styles.icon}>
            {icon}
          </Text>

        )}

      </View>

      {/* TITLE */}
      <Text
        numberOfLines={1}
        style={styles.title}
      >
        {title}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {

  flex: 1,

  minHeight: 120,

  borderRadius:
    SPACING.xxxl,

  backgroundColor:
    COLORS.surface,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  padding:
    SPACING.lg,

  justifyContent:
    "space-between",
},

  iconWrapper: {

  width: 58,

  height: 58,

  borderRadius:
    SPACING.xl,

  backgroundColor:
    COLORS.surfaceSecondary,

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,
},

  icon: {

  fontSize: 28,

  includeFontPadding:
    false,
},

  title: {

  marginTop:
    SPACING.lg,

  fontSize: 14,

  fontWeight: "700",

  color:
    COLORS.textPrimary,

  includeFontPadding:
    false,
},
});