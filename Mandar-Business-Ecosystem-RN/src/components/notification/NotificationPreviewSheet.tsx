import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import NotificationCard from "./NotificationCard";

import {
  dummyNotifications,
} from "../../data/dummyNotifications";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface NotificationPreviewSheetProps {

  onClose?: () => void;
}

import { useState, useEffect } from "react";
import { getNotifications, markAsRead } from "../../services/notification.service";
import { getAccessToken } from "../../utils/storage";

export default function NotificationPreviewSheet({
  onClose,
}: NotificationPreviewSheetProps) {
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await getAccessToken();
        const res = await getNotifications(token as string);
        if (res.data) {
          setNotifications(res.data);
          setUnreadCount(res.data.filter((n: any) => !n.is_read).length);
        }
      } catch (err) {
        console.error("Error fetching preview notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  const previewNotifications = notifications.slice(0, 3);

  const handleNotificationPress = async (id: string, isRead: boolean, relatedId?: string, type?: string) => {
    if (!isRead) {
      try {
        const token = await getAccessToken();
        await markAsRead(id, token as string);
      } catch (e) {
        console.error(e);
      }
    }
    onClose?.();
    if (type === 'chat' && relatedId) {
      navigation.navigate("ChatRoom", { chatId: relatedId });
    } else {
      navigation.navigate("Notifications");
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>
          Notifications
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount}
          </Text>
        </View>
      </View>

      {/* LIST */}
      <View style={styles.list}>

        {previewNotifications.map(
          (item) => (
            <NotificationCard
              key={item.id}
              compact
              type={item.type || 'system'}
              userName={item.title}
              userAvatar={undefined}
              title={item.title}
              message={item.body}
              time={item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}
              isRead={item.is_read}
              onPress={() => handleNotificationPress(item.id, item.is_read, item.related_id, item.type)}
            />
          )
        )}

      </View>

      {/* SEE MORE */}
      <Pressable
        onPress={() => {

          onClose?.();

          navigation.navigate(
            "Notifications"
          );
        }}

        style={styles.footer}
      >

        <Text style={styles.footerText}>

          See All Notifications →

        </Text>

      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    width: 340,

    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.lg,
  },

  heading: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  badge: {
    minWidth: 24,

    height: 24,

    borderRadius: 999,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 8,
  },

  badgeText: {
    fontSize: 11,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  list: {
    gap: SPACING.sm,
  },

  footer: {
    marginTop:
      SPACING.lg,

    paddingTop:
      SPACING.lg,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.border,

    alignItems: "center",
  },

  footerText: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.accent,
  },
});