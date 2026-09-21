import {
  ReactNode,
} from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface ProfileSectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ProfileSectionCard({
  title,
  subtitle,
  children,
}: ProfileSectionCardProps) {

  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}

      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {children}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {

    backgroundColor:
      COLORS.surface,

    borderRadius:
      SPACING.xxxl,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,

    marginBottom:
      SPACING.lg,
  },

  header: {

    marginBottom:
      SPACING.lg,
  },

  title: {

    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  subtitle: {

    marginTop: 4,

    fontSize:
      TYPOGRAPHY.caption,

    lineHeight: 18,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  content: {

    gap:
      SPACING.md,
  },
});