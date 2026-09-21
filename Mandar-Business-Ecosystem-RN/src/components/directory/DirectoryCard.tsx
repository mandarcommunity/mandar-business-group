import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import {
  BadgeCheck,
  Bookmark,
  Phone,
  Share2,
} from "lucide-react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";
import DirectoryActionButton from "./DirectoryActionButton";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface DirectoryCardProps {
  image?: string;

  personName: string;

  businessName: string;

  industry: string;

  location: string;

  description: string;

  verified?: boolean;

  saved?: boolean;

  onBookmark?: () => void;

  onShare?: () => void;

  onWhatsapp?: () => void;

  onCall?: () => void;
}

export default function DirectoryCard({
  image,
  personName,
  businessName,
  industry,
  location,
  description,
  verified,
  saved = false,
  onBookmark,
  onShare,
  onWhatsapp,
  onCall,
}: DirectoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.card}>

      {/* TOP */}
      <View style={styles.topRow}>

        {/* IMAGE */}
        <View style={styles.imageWrapper}>

          {image ? (

            <Image
              source={{ uri: image }}
              style={styles.image}
            />

          ) : (

            <View style={styles.noImage}>

              <Text style={styles.noImageText}>
                Logo
              </Text>

            </View>

          )}

        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* PERSON */}
          <View style={styles.personRow}>

            <Text
              numberOfLines={1}
              style={styles.personName}
            >
              {personName}
            </Text>

            {verified && (

              <BadgeCheck
                size={16}
                color="#2e8b57"
              />

            )}

          </View>

          {/* BUSINESS */}
          <Text
            numberOfLines={1}
            style={styles.businessName}
          >
            {businessName}
          </Text>

          {/* META */}
          <View>
            <Text
              numberOfLines={2}
              style={[styles.meta, { marginBottom: 2 }]}
            >
              {industry}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.meta}
            >
              {location}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View>
            <Text
              numberOfLines={isExpanded ? undefined : 2}
              style={styles.description}
            >
              {description}
            </Text>
            {description && description.length > 50 && (
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={{ color: COLORS.primary, marginTop: 2, fontSize: 13, fontFamily: TYPOGRAPHY.medium }}>
                  {isExpanded ? "Read less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

        </View>

      </View>

      {/* ACTIONS */}
      <View style={styles.actionsRow}>

        {/* BOOKMARK */}
        <DirectoryActionButton
          active={saved}
          onPress={onBookmark}
          icon={
            <Bookmark
              size={18}
              color={COLORS.accent}
              fill={
                saved
                  ? COLORS.accent
                  : "transparent"
              }
            />
          }
        />

        {/* SHARE */}
        <DirectoryActionButton
          onPress={onShare}
          icon={
            <Share2
              size={18}
              color={COLORS.textPrimary}
            />
          }
        />

        {/* WHATSAPP */}
        <DirectoryActionButton
          onPress={onWhatsapp}
          icon={
            <FontAwesome
              name="whatsapp"
              size={20}
              color="#25D366"
            />
          }
        />

        {/* CALL */}
        <DirectoryActionButton
          onPress={onCall}
          icon={
            <Phone
              size={18}
              color={COLORS.textPrimary}
            />
          }
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor:
      COLORS.surface,

    borderRadius: 28,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  imageWrapper: {
    width: 72,

    height: 72,

    borderRadius: 22,

    overflow: "hidden",

    backgroundColor:
      COLORS.surfaceSecondary,

    marginRight:
      SPACING.md,

    flexShrink: 0,
  },

  image: {
    width: "100%",

    height: "100%",
  },

  noImage: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor:
      "#f4ece0",
  },

  noImageText: {
    fontSize: TYPOGRAPHY.small,

    fontWeight: "700",

    color:
      COLORS.accent,

    includeFontPadding:
      false,
  },

  content: {
    flex: 1,

    minWidth: 0,
  },

  personRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  personName: {
    flex: 1,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  businessName: {
    marginTop: 4,

    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "600",

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  meta: {
    marginTop: 8,

    fontSize:
      TYPOGRAPHY.small,

    fontWeight: "700",

    color:
      COLORS.accent,

    includeFontPadding:
      false,
  },

  description: {
    marginTop:
      SPACING.sm,

    fontSize:
      TYPOGRAPHY.caption,

    lineHeight: 20,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  actionsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,

    marginTop:
      SPACING.lg,
  },
});