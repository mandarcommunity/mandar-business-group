import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
  useMemo,
  useEffect
} from "react";

import { getAdvertisementById } from "../services/advertisement.service";
import { getAccessToken } from "../utils/storage";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  ArrowLeft,
  Share2,
} from "lucide-react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  dummyAdvertisements,
} from "../data/dummyAdvertisements";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
} from "../theme";

export default function AdvertisementDetailsScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const advertisementId =
    route.params?.advertisementId;

  const [advertisement, setAdvertisement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessToken();
        const res = await getAdvertisementById(token as string, advertisementId);
        
        if (res.data?.data) {
          const ad = res.data.data;
          
          setAdvertisement({
            id: ad.id,
            businessId: ad.business_id,
            ctaType: ad.cta_type,
            title: ad.title,
            industry: ad.industries?.join(", ") || "General",
            location: `${ad.city}, ${ad.state}`,
            image: ad.image_url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
            description: ad.description,
            postedTime: new Date(ad.created_at).toLocaleDateString(),
            businessName: ad.businesses?.business_name || "Unknown Business",
            ownerName: ad.businesses?.contact_person || ad.users?.full_name || "Unknown User",
            profileImage: ad.businesses?.profile_image || ad.users?.profile_image || "",
            likesCount: ad.likes?.[0]?.count || 0,
            commentsCount: ad.comments?.[0]?.count || 0,
            tags: ["Active"],
          });
        } else {
          setAdvertisement(null);
        }
      } catch (err) {
        console.log(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (advertisementId) {
      fetchAd();
    }
  }, [advertisementId]);

  const [shared, setShared] = useState(false);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading advertisement..."
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
          title="Unable to load advertisement"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (!advertisement) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <EmptyState
          title="Advertisement not found"

          description="This advertisement may have been removed or is no longer available."
        />

      </SafeAreaView>

    );
  }

  const ctaText =
    advertisement.ctaType ===
    "connect_now"
      ? "Connect Now"
      : "Visit Catalog";

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

          <View style={styles.headerInfo}>

            <Text
              style={
                styles.headerTitle
              }
            >

              Advertisement

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Business showcase and engagement.

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

          {/* CARD */}
          <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.cardHeader}>

              <View
                style={
                  styles.userRow
                }
              >

                {advertisement.profileImage ? (
                  <Image
                    source={{
                      uri: advertisement.profileImage,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={[styles.avatar, { backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                      {(() => {
                        const name = advertisement.businessName || "?";
                        const words = name.split(" ");
                        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
                        return (words[0][0] + words[1][0]).toUpperCase();
                      })()}
                    </Text>
                  </View>
                )}

                <View
                  style={
                    styles.userInfo
                  }
                >

                  <Text
                    numberOfLines={1}

                    style={
                      styles.businessName
                    }
                  >

                    {
                      advertisement.businessName
                    }

                  </Text>

                  <Text
                    numberOfLines={1}

                    style={
                      styles.meta
                    }
                  >

                    {
                      advertisement.ownerName
                    }

                    {" • "}

                    {
                      advertisement.postedTime
                    }

                  </Text>

                </View>

              </View>

              {/* TAGS */}
              {!!advertisement.tags
                ?.length && (

                <View
                  style={
                    styles.tagsRow
                  }
                >

                  {advertisement.tags
                    .slice(0, 2)
                    .map((tag) => (

                      <View
                        key={tag}

                        style={
                          styles.tag
                        }
                      >

                        <Text
                          style={
                            styles.tagText
                          }
                        >

                          {tag}

                        </Text>

                      </View>

                    ))}

                </View>

              )}

            </View>

            {/* IMAGE */}
            <Image
              source={{
                uri:
                  advertisement.image,
              }}

              resizeMode="cover"

              style={
                styles.image
              }
            />

            {/* BODY */}
            <View style={styles.body}>

              <Text
                style={
                  styles.title
                }
              >

                {
                  advertisement.title
                }

              </Text>

              <Text
                style={
                  styles.industry
                }
              >

                {
                  advertisement.industry
                }

                {" • "}

                {
                  advertisement.location
                }

              </Text>

              <Text
                style={
                  styles.description
                }
              >

                {
                  advertisement.fullDescription
                }

              </Text>

            </View>

            {/* ACTIONS */}
            <View
              style={
                styles.actionsRow
              }
            >

              {/* CTA */}
              <TouchableOpacity
                activeOpacity={0.9}

                onPress={() => {

                  if (
                    advertisement.ctaType ===
                    "visit_catalog"
                  ) {

                    navigation.navigate(
                      "BusinessCatalog",

                      {
                        businessId:
                          advertisement.businessId,
                      }
                    );

                    return;
                  }

                  navigation.navigate(
                    "Chats"
                  );

                }}

                style={
                  styles.primaryButton
                }
              >

                <Text
                  style={
                    styles.primaryButtonText
                  }
                >

                  {ctaText}

                </Text>

              </TouchableOpacity>



              {/* SHARE */}
              <TouchableOpacity
                activeOpacity={0.9}

                onPress={() =>
                  setShared(!shared)
                }

                style={[

                  styles.iconButton,

                  shared &&
                    styles.activeButton,

                ]}
              >

                <Share2
                  size={18}

                  color={
                    shared
                      ? COLORS.accent
                      : COLORS.textPrimary
                  }
                />

              </TouchableOpacity>

            </View>

          </View>



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

  headerInfo: {
    flex: 1,
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
  },

  card: {
    borderRadius: 32,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    overflow: "hidden",
  },

  cardHeader: {
    padding:
      SPACING.lg,
  },

  userRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  avatar: {
    width: 56,

    height: 56,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  userInfo: {
    flex: 1,

    minWidth: 0,

    marginLeft:
      SPACING.md,
  },

  businessName: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  meta: {
    marginTop: 4,

    fontSize: 12,

    color:
      COLORS.textSecondary,
  },

  tagsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,

    marginTop:
      SPACING.md,
  },

  tag: {
    height: 28,

    paddingHorizontal:
      SPACING.md,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  tagText: {
    fontSize: 11,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  image: {
    width: "100%",

    height: 320,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  body: {
    padding:
      SPACING.xl,
  },

  title: {
    fontSize: 24,

    lineHeight: 32,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  industry: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.accent,
  },

  description: {
    marginTop:
      SPACING.lg,

    fontSize: 15,

    lineHeight: 28,

    color:
      COLORS.textSecondary,
  },

  actionsRow: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.xl,

    paddingBottom:
      SPACING.xl,

    gap: SPACING.sm,
  },

  primaryButton: {
    flex: 1,

    height: 56,

    borderRadius: 20,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  iconButton: {
    minWidth: 56,

    height: 56,

    borderRadius: 20,

    paddingHorizontal:
      SPACING.md,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,
  },

  iconText: {
    fontSize: 12,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  activeButton: {
    borderColor:
      COLORS.accent,
  },

  commentsSection: {
    marginTop:
      SPACING.xxxl,
  },

  commentsHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.xl,
  },

  commentsTitle: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  viewAllText: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  commentsList: {
    gap: SPACING.xl,
  },

});