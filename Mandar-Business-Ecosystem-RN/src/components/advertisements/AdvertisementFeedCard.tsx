import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EngagementBar from "./EngagementBar";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface AdvertisementFeedCardProps {

  businessName: string;

  ownerName: string;

  profileImage: string;

  title: string;

  description: string;

  image: string;

  industry: string;

  location: string;

  postedTime: string;

  tags?: string[];

  shared?: boolean;
  ctaType: "connect_now" | "visit_catalog";
  onPrimaryPress?: () => void;
  onSharePress?: () => void;
  onSeeMorePress?: () => void;
}

export default function AdvertisementFeedCard({
  businessName,
  ownerName,
  profileImage,
  title,
  description,
  image,
  industry,
  location,
  postedTime,
  tags = [],
  shared = false,
  ctaType,
  onPrimaryPress,
  onSharePress,
  onSeeMorePress,
}: AdvertisementFeedCardProps) {

  const ctaText =
    ctaType ===
    "connect_now"
      ? "Connect Now"
      : "Visit Catalog";

  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, { backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                {getInitials(businessName)}
              </Text>
            </View>
          )}

          <View style={styles.userInfo}>

            <Text
              numberOfLines={1}
              style={styles.businessName}
            >

              {businessName}

            </Text>

            <Text
              numberOfLines={1}
              style={styles.meta}
            >

              {ownerName}
              {" • "}
              {postedTime}

            </Text>

          </View>

        </View>

        {/* TAGS */}
        {tags.length > 0 && (

          <View style={styles.tagsRow}>

            {tags
              .slice(0, 2)
              .map((tag) => (

                <View
                  key={tag}
                  style={styles.tag}
                >

                  <Text
                    style={styles.tagText}
                  >

                    {tag}

                  </Text>

                </View>
              ))}

          </View>

        )}

      </View>

      {/* IMAGE */}
      <Image
        source={{
          uri: image,
        }}

        resizeMode="cover"

        style={styles.image}
      />

      {/* CONTENT */}
      <View style={styles.content}>

        <Text style={styles.title}>

          {title}

        </Text>

        <Text style={styles.industry}>

          {industry}
          {" • "}
          {location}

        </Text>

        <Text
          numberOfLines={4}
          style={styles.description}
        >

          {description}

        </Text>

        {/* SEE MORE */}
        <TouchableOpacity
          activeOpacity={0.85}

          onPress={onSeeMorePress}

          style={styles.seeMoreButton}
        >

          <Text style={styles.seeMore}>

            See More

          </Text>

        </TouchableOpacity>

      </View>

      {/* CTA */}
      <View style={styles.primaryActionRow}>

        <TouchableOpacity
          activeOpacity={0.9}

          onPress={onPrimaryPress}

          style={styles.primaryButton}
        >

          <Text
            style={
              styles.primaryButtonText
            }
          >

            {ctaText}

          </Text>

        </TouchableOpacity>

      </View>

      {/* ENGAGEMENT */}
      <View
        style={styles.engagementWrapper}
      >

        <EngagementBar
          shared={shared}
          onSharePress={onSharePress}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 32,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    overflow: "hidden",
  },

  header: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.lg,

    paddingBottom:
      SPACING.md,
  },

  userRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  avatar: {
    width: 52,

    height: 52,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  userInfo: {
    flex: 1,

    marginLeft:
      SPACING.md,

    minWidth: 0,
  },

  businessName: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  meta: {
    marginTop: 4,

    fontSize: 12,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  tagsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,

    marginTop:
      SPACING.md,
  },

  tag: {
    minHeight: 28,

    paddingHorizontal:
      SPACING.md,

    paddingVertical:
      SPACING.xs,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  tagText: {
    fontSize: 11,

    fontWeight: "700",

    color: COLORS.accent,

    includeFontPadding:
      false,
  },

  image: {
    width: "100%",

    height: 300,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  content: {
    padding: SPACING.lg,
  },

  title: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    lineHeight: 28,

    includeFontPadding:
      false,
  },

  industry: {
    marginTop: SPACING.sm,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.accent,

    includeFontPadding:
      false,
  },

  description: {
    marginTop: SPACING.md,

    fontSize: 14,

    lineHeight: 24,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  seeMoreButton: {
    alignSelf: "flex-start",

    marginTop: SPACING.md,
  },

  seeMore: {
    fontSize: 13,

    fontWeight: "700",

    color: COLORS.accent,

    includeFontPadding:
      false,
  },

  primaryActionRow: {
    paddingHorizontal:
      SPACING.lg,
  },

  primaryButton: {
    width: "100%",

    minHeight: 54,

    borderRadius: 18,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal:
      SPACING.lg,
  },

  primaryButtonText: {
    fontSize: 14,

    fontWeight: "700",

    color: COLORS.white,

    includeFontPadding:
      false,
  },

  engagementWrapper: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,
  },
});