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
  useEffect,
  useCallback,
} from "react";

import { getAllRequirements } from "../services/requirement.service";
import { getAccessToken } from "../utils/storage";

import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import { Share } from "react-native";
import { getUser } from "../utils/storage";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import LeadCard from "../components/leads/LeadCard";

import LeadTypeChip from "../components/leads/LeadTypeChip";

import LeadsFilterSheet from "../components/leads/LeadsFilterSheet";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
} from "../theme";

import {
  INDUSTRIES,
} from "../constants/industries";

const industries = [
  "All",
  ...INDUSTRIES.slice(0, 12),
];

// Removed initial static leadsData

export default function LeadsScreen() {

  const navigation =
    useNavigation<any>();

  const [
    selectedIndustry,
    setSelectedIndustry,
  ] = useState("All");

  const [
    filterVisible,
    setFilterVisible,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    searchFocused,
    setSearchFocused,
  ] = useState(false);

  const [
    openingFilters,
    setOpeningFilters,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading
  ] = useState(false);

  const [
    hasError,
    setHasError
  ] = useState(false);

  const [filterIndustries, setFilterIndustries] = useState<string[]>([]);
  const [filterCity, setFilterCity] = useState("");
  const [filterState, setFilterState] = useState("");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [
    openingLeadId,
    setOpeningLeadId,
  ] = useState<string | null>(null);

  const [
    leadsData,
    setLeadsData,
  ] = useState<any[]>([]);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const token = await getAccessToken();
      const currentUser = await getUser();
      if (currentUser && currentUser.id) {
        setCurrentUserId(currentUser.id);
      }
      const res = await getAllRequirements(token as string);
      
      // Map API response to match UI format
      const formatted = res.data.data.map((req: any) => ({
        id: req.id,
        user_id: req.user_id,
        personName: req.users?.full_name || "Unknown User",
        businessName: req.businesses?.business_name || "Unknown Business",
        title: req.title,
        description: req.description,
        industry: req.industries?.join(", ") || "General",
        city: req.city,
        state: req.state,
        location: `${req.city}, ${req.state}`,
          slug: req.slug,
        postedTime: new Date(req.created_at).toLocaleDateString(),
        urgent: req.tags?.includes("urgent") || false,
        bulk: req.tags?.includes("bulk") || false,
        longTerm: req.tags?.includes("longTerm") || false,
      }));
      
      setLeadsData(formatted);
    } catch (err) {
      console.log(err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLeads();
    }, [])
  );

  const filteredLeads = useMemo(() => {
    return leadsData.filter((lead) => {
      const matchesIndustry =
        selectedIndustry === "All" || lead.industry === selectedIndustry;

      const s = search.toLowerCase();
      const matchesSearch =
        !search ||
        (lead.title && lead.title.toLowerCase().includes(s)) ||
        (lead.businessName && lead.businessName.toLowerCase().includes(s)) ||
        (lead.personName && lead.personName.toLowerCase().includes(s)) ||
        (lead.description && lead.description.toLowerCase().includes(s)) ||
        (lead.city && lead.city.toLowerCase().includes(s)) ||
        (lead.state && lead.state.toLowerCase().includes(s)) ||
        (lead.location && lead.location.toLowerCase().includes(s)) ||
        (lead.industry && lead.industry.toLowerCase().includes(s));

      const matchesFilterIndustries = 
        filterIndustries.length === 0 || filterIndustries.includes(lead.industry);
      const matchesFilterCity = 
        !filterCity || (lead.city && lead.city.toLowerCase() === filterCity.toLowerCase());
      const matchesFilterState = 
        !filterState || (lead.state && lead.state.toLowerCase() === filterState.toLowerCase());

      return matchesIndustry && matchesSearch && matchesFilterIndustries && matchesFilterCity && matchesFilterState;
    });
  }, [selectedIndustry, search, leadsData, filterIndustries, filterCity, filterState]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading leads..."
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
          title="Unable to load leads"

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

          <Text
            style={
              styles.headerTitle
            }
          >

            Leads

          </Text>

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

          {/* SEARCH */}
          <View
            style={
              styles.searchRow
            }
          >

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
                  setSearchFocused(
                    true
                  )
                }

                onBlur={() =>
                  setSearchFocused(
                    false
                  )
                }

                placeholder="Search requirements..."

                placeholderTextColor={
                  COLORS.textMuted
                }

                style={
                  styles.searchInput
                }
              />

            </View>

            {/* FILTER BUTTON */}
            <TouchableOpacity
              activeOpacity={0.85}

              onPress={() => {

                setOpeningFilters(
                  true
                );

                setFilterVisible(
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

          {/* INDUSTRY CHIPS */}
          <ScrollView
            horizontal

            showsHorizontalScrollIndicator={
              false
            }

            contentContainerStyle={
              styles.chipsContainer
            }
          >

            {industries.map(
              (industry) => (

                <LeadTypeChip
                  key={industry}

                  label={industry}

                  active={
                    selectedIndustry ===
                    industry
                  }

                  onPress={() =>
                    setSelectedIndustry(
                      industry
                    )
                  }
                />

              )
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
                filteredLeads.length
              }
              {" "}
              leads found

            </Text>

          </View>

          {/* LEADS */}
          {!filteredLeads.length ? (

            <EmptyState
              title="No leads found"

              description="Try changing your filters or search."
            />

          ) : (

            filteredLeads.map(
              (lead) => (

                <LeadCard
                  key={lead.id}

                  personName={
                    lead.personName
                  }

                  businessName={
                    lead.businessName
                  }

                  title={
                    lead.title
                  }

                  description={
                    lead.description
                  }

                  industry={
                    lead.industry
                  }

                  location={
                    lead.location
                  }

                  postedTime={
                    lead.postedTime
                  }

                  urgent={
                    lead.urgent
                  }

                  bulk={
                    lead.bulk
                  }

                  longTerm={
                    lead.longTerm
                  }

                  isOwner={lead.user_id === currentUserId}
                  loading={
                    openingLeadId ===
                    lead.id
                  }

                  onQuoteNow={() => {

                    setOpeningLeadId(
                      lead.id
                    );

                    setTimeout(() => {

                      setOpeningLeadId(
                        null
                      );

                      navigation.navigate(
                        "Conversation",

                        {
                          chatId: lead.id,

                          name:
                            lead.personName,

                          businessName:
                            lead.businessName,
                        }
                      );

                    }, 250);

                  }}

                  onShare={async () => {
                    try {
                      await Share.share({ message: `Check out this requirement lead for "${lead.title}" on Mandar Community Ecosystem.\n\nhttps://mandarcommunity.in/req/${lead.slug || lead.id}` });
                    } catch (error) {
                      console.log("Error sharing lead:", error);
                    }
                  }}
                />

              )
            )

          )}

        </ScrollView>

      </View>

      {/* FILTER SHEET */}
      <LeadsFilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(industries, city, state) => {
          setFilterIndustries(industries);
          setFilterCity(city);
          setFilterState(state);
        }}
        initialIndustries={filterIndustries}
        initialCity={filterCity}
        initialState={filterState}
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

    color: COLORS.white,
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

  chipsContainer: {
    gap: SPACING.sm,

    paddingVertical:
      SPACING.sm,
  },

  resultsRow: {
    marginTop: SPACING.xs,
  },

  resultsText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

});