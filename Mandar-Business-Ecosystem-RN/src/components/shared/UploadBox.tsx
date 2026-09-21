import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import {
  ImagePlus,
  X,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface UploadBoxProps {
  title: string;
  imageUri?: string;
  onPress?: () => void;
  onRemove?: () => void;
}

export default function UploadBox({
  title,
  imageUri,
  onPress,
  onRemove,
}: UploadBoxProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
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
              <X size={20} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <View style={styles.iconWrapper}>
            <ImagePlus
              size={24}
              color={COLORS.accent}
            />
          </View>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>
            JPG, PNG or WEBP supported
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {

  height: 180,

  borderWidth: 1.5,

  borderStyle: "dashed",

  borderColor:
    COLORS.border,

  borderRadius:
    SPACING.xxxl,

  backgroundColor:
    COLORS.background,

  alignItems: "center",

  justifyContent: "center",

  paddingHorizontal:
    SPACING.lg,

  paddingVertical:
    SPACING.xxl,
},

  iconWrapper: {

  width:
    SPACING.xxxl + 26,

  height:
    SPACING.xxxl + 26,

  borderRadius:
    SPACING.xl,

  backgroundColor:
    COLORS.surface,

  alignItems: "center",

  justifyContent: "center",
},

  title: {

  marginTop:
    SPACING.lg,

  fontSize:
    TYPOGRAPHY.body,

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
    TYPOGRAPHY.caption,
  color:
    COLORS.textSecondary,
  textAlign: "center",
  includeFontPadding:
    false,
},
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: SPACING.xxl,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  }
});