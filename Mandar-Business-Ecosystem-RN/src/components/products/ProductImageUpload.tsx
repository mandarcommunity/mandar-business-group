import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, Plus, X } from "lucide-react-native";
import { COLORS, SPACING } from "../../theme";
import * as ImagePicker from "expo-image-picker";

export interface ProductImage {
  uri: string;
  base64?: string;
}

interface ProductImageUploadProps {
  images?: ProductImage[];
  onChange?: (images: ProductImage[]) => void;
}

export default function ProductImageUpload({
  images = [],
  onChange,
}: ProductImageUploadProps) {
  const pickImage = async () => {
    if (images.length >= 3) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (onChange) {
        onChange([
          ...images,
          {
            uri: result.assets[0].uri,
            base64: result.assets[0].base64 || undefined,
          },
        ]);
      }
    }
  };

  const removeImage = (index: number) => {
    if (onChange) {
      const newImages = [...images];
      newImages.splice(index, 1);
      onChange(newImages);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Images (Max 3)</Text>
      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img.uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <X size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 3 && (
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <View style={styles.iconContainer}>
              <Camera size={24} color={COLORS.primary} />
              <View style={styles.plusBadge}>
                <Plus size={12} color="#FFF" />
              </View>
            </View>
            <Text style={styles.uploadText}>Add Image</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  imageContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "relative",
    marginBottom: 8,
  },
  plusBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary,
  },
});
