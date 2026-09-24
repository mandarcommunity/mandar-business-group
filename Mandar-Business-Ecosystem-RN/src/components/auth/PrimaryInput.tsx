import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

interface PrimaryInputProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function PrimaryInput({
  placeholder,
  secureTextEntry,
  style,
  ...props
}: PrimaryInputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry={isSecure}
        underlineColorAndroid="transparent"
        selectionColor={COLORS.accent}
        autoCorrect={false}
        autoCapitalize={props.autoCapitalize}
        style={[styles.input, secureTextEntry && { paddingRight: 50 }]}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsSecure(!isSecure)}
          activeOpacity={0.7}
        >
          {isSecure ? (
            <EyeOff color={COLORS.textMuted} size={20} />
          ) : (
            <Eye color={COLORS.textMuted} size={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
    position: "relative",
    justifyContent: "center",
  },
  input: {
    minHeight: 56,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    textAlignVertical: "center",
    
  },
  eyeIcon: {
    position: "absolute",
    right: SPACING.lg,
    height: "100%",
    justifyContent: "center",
  },
});
