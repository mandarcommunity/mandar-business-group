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

interface FormSectionProps {

  title: string;

  subtitle: string;

  children: ReactNode;
}

export default function FormSection({

  title,
  subtitle,
  children,

}: FormSectionProps) {

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text
          numberOfLines={2}

          style={styles.title}
        >

          {title}

        </Text>

        <Text style={styles.subtitle}>

          {subtitle}

        </Text>

      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        {children}

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 24,

    padding:
      SPACING.lg,

    overflow: "hidden",
  },

  header: {
    marginBottom:
      SPACING.lg,
  },

  title: {
    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  subtitle: {
    marginTop:
      SPACING.xs,

    fontSize:
      TYPOGRAPHY.caption,

    lineHeight: 18,

    color:
      COLORS.textSecondary,
  },

  content: {
    gap: SPACING.lg,
  },

});