import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Inbox,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

type EmptyStateProps = {

  title: string;

  description?: string;
};

export default function EmptyState({

  title,

  description,

}: EmptyStateProps) {

  return (
    <View style={styles.container}>

      {/* ICON */}
      <View style={styles.iconWrapper}>

        <Inbox
          size={28}
          color={COLORS.accent}
        />

      </View>

      {/* TITLE */}
      <Text style={styles.title}>

        {title}

      </Text>

      {/* DESCRIPTION */}
      {description ? (

        <Text
          style={
            styles.description
          }
        >

          {description}

        </Text>

      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",

    justifyContent: "center",

    paddingVertical:
      SPACING.xxl,

    paddingHorizontal:
      SPACING.lg,
  },

  iconWrapper: {
    width: 72,

    height: 72,

    borderRadius: 999,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor:
      COLORS.surfaceSecondary,

    marginBottom:
      SPACING.lg,
  },

  title: {
    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    textAlign: "center",
  },

  description: {
    marginTop:
      SPACING.sm,

    fontSize:
      TYPOGRAPHY.caption,

    lineHeight: 22,

    color:
      COLORS.textSecondary,

    textAlign: "center",

    maxWidth: 280,
  },
});