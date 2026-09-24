import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";

import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Search,
  SlidersHorizontal,
  X,
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import ChatCard from "../components/chat/ChatCard";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";
import { getMyChats } from "../services/chat.service";
import { getAccessToken } from "../utils/storage";

const filters = [
  "All",
  "Unread",
  "Archived",
];

export default function ChatsScreen() {
  const navigation = useNavigation<any>();

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* SEARCH */
  const [search, setSearch] = useState("");

  /* FILTER */
  const [selectedFilter, setSelectedFilter] = useState("All");

  /* STATES */
  const [filterOpened, setFilterOpened] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [openingChatId, setOpeningChatId] = useState<string | null>(null);

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAccessToken();
      if (!token) throw new Error("Authentication required");
      
      const res = await getMyChats(token);
      
      // Transform data for UI
      const chatsList = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        console.log("CHATS API RESPONSE:", JSON.stringify(res.data));
        console.log("PARSED CHATS LIST:", JSON.stringify(chatsList));
      const formattedChats = chatsList.map((chat: any) => ({
        id: chat.id,
        personName: chat.personName || "User",
        businessName: chat.businessName || "Business",
        lastMessage: chat.lastMessage || "Tap to view messages",
          profileImage: chat.profileImage || null,
        time: new Date(chat.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unreadCount: chat.unreadCount || 0,
        archived: false,
        pinned: false,
        otherUserId: chat.otherUserId || chat.user2_id
      }));
      setChats(formattedChats);
    } catch (err: any) {
      console.log("Error fetching chats", err);
      // Let it fail silently if table doesn't exist yet, just show empty
      setChats([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [])
  );

  /* FILTERED CHATS */
  const filteredChats =
    useMemo(() => {

      let filtered =
        chats;

      /* SEARCH */
      if (
        search.trim()
      ) {

        filtered =
          filtered.filter(
            (chat) =>

              chat.personName
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||

              chat.businessName
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );
      }

      /* FILTERS */
      if (
        selectedFilter ===
        "Unread"
      ) {

        filtered =
          filtered.filter(
            (chat) =>
              chat.unreadCount >
              0
          );
      }

      if (
        selectedFilter ===
        "Archived"
      ) {

        filtered =
          filtered.filter(
            (chat) =>
              chat.archived
          );
      }

      return filtered;

    }, [chats, search, selectedFilter]);

  /* LOADING */
  if (loading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading chats..."
        />

      </SafeAreaView>

    );
  }

  /* ERROR */
  if (error) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Unable to load chats"

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

              Chats

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Business Conversations

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

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={
            styles.contentContainer
          }
        >

          {/* SEARCH + FILTER */}
          <View style={styles.searchRow}>

            {/* SEARCH */}
            <View
              style={[

                styles.searchBox,

                searchFocused &&
                  styles.activeSearchBox,

              ]}
            >

              <Search
                size={18}
                color={
                  COLORS.textMuted
                }
              />

              <TextInput
                value={search}

                onChangeText={
                  setSearch
                }

                onFocus={() =>
                  setSearchFocused(
                    true
                  )
                }

                onBlur={() =>
                  setSearchFocused(
                    false
                  )
                }

                placeholder="Search chats..."

                placeholderTextColor={
                  COLORS.textMuted
                }

                style={
                  styles.searchInput
                }
              />

              {/* CLEAR */}
              {search.length >
                0 && (

                <TouchableOpacity
                  activeOpacity={0.8}

                  onPress={() =>
                    setSearch("")
                  }
                >

                  <X
                    size={16}
                    color={
                      COLORS.textMuted
                    }
                  />

                </TouchableOpacity>

              )}

            </View>

            {/* FILTER */}
            <TouchableOpacity
              activeOpacity={0.85}

              onPress={() =>
                setFilterOpened(
                  !filterOpened
                )
              }

              style={[

                styles.filterButton,

                filterOpened &&
                  styles.activeFilterButton,

              ]}
            >

              <SlidersHorizontal
                size={18}
                color={
                  filterOpened
                    ? COLORS.white
                    : COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          {/* FILTER TABS */}
          <ScrollView
            horizontal

            showsHorizontalScrollIndicator={
              false
            }

            contentContainerStyle={
              styles.filterTabs
            }
          >

            {filters.map(
              (filter) => {

                const isActive =
                  selectedFilter ===
                  filter;

                return (

                  <TouchableOpacity
                    key={filter}

                    activeOpacity={0.85}

                    onPress={() =>
                      setSelectedFilter(
                        filter
                      )
                    }

                    style={[

                      styles.filterTab,

                      isActive &&
                        styles.activeFilterTab,

                    ]}
                  >

                    <Text
                      style={[

                        styles.filterText,

                        isActive &&
                          styles.activeFilterText,

                      ]}
                    >

                      {filter}

                    </Text>

                  </TouchableOpacity>

                );
              }
            )}

          </ScrollView>

          {/* RESULTS */}
          <View
            style={
              styles.resultsRow
            }
          >

            <Text
              style={
                styles.resultsText
              }
            >

              {
                filteredChats.length
              }
              {" "}
              chats found

            </Text>

          </View>

          {/* EMPTY */}
          {!filteredChats.length ? (

            <View
              style={
                styles.emptyWrapper
              }
            >

              <EmptyState
                title="No chats found"

                description="Try another search or filter."
              />

            </View>

          ) : (

            /* CHAT LIST */
            <View
              style={
                styles.chatList
              }
            >

              {filteredChats.map(
                (chat) => (

                  <ChatCard
                    key={chat.id}

                    personName={
                      chat.personName
                    }

                    businessName={chat.businessName}
                      profileImage={chat.profileImage}

                    lastMessage={
                      chat.lastMessage
                    }

                    time={chat.time}

                    unreadCount={
                      chat.unreadCount
                    }

                    pinned={
                      chat.pinned
                    }

                    loading={
                      openingChatId ===
                      chat.id
                    }

                    onPress={() => {

                      setOpeningChatId(
                        chat.id
                      );

                      setTimeout(() => {

                        setOpeningChatId(
                          null
                        );

                        navigation.navigate(
                          "Conversation",

                          {
                            chatId:
                              chat.id,

                            otherUserId: chat.otherUserId,

                            otherUserName:
                              chat.personName,

                            businessName:
                              chat.businessName,
                          }
                        );

                      }, 250);

                    }}
                  />

                )
              )}

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

    color: COLORS.white,
  },

  headerSubtitle: {
    marginTop: 2,

    fontSize: 12,

    fontWeight: "500",

    color:
      "rgba(255,255,255,0.72)",
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 26,

    borderTopRightRadius: 26,

    overflow: "hidden",
  },

  contentContainer: {
    padding: SPACING.lg,

    paddingBottom:
      SPACING.xxxl,
  },

  searchRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.sm,
  },

  searchBox: {
    flex: 1,

    height: 56,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 20,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.lg,
  },

  activeSearchBox: {
    borderColor:
      COLORS.primary,
  },

  searchInput: {
    flex: 1,

    marginLeft:
      SPACING.sm,

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textPrimary,
  },

  filterButton: {
    width: 56,

    height: 56,

    borderRadius: 20,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },

  activeFilterButton: {
    backgroundColor:
      COLORS.primary,

    borderColor:
      COLORS.primary,
  },

  filterTabs: {
    gap: SPACING.sm,

    paddingTop:
      SPACING.lg,

    paddingBottom:
      SPACING.md,
  },

  filterTab: {
    height: 40,

    paddingHorizontal:
      SPACING.lg,

    borderRadius: 999,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },

  activeFilterTab: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  filterText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  activeFilterText: {
    color:
      COLORS.white,
  },

  resultsRow: {
    marginTop:
      SPACING.sm,

    marginBottom:
      SPACING.lg,
  },

  resultsText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  chatList: {
    gap: SPACING.md,
  },

  emptyWrapper: {
    marginTop:
      SPACING.xxxl,
  },

});