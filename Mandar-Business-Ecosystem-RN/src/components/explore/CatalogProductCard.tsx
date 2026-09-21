import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  MessageCircleMore,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { useState } from "react";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface CatalogProductCardProps {
  image?: string;
  images?: string[];
  name: string;

  description: string;

  onChatPress?: () => void;

  onSharePress?: () => void;
}

export default function CatalogProductCard({
  image,
  images,
  name,
  description,
  onChatPress,
  onSharePress,
}: CatalogProductCardProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
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

      {/* PRODUCT IMAGE */}
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

        {/* NAME */}
        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {name}
        </Text>

        {/* DESCRIPTION */}
        <View>
          <Text
            numberOfLines={isExpanded ? undefined : 3}
            style={styles.description}
          >
            {description}
          </Text>
          {description && description.length > 80 && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={{ color: COLORS.primary, marginTop: 2, fontSize: 13, fontFamily: TYPOGRAPHY.medium }}>
                {isExpanded ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsRow}>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onChatPress}
            style={styles.chatButton}
          >

            <MessageCircleMore
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.chatText}>
              Chat
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onSharePress}
            style={styles.shareButton}
          >

            <Share2
              size={18}
              color={
                COLORS.textPrimary
              }
            />

          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 28,

    overflow: "hidden",

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,
  },

  imageContainer: {
    position: 'relative',
    width: "100%",
    height: 220,
    backgroundColor: COLORS.surfaceSecondary,
  },

  image: {
    width: "100%",
    height: 220,
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
    left: 8,
  },

  rightArrow: {
    right: 8,
  },

  content: {
    padding: SPACING.lg,
  },

  name: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    lineHeight: 24,

    includeFontPadding:
      false,
  },

  description: {
    marginTop: SPACING.sm,

    fontSize: 13,

    lineHeight: 20,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  actionsRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: SPACING.xl,

    gap: SPACING.sm,
  },

  chatButton: {
    flex: 1,

    minHeight: 50,

    borderRadius: 18,

    backgroundColor:
      COLORS.accent,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    paddingHorizontal:
      SPACING.lg,
  },

  chatText: {
    fontSize: 14,

    fontWeight: "700",

    color: COLORS.white,

    includeFontPadding:
      false,
  },

  shareButton: {
    width: 50,

    height: 50,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },
});