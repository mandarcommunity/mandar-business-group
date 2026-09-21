import {
  ReactNode,
} from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface ProfileRowProps {
  icon: ReactNode;

  title: string;

  subtitle: string;

  onPress?: () => void;
}

export default function ProfileRow({
  icon,
  title,
  subtitle,
  onPress,
}: ProfileRowProps) {

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >

      {/* LEFT */}
      <View style={styles.leftSection}>

        <View style={styles.iconWrapper}>
          {icon}
        </View>

        <View style={styles.content}>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        </View>

      </View>

      {/* RIGHT */}
      <ChevronRight
        size={18}
        color={COLORS.textMuted}
      />

    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {

  backgroundColor:
    COLORS.surface,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  borderRadius:
    SPACING.xxxl,

  padding:
    SPACING.lg,

  flexDirection: "row",

  alignItems: "center",

  justifyContent:
    "space-between",

  gap:
    SPACING.md,
},

  leftSection: {

  flexDirection: "row",

  alignItems: "center",

  flex: 1,

  minWidth: 0,
},

  iconWrapper: {

  width: 46,

  height: 46,

  borderRadius:
    SPACING.lg,

  backgroundColor:
    COLORS.background,

  alignItems: "center",

  justifyContent: "center",

  marginRight:
    SPACING.md,

  flexShrink: 0,
},

  content: {

  flex: 1,

  minWidth: 0,
},

  title: {

  fontSize:
    TYPOGRAPHY.body,

  fontWeight: "700",

  color:
    COLORS.textPrimary,

  includeFontPadding:
    false,
},

  subtitle: {

  marginTop: 2,

  fontSize:
    TYPOGRAPHY.caption,

  color:
    COLORS.textSecondary,

  lineHeight: 18,

  includeFontPadding:
    false,
},
});