import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Plus,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface QuickActionCardProps {
  onPress: () => void;
}

export default function QuickActionCard({
  onPress,
}: QuickActionCardProps) {

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >

      <View>

        <Text style={styles.title}>
          Post Requirement or Advertisement
        </Text>

        <Text style={styles.subtitle}>
          Reach businesses across the community
        </Text>

      </View>

      <View style={styles.iconWrapper}>

        <Plus
          size={20}
          color={COLORS.white}
        />

      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {

  backgroundColor:
    COLORS.primary,

  borderRadius:
    SPACING.xxxl,

  padding:
    SPACING.lg,

  flexDirection: "row",

  alignItems: "center",

  justifyContent:
    "space-between",

  marginBottom:
    SPACING.xl,

  gap:
    SPACING.md,
},

  title: {

  color:
    COLORS.white,

  fontSize:
    TYPOGRAPHY.body,

  fontWeight: "700",

  flexShrink: 1,

  includeFontPadding:
    false,
},

  subtitle: {

  marginTop:
    SPACING.xs,

  color:
    "rgba(255,255,255,0.7)",

  fontSize:
    TYPOGRAPHY.caption,

  flexShrink: 1,

  includeFontPadding:
    false,
},

  iconWrapper: {

  width:
    SPACING.xxxl + 14,

  height:
    SPACING.xxxl + 14,

  borderRadius:
    SPACING.lg,

  backgroundColor:
    "rgba(255,255,255,0.12)",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,
},
});