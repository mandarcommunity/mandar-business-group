import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface ProductPreviewCardProps {

  image: string;

  name: string;

  onPress?: () => void;
}

export default function ProductPreviewCard({
  image,
  name,
  onPress,
}: ProductPreviewCardProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >

      {/* IMAGE */}
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      {/* PRODUCT NAME */}
      <View style={styles.content}>

        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {name}
        </Text>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    width: 120,

    borderRadius: 22,

    overflow: "hidden",

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    marginRight: SPACING.sm,
  },

  image: {
    width: "100%",

    height: 90,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  content: {
    padding:
      SPACING.md,
  },

  name: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textPrimary,

    lineHeight: 18,
  },
});