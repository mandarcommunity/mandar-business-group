import { useIndustries } from "../hooks/useIndustries";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  Search,
} from "lucide-react-native";

  import {
    useState,
    useEffect,
    useMemo
  } from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import NotificationBell from "../components/notification/NotificationBell";

import IndustryGridCard from "../components/explore/IndustryGridCard";

import FeaturedBusinessCard from "../components/explore/FeaturedBusinessCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";


import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import { getAllBusinesses } from "../services/business.service";
import { getAccessToken } from "../utils/storage";

export default function ExploreScreen() {
  const { industryObjects: industries } = useIndustries();
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [openingIndustries, setOpeningIndustries] = useState(false);
  const [openingAds, setOpeningAds] = useState(false);
  
  const [featuredAds, setFeaturedAds] = useState<any[]>([]);

  const filteredIndustries = useMemo(() => {
    if (!search.trim()) return industries.slice(0, 5);
    return industries
      .filter((ind) => ind.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search, industries]);

  const filteredAds = useMemo(() => {
    if (!search.trim()) return featuredAds;
    return featuredAds.filter((ad) => 
      (ad.business_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (ad.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (ad.industries?.join(", ") || "").toLowerCase().includes(search.toLowerCase()) ||
      (ad.about || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [featuredAds, search]);
  const fetchExploreData = async () => {
    try {
      setIsLoading(true);
      const token = await getAccessToken();
      const res = await getAllBusinesses(token as string);
      
      // Get the top 5 most recently joined businesses
      let businesses = res.data || [];
      // Sort by created_at desc (if exists) or just take first 5
      businesses = businesses.slice(0, 5);
      
      setFeaturedAds(businesses);
      setHasError(false);
    } catch (err) {
      console.log("Error fetching explore data:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreData();
  }, []);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading explore feed..."
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
          title="Unable to load explore feed"

          description="Please try again later."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (
    !filteredIndustries.length &&
    !filteredAds.length
  ) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Explore
          </Text>

        </View>

        {/* SEARCH */}
        <View
          style={[

            styles.searchBar,
            { marginHorizontal: SPACING.xl },

            searchFocused &&
              styles.activeSearchBar,

          ]}
        >

          <Search
            size={18}
            color={
              searchFocused
                ? COLORS.accent
                : COLORS.textSecondary
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

            placeholder="Search industries, products or businesses..."

            placeholderTextColor={
              COLORS.textSecondary
            }

            style={[
              styles.searchInput,

              searchFocused &&
                styles.activeSearchInput,

            ]}
          />

        </View>

        <EmptyState
          title={search ? "No results found" : "Nothing to explore"}

          description={search ? "Try adjusting your search terms" : "Industries and advertisements will appear here."}
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

        <View style={styles.headerContent}>

          <View>

            <Text style={styles.headerTitle}>

              Explore

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Discover industries, businesses and opportunities.

            </Text>

          </View>

          <NotificationBell />

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          nestedScrollEnabled

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={
            styles.content
          }
        >

          {/* SEARCH */}
          <View
            style={[

              styles.searchBar,

              searchFocused &&
                styles.activeSearchBar,

            ]}
          >

            <Search
              size={18}
              color={
                searchFocused
                  ? COLORS.accent
                  : COLORS.textSecondary
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

              placeholder="Search industries, products or businesses..."

              placeholderTextColor={
                COLORS.textSecondary
              }

              style={[
                styles.searchInput,

                searchFocused &&
                  styles.activeSearchInput,

              ]}
            />

          </View>

          {/* INDUSTRIES */}
          {filteredIndustries.length > 0 && (
            <View style={styles.section}>

              <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>
                  Industries
                </Text>

              </View>

              <View style={styles.grid}>

                {filteredIndustries.map(
                  (industry) => (

                    <View
                      key={industry.id}
                      style={styles.gridItem}
                    >

                      <IndustryGridCard
                        icon={industry.icon}

                        title={industry.name}

                        onPress={() => {

                          navigation.push(
                            "IndustryDetails",

                            {
                              industry:
                                industry.name,
                            }
                          );
                        }}
                      />

                    </View>
                  )
                )}

                {/* SEE MORE */}
                <View
                  style={styles.gridItem}
                >

                  <IndustryGridCard
                    icon=""

                    title={
                      openingIndustries
                        ? "Opening..."
                        : "See More"
                    }

                    seeMore

                    onPress={() => {

                      setOpeningIndustries(
                        true
                      );

                      setTimeout(() => {

                        setOpeningIndustries(
                          false
                        );

                        navigation.push(
                          "AllIndustries"
                        );

                      }, 400);
                    }}
                  />

                </View>

              </View>

            </View>
          )}

          {/* ADVERTISEMENTS */}
          {filteredAds.length > 0 && (
            <View style={styles.section}>

              <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>
                  Featured Advertisements
                </Text>

                <TouchableOpacity
                  activeOpacity={0.85}

                  onPress={() => {

                    setOpeningAds(
                      true
                    );

                    setTimeout(() => {

                      setOpeningAds(
                        false
                      );

                      navigation.push(
                        "AdvertisementFeed"
                      );

                    }, 400);
                  }}
                >

                  <View style={styles.viewAllButton}>

                    <Text style={styles.viewAll}>

                      {openingAds
                        ? "Opening..."
                        : "See All"}

                    </Text>

                  </View>

                </TouchableOpacity>

              </View>

              {/* ADS */}
              <View style={styles.adsContainer}>

                <ScrollView
                  horizontal

                  nestedScrollEnabled

                  showsHorizontalScrollIndicator={
                    false
                  }

                  bounces={false}

                  overScrollMode="never"

                  contentContainerStyle={
                    styles.adsScrollContent
                  }
                >

                  {filteredAds.map(
                    (item) => (

                      <FeaturedBusinessCard
                        key={item.id || item.user_id}
                        image={item.profile_image || ""}
                        businessName={item.business_name || "Unknown Business"}
                        industry={item.industries?.join(", ") || "General"}
                        location={item.city && item.state ? `${item.city}, ${item.state}` : item.city || item.state || ""}
                        badgeText={
                          (new Date().getTime() - new Date(item.created_at).getTime() < 30 * 24 * 60 * 60 * 1000)
                            ? "New"
                            : item.verified
                            ? "Verified"
                            : "Active"
                        }
                        onPress={() =>
                          navigation.push(
                            "BusinessProfile",
                            { businessId: item.id || item.user_id }
                          )
                        }
                      />
                    )
                  )}

                </ScrollView>

              </View>

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

  headerContent: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  headerTitle: {
    color: COLORS.white,

    fontSize:
      TYPOGRAPHY.title,

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

  searchBar: {
    minHeight: 58,

    borderRadius: 22,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    flexDirection: "row",

    alignItems: "center",

    gap:
      SPACING.md,

    marginBottom:
      SPACING.xl,
  },

  activeSearchBar: {
    borderColor:
      COLORS.accent,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  searchInput: {
    flex: 1,

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textPrimary,

    paddingVertical: 0,

    includeFontPadding:
      false,
  },

  activeSearchInput: {
    color:
      COLORS.accent,
  },

  section: {
    marginBottom:
      SPACING.xxxl,
  },

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.lg,
  },

  sectionTitle: {
    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  viewAllButton: {
    minHeight: 38,

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

  viewAll: {
    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "700",

    color:
      COLORS.accent,

    includeFontPadding:
      false,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    marginHorizontal: -6,
  },

  gridItem: {
    width: "50%",

    padding: 6,
  },

  adsContainer: {
    paddingBottom:
      SPACING.md,
  },

  adsScrollContent: {
    paddingRight:
      SPACING.lg,

    paddingBottom:
      SPACING.md,
  },

});