import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Sparkles,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY
} from "../../theme";

interface NewBusinessJoinedCardProps {
  businessName: string;
  industry: string;
  location: string;
  profileImage: string;
  joinedTime: string;
  onPress?: () => void;
}

export default function NewBusinessJoinedCard({
  businessName,
  industry,
  location,
  profileImage,
  joinedTime,
  onPress,
}: NewBusinessJoinedCardProps) {

  // Logic to get initials if image is missing
  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.announcementRow}>
        <Sparkles size={16} color={COLORS.accent} />
        <Text style={styles.announcementText}>New Business joined the community</Text>
      </View>

      <View style={styles.contentRow}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>
              {getInitials(businessName)}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.businessName}>{businessName || "Unknown Business"}</Text>
          <Text style={styles.detailsText}>
            {industry || "General"} • {location || "Unknown Location"}
          </Text>
          <Text style={styles.timeText}>{joinedTime}</Text>
        </View>

        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  announcementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: 6,
  },
  announcementText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "500",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  businessName: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: "bold",
    color: COLORS.text,
  },
  detailsText: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.iconInactive,
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.xl,
  },
  viewButtonText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
});
