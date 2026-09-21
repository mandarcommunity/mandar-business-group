import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ArrowUpRight,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY
} from "../../theme";

interface FeaturedAdCardProps {

  image: string;

  title: string;

  industry: string;

  location: string;

  description: string;

  onPress?: () => void;
}

export default function FeaturedAdCard({

  image,

  title,

  industry,

  location,

  description,

  onPress,

}: FeaturedAdCardProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.92}

      onPress={onPress}

      style={styles.card}
    >

      {/* IMAGE */}
      <Image
        source={{
          uri: image,
        }}

        resizeMode="cover"

        style={styles.image}
      />

      {/* DARK OVERLAY */}
      <View style={styles.overlay} />

      {/* CONTENT */}
      <View style={styles.content}>

        {/* TOP */}
        <View style={styles.topRow}>

          <View style={styles.highlightBadge}>

            <Text style={styles.highlightText}>
              Featured
            </Text>

          </View>

          <View style={styles.arrowButton}>

            <ArrowUpRight
              size={18}
              color={COLORS.white}
            />

          </View>

        </View>

        {/* BOTTOM CONTENT */}
        <View style={styles.bottomContent}>

          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          <Text
            numberOfLines={1}
            style={styles.meta}
          >
            {industry}
            {" • "}
            {location}
          </Text>

          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {description}
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {

  width: 320,

  height: 230,

  borderRadius:
    SPACING.xxxl,

  overflow: "hidden",

  marginRight:
    SPACING.md,

  backgroundColor:
    COLORS.surface,

  borderWidth: 1,

  borderColor:
    COLORS.border,
},

  image: {
    width: "100%",

    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFill,

    backgroundColor:
      "rgba(0, 0, 0, 0.4)",
  },

  gradient: {
    ...StyleSheet.absoluteFill,
  },

  content: {
    ...StyleSheet.absoluteFill,

    padding: SPACING.xl,

    gap: SPACING.md,

    justifyContent:
      "space-between",
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  highlightBadge: {

  minHeight: 32,

  paddingHorizontal:
    SPACING.md,

  borderRadius: 999,

  backgroundColor:
    "rgba(255,255,255,0.16)",

  borderWidth: 1,

  borderColor:
    "rgba(255,255,255,0.18)",

  alignItems: "center",

  justifyContent: "center",
},

  highlightText: {

  fontSize:
    TYPOGRAPHY.small,

  fontWeight: "700",

  color:
    COLORS.white,

  includeFontPadding:
    false,
},

  arrowButton: {

  width: 44,

  height: 44,

  borderRadius:
    SPACING.lg,

  backgroundColor:
    "rgba(255,255,255,0.16)",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,
},

  bottomContent: {

  borderRadius:
    SPACING.xxxl,

  backgroundColor:
    "rgba(0,0,0,0.34)",

  padding:
    SPACING.lg,
},

  title: {

  fontSize:
    TYPOGRAPHY.heading,

  fontWeight: "700",

  color:
    COLORS.white,

  includeFontPadding:
    false,
},

  meta: {

  marginTop:
    SPACING.sm,

  fontSize:
    TYPOGRAPHY.caption,

  fontWeight: "600",

  color:
    "rgba(255,255,255,0.82)",

  includeFontPadding:
    false,
},

  description: {

  marginTop:
    SPACING.md,

  fontSize:
    TYPOGRAPHY.body,

  lineHeight: 20,

  color:
    "rgba(255,255,255,0.92)",

  includeFontPadding:
    false,
},
});