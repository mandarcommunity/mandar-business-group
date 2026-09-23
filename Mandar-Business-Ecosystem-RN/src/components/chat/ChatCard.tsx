import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Pin,
  CheckCheck,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface ChatCardProps {

  personName: string;
  profileImage?: string | null;

  businessName: string;

  lastMessage: string;

  time: string;

  unreadCount?: number;

  pinned?: boolean;

  loading?: boolean;

  onPress?: () => void;
}

export default function ChatCard({

  personName,
  profileImage,

  businessName,

  lastMessage,

  time,

  unreadCount = 0,

  pinned = false,

  loading = false,

  onPress,

}: ChatCardProps) {

  return (

    <Pressable
      onPress={onPress}

      style={({ pressed }) => [

        styles.container,

        pressed &&
          styles.pressedCard,

      ]}
    >

      {/* AVATAR */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{personName.charAt(0)}</Text>
        </View>
      )}

      {/* CONTENT */}
      <View style={styles.content}>

        {/* TOP */}
        <View style={styles.topRow}>

          {/* LEFT */}
          <View style={styles.nameSection}>

            <View style={styles.nameRow}>

              <Text
                numberOfLines={1}

                style={styles.personName}
              >

                {personName}

              </Text>

              {pinned && (

                <Pin
                  size={12}
                  color={COLORS.accent}
                  fill={COLORS.accent}
                />

              )}

            </View>

            <Text
              numberOfLines={1}

              style={styles.businessName}
            >

              {businessName}

            </Text>

          </View>

          {/* RIGHT */}
          <View style={styles.rightSection}>

            <Text
              numberOfLines={1}

              style={styles.time}
            >

              {loading
                ? "Opening..."
                : time}

            </Text>

            {unreadCount > 0 ? (

              <View style={styles.unreadBadge}>

                <Text style={styles.unreadText}>

                  {unreadCount}

                </Text>

              </View>

            ) : (

              <CheckCheck
                size={15}
                color="#bdbdbd"
              />

            )}

          </View>

        </View>

        {/* MESSAGE */}
        <Text
          numberOfLines={1}

          style={styles.lastMessage}
        >

          {lastMessage?.startsWith('[IMAGE]') ? '?? Photo' : lastMessage}

        </Text>

      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {
  flexDirection: "row",

  alignItems: "flex-start",

  paddingVertical: SPACING.lg,

  borderBottomWidth: 1,

  borderBottomColor: COLORS.border,
},

  pressedCard: {
    opacity: 0.92,
  },

  avatar: {
    width: 54,

    height: 54,

    borderRadius: 999,

    backgroundColor:
      "#e6efe9",

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  avatarText: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.primary,
  },

  content: {
    flex: 1,

    minWidth: 0,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  nameSection: {
    flex: 1,

    minWidth: 0,

    paddingRight:
      SPACING.sm,
  },

  nameRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,
  },

  personName: {
    flexShrink: 1,

    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  businessName: {
    marginTop: 3,

    fontSize:
      TYPOGRAPHY.caption,

    color:
      COLORS.accent,

    fontWeight: "600",
  },

  rightSection: {
    alignItems: "flex-end",

    marginLeft:
      SPACING.sm,
  },

  time: {
    fontSize: 10,

    fontWeight: "600",

    color:
      COLORS.textMuted,
  },

  unreadBadge: {
    minWidth: 20,

    height: 20,

    borderRadius: 999,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 6,

    marginTop: 6,
  },

  unreadText: {
    color:
      COLORS.white,

    fontSize: 10,

    fontWeight: "700",
  },

  lastMessage: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    lineHeight: 20,

    color:
      COLORS.textSecondary,
  },

});