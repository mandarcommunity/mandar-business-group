import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Check,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react-native";

import RequirementActionButton from "./RequirementActionButton";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface RequirementCardProps {
  image?: string;

  title: string;

  industry: string;

  description: string;

  postedTime: string;

  expiryText: string;

  status:
    | "Active"
    | "Fulfilled"
    | "Expired";

  onShare?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;

  onFulfilled?: () => void;
}

export default function RequirementCard({
  image,
  title,
  industry,
  description,
  postedTime,
  expiryText,
  status,
  onShare,
  onEdit,
  onDelete,
  onFulfilled,
}: RequirementCardProps) {

  const isActive =
    status === "Active";

  const isFulfilled =
    status === "Fulfilled";

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
                No Image
              </Text>

            </View>

          )}

        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* INDUSTRY + STATUS */}
          <View style={styles.metaRow}>

            <View style={styles.leftMeta}>

              <Text
                numberOfLines={1}
                style={styles.industry}
              >
                {industry}
              </Text>

              <Text style={styles.dot}>
                •
              </Text>

              <Text style={styles.postedTime}>
                {postedTime}
              </Text>

            </View>

            <View
              style={[
                styles.statusBadge,

                isActive &&
                  styles.activeBadge,

                isFulfilled &&
                  styles.fulfilledBadge,
              ]}
            >

              <Text
                style={[
                  styles.statusText,

                  isActive &&
                    styles.activeText,

                  isFulfilled &&
                    styles.fulfilledText,
                ]}
              >
                {status}
              </Text>

            </View>

          </View>

          {/* TITLE */}
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          {/* DESCRIPTION */}
          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {description}
          </Text>

          {/* EXPIRY */}
          <Text style={styles.expiryText}>
            {expiryText}
          </Text>

        </View>

      </View>

      {/* ACTIONS */}
      <View style={styles.actionsRow}>

        <RequirementActionButton
          text="Share"
          onPress={onShare}
          icon={
            <Share2
              size={14}
              color={COLORS.textPrimary}
            />
          }
        />

        {isActive && (

          <RequirementActionButton
            text="Edit"
            onPress={onEdit}
            icon={
              <Pencil
                size={14}
                color={COLORS.textPrimary}
              />
            }
          />

        )}

        <RequirementActionButton
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

        {isActive && (

          <RequirementActionButton
            text="Mark Fulfilled"
            variant="success"
            onPress={onFulfilled}
            icon={
              <Check
                size={14}
                color="#2e8b57"
              />
            }
          />

        )}

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

  topRow: {
    flexDirection: "row",
  },

  imageWrapper: {
    width: 88,

    height: 88,

    borderRadius: 22,

    overflow: "hidden",

    backgroundColor: COLORS.surfaceSecondary,

    marginRight: SPACING.md,
  },

  image: {
    width: "100%",

    height: "100%",
  },

  noImage: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 8,

    backgroundColor: "#f4ece0",
  },

  noImageText: {
    fontSize: 11,

    fontWeight: "700",

    color: COLORS.accent,

    textAlign: "center",
  },

  content: {
    flex: 1,
  },

  metaRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  leftMeta: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,

    marginRight: SPACING.sm,
  },

  industry: {
    fontSize: 11,

    fontWeight: "700",

    color: COLORS.accent,
  },

  dot: {
    marginHorizontal: 6,

    fontSize: 11,

    color: COLORS.textMuted,
  },

  postedTime: {
    fontSize: 11,

    color: COLORS.textMuted,
  },

  statusBadge: {
    height: 28,

    paddingHorizontal: 12,

    borderRadius: 999,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#f3f4f6",
  },

  activeBadge: {
    backgroundColor: "#eef7ee",
  },

  fulfilledBadge: {
    backgroundColor: "#f3f4f6",
  },

  statusText: {
    fontSize: 11,

    fontWeight: "700",

    color: COLORS.textSecondary,
  },

  activeText: {
    color: "#2e8b57",
  },

  fulfilledText: {
    color: COLORS.textSecondary,
  },

  title: {
    marginTop: 8,

    fontSize: 15,

    fontWeight: "700",

    lineHeight: 20,

    color: COLORS.textPrimary,
  },

  description: {
    marginTop: 8,

    fontSize: TYPOGRAPHY.caption,

    lineHeight: 18,

    color: COLORS.textSecondary,
  },

  expiryText: {
    marginTop: 10,

    fontSize: 11,

    color: COLORS.textMuted,
  },

  actionsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 8,

    marginTop: SPACING.md,
  },
});