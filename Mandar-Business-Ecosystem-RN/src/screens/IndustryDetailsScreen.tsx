import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useMemo,
  useState,
  useEffect
} from "react";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import IndustryBusinessCard from "../components/explore/IndustryBusinessCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import IndustryFilterSheet
from "../components/explore/IndustryFilterSheet";

import {
  dummyBusinesses,
} from "../data/dummyBusinesses";

import {
  dummyProducts,
} from "../data/dummyProducts";

import {
  COLORS,
  SPACING,
} from "../theme";

export default function IndustryDetailsScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const industry =
    route.params?.industry;

  const [
    search,

    setSearch,

  ] = useState("");

  const [
    showFilters,

    setShowFilters,

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
    searchFocused,

    setSearchFocused,

  ] = useState(false);

  const [
    openingFilters,

    setOpeningFilters,

  ] = useState(false);

  const [
    openingCatalogId,

    setOpeningCatalogId,

  ] = useState<string | null>(
    null
  );

  const [
    openingChatId,

    setOpeningChatId,

  ] = useState<string | null>(
    null
  );

  /* FILTER STATES */
  const [
    selectedStates,

    setSelectedStates,

  ] = useState<string[]>([]);

  const [
    selectedCities,

    setSelectedCities,

  ] = useState<string[]>([]);

  const [
    featuredOnly,

    setFeaturedOnly,

  ] = useState(false);

  const [
    recentlyActiveOnly,

    setRecentlyActiveOnly,

  ] = useState(false);

  const [
    hasCatalogOnly,

    setHasCatalogOnly,

  ] = useState(false);

  const [allBusinesses, setAllBusinesses] = useState<any[]>([]);

  /* FETCH DATA */
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const { getAccessToken } = require("../utils/storage");
        const { getAllBusinesses } = require("../services/business.service");
        
        const token = await getAccessToken();
        if (token) {
          const res = await getAllBusinesses(token);
          if (res.success) {
            setAllBusinesses(res.data);
          }
        }
      } catch (err) {
        console.log("Error fetching businesses", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  /* INDUSTRY BUSINESSES */
  const industryBusinesses = useMemo(() => {
    return allBusinesses.filter(
      (business) =>
        business.industries && business.industries.includes(industry)
    );
  }, [allBusinesses, industry]);

  /* FILTERED BUSINESSES */
  const filteredBusinesses =
    useMemo(() => {

      return industryBusinesses.filter(
        (business) => {

          const city = business.city || "";
          const state = business.state || "";

          /* SEARCH */
          const matchesSearch =

            (business.business_name || "")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            (business.user?.full_name || "")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            (business.about || "")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          if (!matchesSearch) {
            return false;
          }

          /* STATE FILTER */
          if (

            selectedStates.length > 0 &&

            !selectedStates.includes(
              state.trim()
            )

          ) {

            return false;

          }

          /* CITY FILTER */
          if (

            selectedCities.length > 0 &&

            !selectedCities.includes(
              city.trim()
            )

          ) {

            return false;

          }

          /* FEATURED */
          if (

            featuredOnly &&

            !business.gst_number

          ) {

            return false;

          }

          /* RECENTLY ACTIVE */
          if (

            recentlyActiveOnly &&

            (new Date().getTime() - new Date(business.created_at).getTime() > 30 * 24 * 60 * 60 * 1000)

          ) {

            return false;

          }

          /* HAS CATALOG */
          if (

            hasCatalogOnly &&

            !(business.products && business.products.length > 0)

          ) {

            return false;

          }

          return true;

        }
      );

    }, [

      industryBusinesses,
      search,
      selectedStates,
      selectedCities,
      featuredOnly,
      recentlyActiveOnly,
      hasCatalogOnly,

    ]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading industry businesses..."
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
          title="Unable to load businesses"

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

        <View style={styles.headerLeft}>

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

          <View
            style={
              styles.headerTextWrapper
            }
          >

            <Text
              style={styles.headerTitle}
            >

              {industry}

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Explore businesses and catalogs

            </Text>

          </View>

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={
            styles.contentContainer
          }
        >

          {/* HERO */}
          <View style={styles.heroCard}>

            <Text style={styles.heroTitle}>

              {industry} Ecosystem

            </Text>

            <Text
              style={
                styles.heroDescription
              }
            >

              Explore businesses,
              suppliers and product
              catalogs related to the{" "}
              {industry} industry.

            </Text>

          </View>

          {/* SEARCH */}
          <View style={styles.searchRow}>

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
                  COLORS.textMuted
                }
              />

              <TextInput
                value={search}

                onChangeText={
                  setSearch
                }

                onFocus={() =>
                  setSearchFocused(true)
                }

                onBlur={() =>
                  setSearchFocused(false)
                }

                placeholder="Search businesses..."

                placeholderTextColor={
                  COLORS.textMuted
                }

                style={
                  styles.searchInput
                }
              />

            </View>

            {/* FILTER */}
            <TouchableOpacity
              activeOpacity={0.85}

              onPress={() => {

                setOpeningFilters(
                  true
                );

                setShowFilters(
                  true
                );

                setTimeout(() => {

                  setOpeningFilters(
                    false
                  );

                }, 250);

              }}

              style={[

                styles.filterButton,

                openingFilters &&
                  styles.activeFilterButton,

              ]}
            >

              <SlidersHorizontal
                size={20}
                color={
                  COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          {/* RESULTS */}
          <Text style={styles.resultsText}>

            {
              filteredBusinesses.length
            }
            {" "}
            businesses found

          </Text>

          {/* CARDS */}
          <View style={styles.cards}>

            {!filteredBusinesses.length ? (

              <EmptyState
                title="No businesses found"

                description="Try changing your search or filters to discover businesses."
              />

            ) : (

              filteredBusinesses.map(
                (business) => {

                  const businessProducts = (business.products || [])
                    .map((product: any) => ({
                      ...product,
                      image: product.images?.[0] || ""
                    }))
                    .slice(0, 4);

                  return (

                    <IndustryBusinessCard
                      key={business.id}

                      businessName={
                        business.business_name || "Unknown Business"
                      }

                      ownerName={
                        business.user?.full_name || "Owner"
                      }

                      location={
                        business.city && business.state ? `${business.city}, ${business.state}` : business.city || business.state || ""
                      }

                      description={
                        business.about || ""
                      }

                      image={
                        business.profile_image || ""
                      }

                      verified={
                        !!business.gst_number
                      }

                      products={
                        businessProducts
                      }

                      onCatalogPress={() => {

                        setOpeningCatalogId(
                          business.id
                        );

                        setTimeout(() => {

                          setOpeningCatalogId(
                            null
                          );

                          navigation.navigate(
                            "BusinessCatalog",

                            {
                              businessId:
                                business.id,
                            }
                          );

                        }, 250);

                      }}

                      onChatPress={() => {

                        setOpeningChatId(
                          business.id
                        );

                        setTimeout(() => {

                          setOpeningChatId(
                            null
                          );

                          navigation.navigate(
                            "Chats"
                          );

                        }, 250);

                      }}

                      onSharePress={async () => {
                        try {
                          const { Share, Alert } = require('react-native');
                          await Share.share({
                            message: `Check out ${business.business_name || "this business"} on Mandar!\n\n${business.about || ""}`,
                          });
                        } catch (error: any) {
                          const { Alert } = require('react-native');
                          Alert.alert("Share Error", error.message);
                        }
                      }}
                    />

                  );
                }
              )

            )}

          </View>

        </ScrollView>

      </View>

      {/* FILTER SHEET */}
      <IndustryFilterSheet

        visible={showFilters}

        onClose={() =>
          setShowFilters(false)
        }

        selectedStates={
          selectedStates
        }

        setSelectedStates={
          setSelectedStates
        }

        selectedCities={
          selectedCities
        }

        setSelectedCities={
          setSelectedCities
        }

        featuredOnly={
          featuredOnly
        }

        setFeaturedOnly={
          setFeaturedOnly
        }

        recentlyActiveOnly={
          recentlyActiveOnly
        }

        setRecentlyActiveOnly={
          setRecentlyActiveOnly
        }

        hasCatalogOnly={
          hasCatalogOnly
        }

        setHasCatalogOnly={
          setHasCatalogOnly
        }
      />

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

  headerTextWrapper: {
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

    color:
      "rgba(255,255,255,0.72)",
  },

  contentWrapper: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    overflow: "hidden",
  },

  contentContainer: {
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,
  },

  heroCard: {
    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,

    marginBottom:
      SPACING.xl,
  },

  heroTitle: {
    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  heroDescription: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  searchRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.sm,

    marginBottom:
      SPACING.md,
  },

  searchBar: {
    flex: 1,

    height: 56,

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

    gap: SPACING.md,
  },

  activeSearchBar: {
    borderColor:
      COLORS.primary,
  },

  searchInput: {
    flex: 1,

    fontSize: 14,

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
    borderColor:
      COLORS.primary,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  resultsText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,

    marginBottom:
      SPACING.xl,
  },

  cards: {
    gap: SPACING.lg,
  },
});