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

interface AuthHeaderProps {

  title: string;

  subtitle?: string;
}

export default function AuthHeader({

  title,

  subtitle,

}: AuthHeaderProps) {

  return (

    <View style={styles.container}>

      <Text
        numberOfLines={2}
        style={styles.title}
      >

        {title}

      </Text>

      {subtitle ? (

        <Text
          style={styles.subtitle}
        >

          {subtitle}

        </Text>

      ) : null}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom:
      SPACING.xxxl,
  },

  title: {
    fontSize: 28,

    lineHeight: 36,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  subtitle: {
    marginTop:
      SPACING.sm,

    fontSize:
      TYPOGRAPHY.body,

    lineHeight: 24,

    color:
      COLORS.textSecondary,

    maxWidth: "92%",
  },

});