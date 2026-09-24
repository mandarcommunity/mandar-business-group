import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";

import CreatePostSheet from "../components/home/CreatePostSheet";

import SponsoredCarousel from "../components/home/SponsoredCarousel";

import SearchBar from "../components/home/SearchBar";

import QuickActionCard from "../components/home/QuickActionCard";

import IndustryPill from "../components/home/IndustryPill";

import StatsCard from "../components/home/StatsCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import NotificationBell from "../components/notification/NotificationBell";

import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

import { useEffect } from "react";
import { API } from "../services/api";
import { getPlatformStats } from "../services/system.service";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [openingIndustries, setOpeningIndustries] = useState(false);
  const [sponsoredPaused, setSponsoredPaused] = useState(false);
  const [refreshingStats, setRefreshingStats] = useState(false);

  const [stats, setStats] = useState({
    businesses: "320+",
    leads: "84",
    verified: "210",
    activeIndustries: ["Textile", "Packaging", "Logistics"],
  });
  const [ads, setAds] = useState([]);

  const fetchStats = async () => {
    try {
      setRefreshingStats(true);
      const res = await getPlatformStats();
      if (res.data?.success) {
        setStats({
          businesses: res.data.data.businesses.toString() + "+",
          leads: res.data.data.leads.toString(),
          verified: res.data.data.verified.toString(),
          activeIndustries: res.data.data.activeIndustries || [
            "Textile",
            "Packaging",
            "Logistics",
          ],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshingStats(false);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await API.get("/system/home-ads");
      if (response.data.success) {
        setAds(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAds();
  }, []);

  /* LOADING */
  if (isLoading) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <LoadingState title="Loading dashboard..." />
      </SafeAreaView>
    );
  }

  /* ERROR */
  if (hasError) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <ErrorState
          title="Unable to load home screen"
          description="Please try again later."
          buttonText="Retry"
        />
      </SafeAreaView>
    );
  }

  /* EMPTY */
  if (!stats.activeIndustries.length) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <EmptyState
          title="No industries found"
          description="Industries and business categories will appear here."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            {user && user.full_name ? <Text style={styles.headerTitle} numberOfLines={1}>Hello, {user.full_name.split(' ')[0]} ??</Text> : <Text style={styles.headerTitle}>Mandar Community</Text>}

            <Text style={styles.headerSubtitle}>Let's grow your business today!</Text>
          </View>

          <NotificationBell />
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* SEARCH */}
          <SearchBar />

          {/* QUICK ACTION */}
          <QuickActionCard onPress={() => setShowCreatePost(true)} />

          {/* INDUSTRIES */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Industries</Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setOpeningIndustries(true);

                  setTimeout(() => {
                    setOpeningIndustries(false);

                    navigation.navigate("AllIndustries");
                  }, 400);
                }}
              >
                <Text style={styles.viewAll}>
                  {openingIndustries ? "Opening..." : "View All"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* INDUSTRIES PILLS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.industriesGrid}
            >
              {stats.activeIndustries.map((industry) => (
                <View key={industry} style={styles.industryItem}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      navigation.navigate("IndustryDetails", {
                        industry: industry,
                      })
                    }
                  >
                    <IndustryPill label={industry} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* STATS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Platform Stats</Text>

            <TouchableOpacity activeOpacity={0.85} onPress={fetchStats}>
              <Text style={styles.viewAll}>
                {refreshingStats ? "Refreshing..." : "Refresh"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <StatsCard
              value={refreshingStats ? "..." : stats.businesses}
              label="Businesses"
            />

            <StatsCard
              value={refreshingStats ? "..." : stats.leads}
              label="Leads"
            />

            <StatsCard
              value={refreshingStats ? "..." : stats.verified}
              label="Verified"
            />
          </View>

          {/* SPONSORED */}
          <View style={styles.section}>
            <View style={styles.sponsoredHeader}>
              <Text style={styles.sectionTitle}>Sponsored</Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setSponsoredPaused(!sponsoredPaused)}
              >
                <View
                  style={[
                    styles.liveBadge,

                    sponsoredPaused && styles.pausedBadge,
                  ]}
                >
                  <Text style={styles.liveBadgeText}>
                    {sponsoredPaused ? "PAUSED" : "LIVE ADS"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {!sponsoredPaused && <SponsoredCarousel ads={ads} />}

            {sponsoredPaused && (
              <View style={styles.pausedContainer}>
                <Text style={styles.pausedText}>Sponsored ads paused</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* CREATE POST */}
      <CreatePostSheet
        visible={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.primary,
  },

  header: {
    paddingHorizontal: SPACING.lg,

    paddingTop: SPACING.md,

    paddingBottom: SPACING.lg,

    backgroundColor: COLORS.primary,
  },

  headerContent: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  headerTitle: {
    color: COLORS.white,

    fontSize: TYPOGRAPHY.title,

    fontWeight: "700",

    includeFontPadding: false,
  },

  headerSubtitle: {
    marginTop: 2,

    color: "rgba(255,255,255,0.7)",

    fontSize: TYPOGRAPHY.caption,

    includeFontPadding: false,
  },

  contentWrapper: {
    flex: 1,

    backgroundColor: COLORS.background,

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    overflow: "hidden",
  },

  contentContainer: {
    padding: SPACING.lg,

    paddingBottom: SPACING.xxxl,
  },

  section: {
    marginBottom: SPACING.xl,
  },

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: SPACING.lg,
  },

  sponsoredHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: SPACING.lg,
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.heading,

    fontWeight: "700",

    color: COLORS.textPrimary,

    includeFontPadding: false,
  },

  viewAll: {
    color: COLORS.accent,

    fontSize: TYPOGRAPHY.caption,

    fontWeight: "700",

    includeFontPadding: false,
  },

  industriesGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingBottom: SPACING.sm, // little padding for scroll
  },

  industryItem: {
    minWidth: "30%",
  },

  statsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.md,

    marginBottom: SPACING.xl,
  },

  liveBadge: {
    borderRadius: 999,

    backgroundColor: COLORS.surfaceSecondary,

    paddingHorizontal: SPACING.md,

    paddingVertical: SPACING.xs,
  },

  pausedBadge: {
    backgroundColor: COLORS.surface,
  },

  liveBadgeText: {
    fontSize: TYPOGRAPHY.small,

    fontWeight: "700",

    color: COLORS.accent,

    includeFontPadding: false,
  },

  selectedIndustryText: {
    marginTop: SPACING.md,

    fontSize: TYPOGRAPHY.caption,

    fontWeight: "600",

    color: COLORS.accent,

    includeFontPadding: false,
  },

  pausedContainer: {
    minHeight: 160,

    borderRadius: SPACING.xxxl,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.surface,

    alignItems: "center",

    justifyContent: "center",

    padding: SPACING.xl,
  },

  pausedText: {
    fontSize: TYPOGRAPHY.body,

    fontWeight: "600",

    color: COLORS.textSecondary,

    textAlign: "center",

    includeFontPadding: false,
  },
});
