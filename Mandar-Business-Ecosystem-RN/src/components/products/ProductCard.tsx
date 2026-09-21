import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import {
  Pencil,
  Share2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

import ProductActionButton from "./ProductActionButton";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({
  id,
  name,
  category,
  description,
  image,
  images,
  onShare,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const displayImage = images && images.length > 0 ? images[currentImageIndex] : image;

  const handleNextImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <View style={styles.card}>

      <View style={styles.row}>

        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: displayImage }}
            style={styles.image}
          />
          
          {images && images.length > 1 && (
            <>
              <TouchableOpacity style={[styles.arrowButton, styles.leftArrow]} onPress={handlePrevImage}>
                <ChevronLeft size={16} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.arrowButton, styles.rightArrow]} onPress={handleNextImage}>
                <ChevronRight size={16} color={COLORS.white} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* TOP */}
          <View>

            <Text
              numberOfLines={1}
              style={styles.name}
            >
              {name}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.category}
            >
              {category}
            </Text>

          </View>

          {/* DESCRIPTION */}
          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {description}
          </Text>

          {/* ACTIONS */}
          <View style={styles.actionsRow}>

            <ProductActionButton
              text="Share"
              onPress={onShare}
              icon={
                <Share2
                  size={14}
                  color={COLORS.textPrimary}
                />
              }
            />

            <ProductActionButton
              text="Edit"
              onPress={onEdit}
              icon={
                <Pencil
                  size={14}
                  color={COLORS.textPrimary}
                />
              }
            />

            <ProductActionButton
              text="Delete"
              variant="danger"
              onPress={onDelete}
              icon={
                <Trash2
                  size={14}
                  color="#d44848"
                />
              }
            />

          </View>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.surface,

    borderRadius: 28,

    borderWidth: 1,

    borderColor: COLORS.border,

    padding: SPACING.md,
  },

  row: {
    flexDirection: "row",
  },

  imageContainer: {
    position: 'relative',
    marginRight: SPACING.md,
    width: 88,
    height: 88,
  },

  image: {
    width: 88,

    height: 88,

    borderRadius: 22,

    backgroundColor: COLORS.surfaceSecondary,
  },

  arrowButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftArrow: {
    left: 4,
  },

  rightArrow: {
    right: 4,
  },

  content: {
    flex: 1,

    justifyContent: "space-between",
  },

  name: {
    fontSize: 15,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  category: {
    marginTop: 4,

    fontSize: 11,

    fontWeight: "700",

    color: COLORS.accent,
  },

  description: {
    marginTop: 10,

    fontSize: TYPOGRAPHY.caption,

    lineHeight: 18,

    color: COLORS.textSecondary,
  },

  actionsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 8,

    marginTop: SPACING.md,
  },
});