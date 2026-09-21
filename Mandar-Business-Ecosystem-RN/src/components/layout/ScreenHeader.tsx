import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface ScreenHeaderProps {
  title: string;

  subtitle?: string;
}

export default function ScreenHeader({
  title,
  subtitle,
}: ScreenHeaderProps) {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >

        <ArrowLeft
          size={20}
          color={COLORS.textPrimary}
        />

      </Pressable>

      <View style={styles.content}>

        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        ) : null}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginBottom: SPACING.xl,
  },

  backButton: {

  width:
    SPACING.xxxl + 12,

  height:
    SPACING.xxxl + 12,

  borderRadius:
    SPACING.lg,

    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    alignItems: "center",

    justifyContent: "center",

    marginRight: SPACING.md,
  },

  content: {
    flex: 1,

    paddingTop: 2,
  },

  title: {

  fontSize:
    TYPOGRAPHY.title,

  fontWeight: "700",

  color:
    COLORS.textPrimary,

  includeFontPadding:
    false,
},

  subtitle: {

  marginTop:
    SPACING.xs,

  fontSize:
    TYPOGRAPHY.caption,

  color:
    COLORS.textSecondary,

  lineHeight:
    TYPOGRAPHY.caption * 1.5,

  includeFontPadding:
    false,
},
});