import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
  useEffect,
  useCallback
} from "react";

import { getAllAdvertisements } from "../services/advertisement.service";
import { getAllBusinesses } from "../services/business.service";
import { getAccessToken } from "../utils/storage";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import AdvertisementFeedCard from "../components/advertisements/AdvertisementFeedCard";
import NewBusinessJoinedCard from "../components/advertisements/NewBusinessJoinedCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

// Removed dummyAdvertisements

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

export default function AdvertisementFeedScreen() {

  const navigation =
    useNavigation<any>();

  const [
    refreshing,

    setRefreshing,

  ] = useState(false);

  const [
    isLoading,
    setIsLoading
  ] = useState(false);

  const [
    hasError,
    setHasError
  ] = useState(false);

  const [
    advertisements,
    setAdvertisements,
  ] = useState<any[]>([]);

  const fetchFeed = async () => {
    try {
      if (!refreshing) setIsLoading(true);
      const token = await getAccessToken();
      
      const [adsRes, bizRes] = await Promise.all([
        getAllAdvertisements(token as string),
        getAllBusinesses(token as string)
      ]);
      
      const formattedAds = (adsRes.data?.data || []).map((ad: any) => ({
        type: "advertisement",
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
        tags: ["Active"], // Mocked tags since they aren't generated dynamically yet
        createdAt: new Date(ad.created_at).getTime()
      }));

      const formattedBiz = (bizRes.data || []).map((biz: any) => ({
        type: "business",
        id: biz.id || biz.user_id, // unique key
        businessId: biz.id || biz.user_id,
        businessName: biz.business_name || "Unknown Business",
        industry: biz.industries?.join(", ") || "General",
        location: biz.city && biz.state ? `${biz.city}, ${biz.state}` : biz.city || biz.state || "Unknown",
        profileImage: biz.profile_image || "",
        joinedTime: new Date(biz.created_at).toLocaleDateString(),
        createdAt: new Date(biz.created_at).getTime()
      }));

      const combined = [...formattedAds, ...formattedBiz].sort((a, b) => b.createdAt - a.createdAt);

      setAdvertisements(combined);
      setHasError(false);
    } catch (err) {
      console.log(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [])
  );

  function handleRefresh() {
    setRefreshing(true);
    fetchFeed();
  }

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading feed..."
        />

      </SafeAreaView>

    );
  }

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <ErrorState
          title="Unable to load feed"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (!advertisements.length) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <EmptyState
          title="No business posts found"

          description="Business advertisements and opportunities will appear here."
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

        <View style={styles.headerRow}>

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={() =>
              navigation.goBack()
            }

            style={styles.backButton}
          >

            <ArrowLeft
              size={20}
              color={COLORS.white}
            />

          </TouchableOpacity>

          <View style={styles.headerTextContainer}>

            <Text style={styles.headerTitle}>

              Business Feed

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Discover businesses, products and opportunities.

            </Text>

          </View>

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>

        <FlatList
          data={advertisements}

          keyExtractor={(item) =>
            item.id
          }

          refreshControl={

            <RefreshControl
              refreshing={
                refreshing
              }

              onRefresh={
                handleRefresh
              }
            />
          }

          showsVerticalScrollIndicator={
            false
          }

          contentContainerStyle={
            styles.content
          }

          ItemSeparatorComponent={() => (
            <View
              style={
                styles.separator
              }
            />
          )}

          renderItem={({ item }) => {
            if (item.type === "business") {
              return (
                <NewBusinessJoinedCard
                  businessName={item.businessName}
                  industry={item.industry}
                  location={item.location}
                  profileImage={item.profileImage}
                  joinedTime={item.joinedTime}
                  onPress={() =>
                    navigation.navigate("BusinessProfile", {
                      businessId: item.businessId,
                    })
                  }
                />
              );
            }

            return (
              <AdvertisementFeedCard
                businessName={item.businessName}
                ownerName={item.ownerName}
                profileImage={item.profileImage}
                title={item.title}
                description={item.description}
                image={item.image}
                industry={item.industry}
                location={item.location}
                postedTime={item.postedTime}
                tags={item.tags}
                ctaType={item.ctaType}
                onPrimaryPress={() => {
                  if (item.ctaType === "visit_catalog") {
                    navigation.navigate("BusinessCatalog", {
                      businessId: item.businessId,
                    });
                    return;
                  }
                  navigation.navigate("Chats");
                }}
                onSeeMorePress={() =>
                  navigation.navigate("AdvertisementDetails", {
                    advertisementId: item.id,
                  })
                }
                onSharePress={() =>
                  navigation.navigate("AdvertisementDetails", {
                    advertisementId: item.id,
                  })
                }
              />
            );
          }}
        />

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

  headerRow: {
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

    flexShrink: 0,
  },

  headerTextContainer: {
    flex: 1,

    minWidth: 0,
  },

  headerTitle: {
    color: COLORS.white,

    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    includeFontPadding:
      false,
  },

  headerSubtitle: {
    marginTop: 2,

    color:
      "rgba(255,255,255,0.7)",

    fontSize:
      TYPOGRAPHY.caption,

    includeFontPadding:
      false,
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    overflow: "hidden",
  },

  content: {
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,
  },

  separator: {
    height: SPACING.lg,
  },
});