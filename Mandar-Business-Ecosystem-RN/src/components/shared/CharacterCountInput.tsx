import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface CharacterCountInputProps
  extends TextInputProps {

  label: string;

  value: string;

  onChangeText:
    (text: string) => void;

  limit: number;

  multiline?: boolean;

  warningLimit?: number;
}

export default function CharacterCountInput({

  label,

  value,

  onChangeText,

  limit,

  multiline = false,

  warningLimit,

  style,

  ...props

}: CharacterCountInputProps) {

  const isWarning =
    warningLimit !==
      undefined &&
    value.length >=
      warningLimit;

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text
          numberOfLines={1}

          style={styles.label}
        >

          {label}

        </Text>

        <Text
          style={[

            styles.counter,

            isWarning &&
              styles.warningCounter,

          ]}
        >

          {value.length}/{limit}

        </Text>

      </View>

      {/* INPUT */}
      <TextInput
        value={value}

        onChangeText={(
          text
        ) => {

          if (
            text.length <=
            limit
          ) {

            onChangeText(
              text
            );
          }
        }}

        multiline={multiline}

        scrollEnabled={
          multiline
        }

        textAlignVertical={
          multiline
            ? "top"
            : "center"
        }

        placeholderTextColor={
          COLORS.textMuted
        }

        style={[

          multiline
            ? styles.textarea
            : styles.input,

          style,

        ]}

        {...props}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    gap: SPACING.sm,

    marginBottom:
      SPACING.sm,
  },

  label: {
    flex: 1,

    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  counter: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  warningCounter: {
    color: "#f59e0b",
  },

  input: {
    height: 54,

    borderRadius: 18,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    color:
      COLORS.textPrimary,

    fontSize:
      TYPOGRAPHY.body,
  },

  textarea: {
    minHeight: 180,

    borderRadius: 18,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.lg,

    color:
      COLORS.textPrimary,

    fontSize:
      TYPOGRAPHY.body,

    lineHeight: 22,
  },

});