import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  FileText,
  Upload,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface DocumentUploadCardProps {

  title: string;

  subtitle: string;

  uploaded?: boolean;

  onUploadPress?: () => void;
}

export default function DocumentUploadCard({

  title,

  subtitle,

  uploaded = false,

  onUploadPress,

}: DocumentUploadCardProps) {

  return (

    <View style={styles.card}>

      {/* TOP */}
      <View style={styles.leftSection}>

        <View style={styles.iconWrapper}>

          <FileText
            size={20}
            color={COLORS.accent}
          />

        </View>

        <View style={styles.content}>

          <Text
            style={styles.title}
          >

            {title}

          </Text>

          <Text
            style={styles.subtitle}
          >

            {subtitle}

          </Text>

        </View>

      </View>

      {/* ACTION */}
      <TouchableOpacity
        activeOpacity={0.9}

        onPress={onUploadPress}

        style={[

          styles.uploadButton,

          uploaded &&
            styles.uploadedButton,

        ]}
      >

        <Upload
          size={16}
          color={
            uploaded
              ? COLORS.white
              : COLORS.textPrimary
          }
        />

        <Text
          style={[

            styles.uploadText,

            uploaded &&
              styles.uploadedText,

          ]}
        >

          {uploaded
            ? "Uploaded"
            : "Upload"}

        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,

    marginBottom:
      SPACING.lg,
  },

  leftSection: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  iconWrapper: {
    width: 52,

    height: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  content: {
    flex: 1,

    marginLeft:
      SPACING.lg,

    minWidth: 0,
  },

  title: {
    fontSize: 15,

    fontWeight: "700",

    lineHeight: 22,

    color:
      COLORS.textPrimary,
  },

  subtitle: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  uploadButton: {
    marginTop:
      SPACING.xl,

    minHeight: 48,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal:
      SPACING.lg,

    gap: 8,
  },

  uploadedButton: {
    backgroundColor:
      COLORS.accent,
  },

  uploadText: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  uploadedText: {
    color:
      COLORS.white,
  },

});