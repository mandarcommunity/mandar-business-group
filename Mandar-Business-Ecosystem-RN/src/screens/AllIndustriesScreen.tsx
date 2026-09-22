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
} from "react";

import {
  ArrowLeft,
  Search,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import IndustryGridCard from "../components/explore/IndustryGridCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  industries,
} from "../data/industries";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

export default function AllIndustriesScreen() {
  const { industryObjects: industries } = useIndustries();

  const navigation =
    useNavigation<any>();

  const [
    search,

    setSearch,

  ] = useState("");

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    searchFocused,

    setSearchFocused,

  ] = useState(false);

  const filteredIndustries =
    useMemo(() => {

      return industries.filter(
        (industry) =>

          industry.name
            .toLowerCase()
            .includes(
              search
                .toLowerCase()
                .trim()
            )
      );

    }, [search]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading industries..."
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
          title="Unable to load industries"

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

              All Industries

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Browse all business industries.

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
            styles.content
          }
        >

          {/* SEARCH */}
          <View
            style={[

              styles.searchWrapper,

              searchFocused &&
                styles.activeSearchWrapper,

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

              placeholder="Search industries..."

              placeholderTextColor={
                COLORS.textSecondary
              }

              autoCorrect={false}

              autoCapitalize="words"

              returnKeyType="search"

              clearButtonMode="while-editing"

              style={styles.searchInput}
            />

          </View>

          {/* EMPTY */}
          {!filteredIndustries.length ? (

            <EmptyState
              title="No industries found"

              description="Try searching with a different keyword."
            />

          ) : (

            /* GRID */
            <View style={styles.grid}>

              {filteredIndustries.map(
                (industry) => (

                  <View
                    key={industry.id}
                    style={styles.gridItem}
                  >

                    <IndustryGridCard
                      icon={
                        industry.icon
                      }

                      title={
                        industry.name
                      }

                      onPress={() =>
                        navigation.navigate(
                          "IndustryDetails",

                          {
                            industry:
                              industry.name,
                          }
                        )
                      }
                    />

                  </View>
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

  searchWrapper: {
    minHeight: 58,

    borderRadius: 22,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.sm,

    flexDirection: "row",

    alignItems: "center",

    gap:
      SPACING.md,

    marginBottom:
      SPACING.xl,
  },

  activeSearchWrapper: {
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
});