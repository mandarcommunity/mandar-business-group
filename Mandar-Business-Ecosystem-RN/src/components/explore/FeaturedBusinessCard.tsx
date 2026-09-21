import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ArrowUpRight,
  Briefcase,
  MapPin,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY
} from "../../theme";

interface FeaturedBusinessCardProps {
  image: string;
  businessName: string;
  industry: string;
  location: string;
  badgeText?: string;
  onPress?: () => void;
}

export default function FeaturedBusinessCard({
  image,
  businessName,
  industry,
  location,
  badgeText = "New",
  onPress,
}: FeaturedBusinessCardProps) {

  // Logic to get initials if image is missing
  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.content}>
        {/* AVATAR ROW */}
        <View style={styles.headerRow}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>
                {getInitials(businessName)}
              </Text>
            </View>
          )}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {businessName || "Unknown Business"}
          </Text>

          <View style={styles.metaRow}>
            <Briefcase size={14} color={COLORS.iconInactive} />
            <Text
              numberOfLines={1}
              style={styles.metaText}
            >
              {industry || "General"}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <MapPin size={14} color={COLORS.iconInactive} />
            <Text
              numberOfLines={1}
              style={styles.metaText}
            >
              {location || "Unknown Location"}
            </Text>
          </View>
        </View>

        {/* VIEW PROFILE BUTTON */}
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>View Profile</Text>
          <ArrowUpRight size={16} color={COLORS.accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 180,
    borderRadius: SPACING.lg,
    marginRight: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: COLORS.accent + "15",
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: SPACING.xs,
  },
  badgeText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
  infoContainer: {
    marginTop: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 6,
  },
  metaText: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  buttonText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
});
