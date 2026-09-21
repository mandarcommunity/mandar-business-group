import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Bell,
  BadgeCheck,
  Heart,
  MessageCircleMore,
  MessageSquareText,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface NotificationCardProps {

  type: string;

  userName: string;

  userAvatar: string;

  title: string;

  message: string;

  time: string;

  isRead: boolean;

  compact?: boolean;

  onPress?: () => void;
}

export default function NotificationCard({

  type,

  userName,

  userAvatar,

  title,

  message,

  time,

  isRead,

  compact = false,

  onPress,

}: NotificationCardProps) {

  function renderIcon() {

    switch (type) {

      case "like":

        return (
          <Heart
            size={compact ? 12 : 14}
            color="#ef4444"
            fill="#ef4444"
          />
        );

      case "comment":

        return (
          <MessageSquareText
            size={compact ? 12 : 14}
            color="#2563eb"
          />
        );

      case "reply":

        return (
          <MessageCircleMore
            size={compact ? 12 : 14}
            color="#7c3aed"
          />
        );

      case "verification":

        return (
          <BadgeCheck
            size={compact ? 12 : 14}
            color="#16a34a"
          />
        );

      default:

        return (
          <Bell
            size={compact ? 12 : 14}
            color={COLORS.accent}
          />
        );
    }
  }

  return (

    <Pressable
      onPress={onPress}

      style={[

        styles.container,

        compact &&
          styles.compactContainer,

      ]}
    >

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>

        {userAvatar ? (

          <Image
            source={{
              uri: userAvatar,
            }}

            style={[

              styles.avatar,

              compact &&
                styles.compactAvatar,

            ]}
          />

        ) : (

          <View
            style={[

              styles.systemAvatar,

              compact &&
                styles.compactAvatar,

            ]}
          >

            <Text
              style={[

                styles.systemAvatarText,

                compact &&
                  styles.compactSystemText,

              ]}
            >

              M

            </Text>

          </View>

        )}

        {/* TYPE ICON */}
        <View
          style={[

            styles.typeIcon,

            compact &&
              styles.compactTypeIcon,

          ]}
        >

          {renderIcon()}

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        <View style={styles.titleRow}>

          <Text
            numberOfLines={2}

            style={[

              styles.title,

              compact &&
                styles.compactTitle,

            ]}
          >

            <Text
              style={
                styles.userName
              }
            >

              {userName}{" "}

            </Text>

            {title}

          </Text>

          {!isRead && (

            <View
              style={[

                styles.unreadDot,

                compact &&
                  styles.compactUnreadDot,

              ]}
            />

          )}

        </View>

        <Text
          numberOfLines={
            compact ? 1 : 2
          }

          style={[

            styles.message,

            compact &&
              styles.compactMessage,

          ]}
        >

          {message}

        </Text>

        <Text
          style={[

            styles.time,

            compact &&
              styles.compactTime,

          ]}
        >

          {time}

        </Text>

      </View>

    </Pressable>

  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",

    alignItems: "flex-start",

    paddingVertical:
      SPACING.md,

    width: "100%",
  },

  compactContainer: {
    paddingVertical: 10,
  },

  avatarWrapper: {
    position: "relative",

    marginRight:
      SPACING.md,
  },

  avatar: {
    width: 52,

    height: 52,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  compactAvatar: {
    width: 42,

    height: 42,
  },

  systemAvatar: {
    width: 52,

    height: 52,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  systemAvatarText: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  compactSystemText: {
    fontSize: 15,
  },

  typeIcon: {
    position: "absolute",

    right: -2,

    bottom: -2,

    width: 22,

    height: 22,

    borderRadius: 999,

    backgroundColor:
      COLORS.surface,

    borderWidth: 2,

    borderColor:
      COLORS.background,

    alignItems: "center",

    justifyContent: "center",
  },

  compactTypeIcon: {
    width: 18,

    height: 18,
  },

  content: {
    flex: 1,

    minWidth: 0,

    paddingTop: 2,
  },

  titleRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  title: {
    flex: 1,

    fontSize: 14,

    lineHeight: 22,

    color:
      COLORS.textPrimary,
  },

  compactTitle: {
    fontSize: 13,

    lineHeight: 19,
  },

  userName: {
    fontWeight: "700",
  },

  unreadDot: {
    width: 9,

    height: 9,

    borderRadius: 999,

    backgroundColor:
      COLORS.accent,

    marginLeft:
      SPACING.sm,

    marginTop: 6,
  },

  compactUnreadDot: {
    width: 7,

    height: 7,
  },

  message: {
    marginTop: 4,

    fontSize: 13,

    lineHeight: 20,

    color:
      COLORS.textSecondary,
  },

  compactMessage: {
    fontSize: 12,

    lineHeight: 18,
  },

  time: {
    marginTop: 6,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textMuted,
  },

  compactTime: {
    marginTop: 4,

    fontSize: 11,
  },

});