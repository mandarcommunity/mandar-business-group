import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import NotificationCard from "../components/notification/NotificationCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  dummyNotifications,
} from "../data/dummyNotifications";

import {
  COLORS,
  SPACING,
} from "../theme";

import { getNotifications, markAllAsRead, markAsRead } from "../services/notification.service";
import { getAccessToken } from "../utils/storage";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function NotificationsScreen() {

  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([]);

  const [
    isLoading,
    setIsLoading
  ] = useState(true);

  const [
    hasError,
    setHasError
  ] = useState(false);

  const [
    clearing,
    setClearing,
  ] = useState(false);

  const fetchNotifications = async () => {
    try {
      setHasError(false);
      const token = await getAccessToken();
      const res = await getNotifications(token as string);
      if (res.data) setNotifications(res.data);
    } catch (err) {
      console.error(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchNotifications();
    }
  }, [isFocused]);

  const handleMarkAllAsRead = async () => {
    try {
      setClearing(true);
      const token = await getAccessToken();
      await markAllAsRead(token as string);
      await fetchNotifications();
    } catch (err) {
      console.error(err);
    } finally {
      setClearing(false);
    }
  };

  const handleNotificationPress = async (id: string, isRead: boolean, relatedId?: string, type?: string) => {
    if (!isRead) {
      try {
        const token = await getAccessToken();
        await markAsRead(id, token as string);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      } catch (err) {
        console.error(err);
      }
    }

    if (type === 'chat' && relatedId) {
      navigation.navigate("ChatRoom", { chatId: relatedId });
    }
  };

  const unreadNotifications =
    useMemo(() => {
      return notifications.filter(
        (item) => !item.is_read
      );
    }, [notifications]);

  const readNotifications =
    useMemo(() => {
      return notifications.filter(
        (item) => item.is_read
      );
    }, [notifications]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading notifications..."
        />

      </SafeAreaView>

    );
  }

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Unable to load notifications"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  return (

    <SafeAreaView
      edges={["top"]}
      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View
          style={
            styles.headerLeft
          }
        >

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={() =>
              navigation.goBack()
            }

            style={
              styles.backButton
            }
          >

            <ArrowLeft
              size={20}
              color={COLORS.white}
            />

          </TouchableOpacity>

          <View>

            <Text
              style={
                styles.headerTitle
              }
            >

              Notifications

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Activity and platform updates.

            </Text>

          </View>

        </View>

      </View>

      {/* CONTENT */}
      <View
        style={
          styles.contentWrapper
        }
      >

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          contentContainerStyle={
            styles.content
          }
        >

          {/* ACTION BAR */}
          {!!notifications.length && (

            <View
              style={
                styles.actionRow
              }
            >

              <Text
                style={
                  styles.totalText
                }
              >

                {
                  notifications.length
                }
                {" "}
                notifications

              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={clearing}
                onPress={handleMarkAllAsRead}
              >

                <Text
                  style={[

                    styles.clearText,

                    clearing &&
                      styles.disabledClearText,

                  ]}
                >

                  {clearing
                    ? "Clearing..."
                    : "Clear All"}

                </Text>

              </TouchableOpacity>

            </View>

          )}

          {/* EMPTY */}
          {!notifications.length ? (

            <View
              style={
                styles.emptyWrapper
              }
            >

              <EmptyState
                title="No notifications"

                description="New updates, activities and alerts will appear here."
              />

            </View>

          ) : (

            <>

              {/* UNREAD */}
              {!!unreadNotifications.length && (

                <View
                  style={
                    styles.section
                  }
                >

                  <Text
                    style={
                      styles.sectionTitle
                    }
                  >

                    New

                  </Text>

                  <View
                    style={
                      styles.list
                    }
                  >

                    {unreadNotifications.map(
                      (item) => (

                        <NotificationCard
                          key={item.id}
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

                </View>

              )}

              {/* READ */}
              {!!readNotifications.length && (

                <View
                  style={
                    styles.section
                  }
                >

                  <Text
                    style={
                      styles.sectionTitle
                    }
                  >

                    Earlier

                  </Text>

                  <View
                    style={
                      styles.list
                    }
                  >

                    {readNotifications.map(
                      (item) => (

                        <NotificationCard
                          key={item.id}
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

                </View>

              )}

            </>

          )}

          {/* INFO */}
          {!!notifications.length && (

            <View
              style={
                styles.infoCard
              }
            >

              <Text
                style={
                  styles.infoText
                }
              >

                Notifications older than
                7 days are automatically
                removed from the platform.

              </Text>

            </View>

          )}

        </ScrollView>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.primary,
  },

  header: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,

    backgroundColor:
      COLORS.primary,
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 16,

    backgroundColor:
      "rgba(255,255,255,0.12)",

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  headerSubtitle: {
    marginTop: 4,

    fontSize: 12,

    fontWeight: "500",

    color:
      "rgba(255,255,255,0.75)",
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 26,

    borderTopRightRadius: 26,

    overflow: "hidden",
  },

  content: {
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,

    flexGrow: 1,
  },

  actionRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.xl,
  },

  totalText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  clearText: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  disabledClearText: {
    opacity: 0.5,
  },

  emptyWrapper: {
    flex: 1,

    justifyContent:
      "center",

    paddingTop:
      SPACING.xxxl,
  },

  section: {
    marginBottom:
      SPACING.xxxl,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,
  },

  list: {
    gap: SPACING.lg,
  },

  infoCard: {
    borderRadius: 24,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,
  },

  infoText: {
    fontSize: 12,

    lineHeight: 22,

    color:
      COLORS.textSecondary,

    textAlign: "center",
  },

});