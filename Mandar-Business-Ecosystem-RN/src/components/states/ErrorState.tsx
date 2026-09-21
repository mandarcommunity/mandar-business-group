import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  TriangleAlert,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

type ErrorStateProps = {

  title?: string;

  description?: string;

  buttonText?: string;

  onRetry?: () => void;
};

export default function ErrorState({

  title = "Something went wrong",

  description =
    "Please try again after some time.",

  buttonText = "Retry",

  onRetry,

}: ErrorStateProps) {

  return (
    <View style={styles.container}>

      {/* ICON */}
      <View style={styles.iconWrapper}>

        <TriangleAlert
          size={28}
          color="#f59e0b"
        />

      </View>

      {/* TITLE */}
      <Text style={styles.title}>

        {title}

      </Text>

      {/* DESCRIPTION */}
      <Text
        style={
          styles.description
        }
      >

        {description}

      </Text>

      {/* BUTTON */}
      {onRetry ? (

        <TouchableOpacity
          activeOpacity={0.85}

          onPress={onRetry}

          style={styles.button}
        >

          <Text
            style={
              styles.buttonText
            }
          >

            {buttonText}

          </Text>

        </TouchableOpacity>

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

  button: {
    marginTop:
      SPACING.xl,

    borderRadius: 14,

    backgroundColor:
      COLORS.primary,

    paddingHorizontal: 18,

    paddingVertical: 12,
  },

  buttonText: {
    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "700",

    color: COLORS.white,
  },
});