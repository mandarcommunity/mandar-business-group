import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import {
  useState,
} from "react";

import {
  Bell,
} from "lucide-react-native";

import NotificationPreviewSheet from "./NotificationPreviewSheet";

import {
  dummyNotifications,
} from "../../data/dummyNotifications";

import {
  COLORS,
} from "../../theme";

import { getUnreadCount } from "../../services/notification.service";
import { getAccessToken } from "../../utils/storage";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function NotificationBell() {

  const [
    visible,
    setVisible,
  ] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;
        const res = await getUnreadCount(token as string);
        if (res.data) setUnreadCount(res.data.unreadCount);
      } catch (e) {
        console.log("Failed to fetch unread count", e);
      }
    };
    if (isFocused) {
      fetchCount();
      
      // Optional polling for unread count every 15 seconds
      const interval = setInterval(fetchCount, 15000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>

      {/* BELL BUTTON */}
      <Pressable
        onPress={() =>
          setVisible(!visible)
        }

        style={styles.button}
      >

        <Bell
          size={20}
          color={
            COLORS.white
          }
        />

        {/* BADGE */}
        {unreadCount > 0 && (

          <View style={styles.badge}>

            <View
              style={styles.badgeInner}
            />

          </View>

        )}

      </Pressable>

      {/* PREVIEW */}
      {visible && (

        <View style={styles.previewWrapper}>

          <NotificationPreviewSheet
            onClose={() =>
              setVisible(false)
            }
          />

        </View>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    position: "relative",
  },

  button: {
  width: 42,

  height: 42,

  borderRadius: 14,

  backgroundColor:
    "rgba(255,255,255,0.10)",

  alignItems: "center",

  justifyContent: "center",

  position: "relative",
},

  badge: {
    position: "absolute",

    top: 10,

    right: 10,

    width: 12,

    height: 12,

    borderRadius: 999,

    backgroundColor:
      COLORS.background,

    alignItems: "center",

    justifyContent: "center",
  },

  badgeInner: {
    width: 8,

    height: 8,

    borderRadius: 999,

    backgroundColor:
      "#ef4444",
  },

  previewWrapper: {
    position: "absolute",

    top: 52,

    right: 0,

    zIndex: 999,
  },
});