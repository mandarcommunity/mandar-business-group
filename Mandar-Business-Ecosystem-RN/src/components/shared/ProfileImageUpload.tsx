import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Camera,
  X,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY
} from "../../theme";

interface ProfileImageUploadProps {
  imageUri?: string;
  onPress?: () => void;
  onRemove?: () => void;
}

export default function ProfileImageUpload({
  imageUri,
  onPress,
  onRemove,
}: ProfileImageUploadProps) {

  return (
    <View style={styles.container}>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.uploadBox}
      >

        {imageUri ? (
          <>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
            />
            {onRemove && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={onRemove}
              >
                <X size={16} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </>
        ) : (

          <>
            <View style={styles.iconWrapper}>

              <Camera
                size={22}
                color={COLORS.textPrimary}
              />

            </View>

            <Text style={styles.title}>
              Upload Profile Image
            </Text>

            <Text style={styles.subtitle}>
              Add business logo or your profile image
            </Text>
          </>
        )}

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
  },

  uploadBox: {

  width: 142,

  height: 142,

  borderRadius:
    SPACING.xxxl,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  backgroundColor:
    COLORS.surfaceSecondary,

  alignItems: "center",

  justifyContent: "center",

  overflow: "hidden",

  paddingHorizontal:
    SPACING.sm,

  paddingVertical:
    SPACING.md,
},

  image: {
    width: "100%",

    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },

  iconWrapper: {

  width:
    SPACING.xxxl + 12,

  height:
    SPACING.xxxl + 12,

  borderRadius:
    SPACING.lg,

  backgroundColor:
    COLORS.surface,

  alignItems: "center",

  justifyContent: "center",

  marginBottom:
    SPACING.sm,
},

  title: {

  fontSize:
    TYPOGRAPHY.caption,

  fontWeight: "700",

  color:
    COLORS.textPrimary,

  textAlign: "center",

  includeFontPadding:
    false,
},

  subtitle: {

  marginTop:
    SPACING.xs,

  fontSize:
    TYPOGRAPHY.small,

  lineHeight:
    TYPOGRAPHY.small * 1.6,

  color:
    COLORS.textSecondary,

  textAlign: "center",

  includeFontPadding:
    false,
},
});