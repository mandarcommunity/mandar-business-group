import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Linking,
  Share,
  Alert,
  TextInput,
  ToastAndroid,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import DirectoryCard from "../components/directory/DirectoryCard";

import DirectoryFilterSheet from "../components/directory/DirectoryFilterSheet";
import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";

import { COLORS, SPACING } from "../theme";

import { getAllBusinesses } from "../services/business.service";
import { getAccessToken, getBookmarkedBusinesses, saveBookmarkedBusinesses } from "../utils/storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";



export default function BusinessDirectoryScreen() {

  const navigation =
    useNavigation<any>();

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState<Record<string, boolean>>({});

  const fetchDirectory = async () => {
    try {
      const token = await getAccessToken();
      const res = await getAllBusinesses(token as string);
      
      const mappedBusinesses = res.data.map((b: any) => ({
        id: b.id,
        image: b.profile_image,
        personName: b.contact_person || b.user?.full_name || "Unknown",
        businessName: b.business_name || "Unknown Business",
        industry: b.industries?.join(", ") || "",
        city: b.city || "",
        state: b.state || "",
        location: b.city && b.state ? `${b.city}, ${b.state}` : (b.city || b.state || ""),
        verified: b.verified || false,
        description: b.description || "",
        phone: b.mobile || b.user?.mobile,
        whatsapp: b.mobile || b.user?.mobile,
        slug: b.slug,
          products: b.products?.map((p: any) => p.name).join(", ") || "",
      }));
      setBusinesses(mappedBusinesses);
      
      const bookmarks = await getBookmarkedBusinesses();
      setSavedBusinesses(bookmarks);
      
      setHasError(false);
    } catch (error: any) {
      console.log("Error fetching directory:", error.response?.data || error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDirectory();
    }, [])
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchDirectory();
  };

  const toggleBookmark = async (id: string) => {
    try {
      const isCurrentlySaved = savedBusinesses[id];
      const newBookmarks = { ...savedBusinesses, [id]: !isCurrentlySaved };
      setSavedBusinesses(newBookmarks);
      await saveBookmarkedBusinesses(newBookmarks);
      
      if (!isCurrentlySaved) {
        ToastAndroid.show("Business added to save list", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Business removed from saved list.", ToastAndroid.SHORT);
      }
    } catch (e: any) {
      console.log("Error in toggleBookmark:", e);
      ToastAndroid.show("Failed to save bookmark.", ToastAndroid.LONG);
    }
  };

  const handleCall = (phone?: string) => {
    if (!phone) {
      Alert.alert("Notice", "Phone number not available for this business.");
      return;
    }
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsapp = (whatsapp?: string) => {
    if (!whatsapp) {
      Alert.alert("Notice", "WhatsApp number not available for this business.");
      return;
    }
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  };

  const handleShare = async (business: any) => {
    try {
      await Share.share({ message: `Check out ${business.businessName}, Contact details: Phone: ${business.phone || "N/A"}, WhatsApp: ${business.whatsapp || "N/A"} on Mandar Community Ecosystem!\n\nhttps://mandarcommunity.in/biz/${business.slug || business.id}` });
    } catch (error) {
      console.log("Error sharing business", error);
    }
  };

  /* FILTER STATES */
  const [
    selectedIndustries,

    setSelectedIndustries,

  ] = useState<string[]>([]);

  const [
    city,

    setCity,

  ] = useState("");

  const [
    state,

    setState,

  ] = useState("");

  const [
    verifiedOnly,

    setVerifiedOnly,

  ] = useState(false);

  const filteredBusinesses =
    useMemo(() => {
      return businesses.filter(
        (business) => {

          const query =
            search
              .toLowerCase()
              .trim();

          const matchesSearch =

            business.businessName
              .toLowerCase()
              .includes(query)

            ||

            business.personName
              .toLowerCase()
              .includes(query)

            ||

            business.industry
              .toLowerCase()
              .includes(query)

            ||

            business.location.toLowerCase().includes(query) || (business.products && business.products.toLowerCase().includes(query));

          const matchesIndustry =

            selectedIndustries.length === 0 ||

            selectedIndustries.includes(
              business.industry
            );

          const matchesCity =

            !city.trim() ||

            business.city
              .toLowerCase()
              .includes(
                city.toLowerCase()
              );

          const matchesState =

            !state.trim() ||

            business.state
              .toLowerCase()
              .includes(
                state.toLowerCase()
              );

          const matchesVerified =

            !verifiedOnly ||

            business.verified;

          return (

            matchesSearch &&
            matchesIndustry &&
            matchesCity &&
            matchesState &&
            matchesVerified

          );
          }
        ).sort((a, b) => { if (a.verified === b.verified) return 0; return a.verified ? -1 : 1; });

    }, [

      search,
      selectedIndustries,
      city,
      state,
      verifiedOnly,
      businesses
    ]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading business directory..."
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
          title="Unable to load directory"

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

          <Text style={styles.headerTitle}>

            Business Directory

          </Text>

        </View>

      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
        >

          {/* SEARCH */}
          <View style={styles.searchRow}>

            <View style={styles.searchBar}>

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

                placeholder="Search business, person or industry..."

                placeholderTextColor={
                  COLORS.textMuted
                }

                autoCorrect={false}

                returnKeyType="search"

                style={styles.searchInput}
              />

            </View>

            {/* FILTER */}
            <TouchableOpacity
              activeOpacity={0.85}

              onPress={() =>
                setFilterVisible(true)
              }

              style={styles.filterButton}
            >

              <SlidersHorizontal
                size={20}
                color={
                  COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          {/* ACTIVE FILTERS */}
          {(selectedIndustries.length > 0 ||

            city ||

            state ||

            verifiedOnly) && (

            <View
              style={
                styles.activeFiltersBox
              }
            >

              {!!selectedIndustries.length && (

                <Text
                  style={
                    styles.activeFilterText
                  }
                >

                  Industries:
                  {" "}
                  {selectedIndustries.join(
                    ", "
                  )}

                </Text>

              )}

              {!!city && (

                <Text
                  style={
                    styles.activeFilterText
                  }
                >

                  City:
                  {" "}
                  {city}

                </Text>

              )}

              {!!state && (

                <Text
                  style={
                    styles.activeFilterText
                  }
                >

                  State:
                  {" "}
                  {state}

                </Text>

              )}

              {verifiedOnly && (

                <Text
                  style={
                    styles.activeFilterText
                  }
                >

                  Verified Only Enabled

                </Text>

              )}

            </View>

          )}

          {/* RESULTS */}
          <Text style={styles.resultsText}>

            {
              filteredBusinesses.length
            }
            {" "}
            businesses found

          </Text>

          {/* EMPTY */}
          {!filteredBusinesses.length ? (

            <EmptyState
              title="No businesses found"

              description="Try searching with different keywords or filters."
            />

          ) : (

            filteredBusinesses.map(
              (business) => (

                <DirectoryCard
                  key={business.id}

                  image={
                    business.image
                  }

                  personName={
                    business.personName
                  }

                  businessName={
                    business.businessName
                  }

                  industry={
                    business.industry
                  }

                  location={
                    business.location
                  }

                  verified={
                    business.verified
                  }

                  saved={savedBusinesses[business.id]}
                  onBookmark={() => toggleBookmark(business.id)}
                  onCall={() => handleCall(business.phone)}
                  onWhatsapp={() => handleWhatsapp(business.whatsapp)}
                  onShare={() => handleShare(business)}

                  description={
                    business.description
                  }
                />

              )
            )

          )}

        </ScrollView>

      </View>

      {/* FILTER SHEET */}
      <DirectoryFilterSheet
        visible={filterVisible}

        onClose={() =>
          setFilterVisible(false)
        }

        selectedIndustries={
          selectedIndustries
        }

        setSelectedIndustries={
          setSelectedIndustries
        }

        city={city}

        setCity={setCity}

        state={state}

        setState={setState}

        verifiedOnly={
          verifiedOnly
        }

        setVerifiedOnly={
          setVerifiedOnly
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

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.white,
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

    gap: SPACING.md,
  },

  searchRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.sm,
  },

  searchBar: {
    flex: 1,

    height: 56,

    borderRadius: 20,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.md,

    flexDirection: "row",

    alignItems: "center",

    gap: 10,
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

  activeFiltersBox: {
    backgroundColor:
      COLORS.surfaceSecondary,

    borderRadius: 20,

    padding:
      SPACING.md,

    gap: SPACING.sm,
  },

  activeFilterText: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.accent,
  },

  resultsText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,

    marginTop: SPACING.xs,
  },

});