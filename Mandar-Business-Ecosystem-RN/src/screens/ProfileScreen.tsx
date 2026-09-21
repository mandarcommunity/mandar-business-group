import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import {
  Package,
  BriefcaseBusiness,
  Megaphone,
  Building2,
  Bookmark,
  Bell,
  ShieldCheck,
  Shield,
  FileText,
  MessageSquareMore,
  LogOut,
  Eye,
} from "lucide-react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useCallback } from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import NotificationBell from "../components/notification/NotificationBell";

import ProfileRow from "../components/profile/ProfileRow";

import ProfileStatCard from "../components/profile/ProfileStatCard";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import EmptyState from "../components/states/EmptyState";

import { getMyBusiness } from "../services/auth.service";
import { getMyProducts } from "../services/product.service";
import { getMyAdvertisements } from "../services/advertisement.service";
import { getMyRequirements } from "../services/requirement.service";

import {

  getAccessToken,

} from "../utils/storage";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import {
  useAuth,
} from "../context/AuthContext";

export default function ProfileScreen() {

  const navigation =
    useNavigation<any>();

    const { logout } =
  useAuth();

  const [

  business,

  setBusiness,

] = useState<any>(null);

const [

  isLoading,

  setIsLoading,

] = useState(true);

  const [hasError, setHasError] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  const [productCount, setProductCount] = useState(0);
  const [adCount, setAdCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);

  const fetchBusiness = async () => {
    try {
      setIsLoading(true);

      const token = await getAccessToken();

      // Fetch business details
      const response = await getMyBusiness(token as string);
      setBusiness(response.data);

      // Fetch products and filter active
      try {
        const prodRes = await getMyProducts(token as string);
        const activeProds = (prodRes.data?.data || []).filter((p: any) => p.status === 'Active' || p.status === 'active' || p.status === undefined);
        setProductCount(activeProds.length);
      } catch (e) {
        console.log("Error fetching product count", e);
      }

      // Fetch ads and filter active
      try {
        const adRes = await getMyAdvertisements(token as string);
        const activeAds = (adRes.data?.data || []).filter((a: any) => a.status === 'Active' || a.status === 'active' || a.status === undefined);
        setAdCount(activeAds.length);
      } catch (e) {
        console.log("Error fetching ad count", e);
      }

      // Fetch requirements (leads) and filter active
      try {
        const reqRes = await getMyRequirements(token as string);
        const activeReqs = (reqRes.data?.data || []).filter((r: any) => r.status === 'Active' || r.status === 'active' || r.status === undefined);
        setLeadCount(activeReqs.length);
      } catch (e) {
        console.log("Error fetching lead count", e);
      }

    } catch (error) {

      console.log(error);

      setHasError(true);

    } finally {

      setIsLoading(false);

    }

};

useFocusEffect(
  useCallback(() => {
    fetchBusiness();
  }, [])
);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading profile..."
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
          title="Unable to load profile"

          description="Please try again later."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (!business) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <EmptyState
          title="Business not found"

          description="No business profile data available."
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

              Profile

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Business Dashboard

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

          contentContainerStyle={
            styles.content
          }
        >

          {/* BUSINESS HEADER */}
          <View style={styles.businessCard}>

            <View style={styles.businessRow}>

              {/* AVATAR */}
              <View style={styles.avatar}>
                {business.profileImage ? (
                  <Image 
                    source={{ uri: business.profileImage }} 
                    style={{ width: '100%', height: '100%', borderRadius: 100 }} 
                  />
                ) : (
                  <Text style={styles.avatarText}>
                    {business.businessName?.charAt(0)}
                  </Text>
                )}
              </View>

              {/* INFO */}
              <View style={styles.infoSection}>

                <Text
                  numberOfLines={1}
                  style={
                    styles.businessName
                  }
                >

                  {
                    business.businessName
                  }

                </Text>

                <Text
                  style={
                    styles.businessMeta
                  }
                >

                  {
                    business.industries?.join(", ")
                  }
                  {" • "}
                  {
                    business.city
                  }

                </Text>

                {/* ACTIONS */}
                <View style={styles.actionRow}>

                  {business.verified && (

                    <View
  style={
    styles.verifiedBadge
  }
>

  <Text
    style={
      styles.verifiedText
    }
  >

    {business.verified
      ? "Verified Business"
      : "Unverified Business"}

  </Text>

</View>

                  )}

                  {/* VIEW PROFILE */}
                  <TouchableOpacity
                    style={
                      styles.actionButton
                    }

                    onPress={() =>
                      navigation.navigate(
                        "BusinessProfile",

                        {
                          businessId:
                            business.id,
                        }
                      )
                    }
                  >

                    <Eye
                      size={12}
                      color={
                        COLORS.textPrimary
                      }
                    />

                    <Text
                      style={
                        styles.actionButtonText
                      }
                    >

                      View Profile

                    </Text>

                  </TouchableOpacity>

                  {/* EDIT PROFILE */}
                  <TouchableOpacity
                    style={
                      styles.actionButton
                    }

                    onPress={() =>
                      navigation.navigate(
                        "EditProfile"
                      )
                    }
                  >

                    <Text
                      style={
                        styles.actionButtonText
                      }
                    >

                      Edit Profile

                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            </View>

          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
            <ProfileStatCard
              value={productCount.toString()}
              label="Products"
            />
            <ProfileStatCard
              value={leadCount.toString()}
              label="Leads"
            />
            <ProfileStatCard
              value={adCount.toString()}
              label="Ads"
            />
          </View>

          {/* BUSINESS MANAGEMENT */}
          <View style={styles.section}>

            <Text
              style={styles.sectionTitle}
            >

              Business Management

            </Text>

            <View
              style={
                styles.sectionContent
              }
            >

              <ProfileRow
                icon={
                  <Package
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="My Products"

                subtitle="Manage business products"

                onPress={() =>
                  navigation.navigate(
                    "MyProducts"
                  )
                }
              />

              <ProfileRow
                icon={
                  <BriefcaseBusiness
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="My Requirements"

                subtitle="Manage posted requirements"

                onPress={() =>
                  navigation.navigate(
                    "MyRequirements"
                  )
                }
              />

              <ProfileRow
                icon={
                  <Megaphone
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="My Advertisements"

                subtitle="Manage advertisements"

                onPress={() =>
                  navigation.navigate(
                    "MyAdvertisements"
                  )
                }
              />

            </View>

          </View>

          {/* COMMUNITY */}
          <View style={styles.section}>

            <Text
              style={styles.sectionTitle}
            >

              Community

            </Text>

            <View
              style={
                styles.sectionContent
              }
            >

              <ProfileRow
                icon={
                  <Building2
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Business Directory"

                subtitle="Explore businesses"

                onPress={() =>
                  navigation.navigate(
                    "BusinessDirectory"
                  )
                }
              />

              <ProfileRow
                icon={
                  <Bookmark
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Saved Businesses"

                subtitle="View bookmarked businesses"

                onPress={() =>
                  navigation.navigate(
                    "SavedBusinesses"
                  )
                }
              />

            </View>

          </View>

          {/* ACCOUNT */}
          <View style={styles.section}>

            <Text
              style={styles.sectionTitle}
            >

              Account

            </Text>

            <View
              style={
                styles.sectionContent
              }
            >

              <ProfileRow
                icon={
                  <Bell
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Notifications"

                subtitle="Manage notifications"

                onPress={() =>
                  navigation.navigate(
                    "Notifications"
                  )
                }
              />

              <ProfileRow
                icon={
                  <ShieldCheck
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Verification Status"

                subtitle="Business verification details"

                onPress={() =>
                  navigation.navigate(
                    "VerificationStatus",

                    {
                      businessId:
                        business.id,
                    }
                  )
                }
              />

              <ProfileRow
                icon={
                  <FileText
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Terms & Conditions"

                subtitle="Policies and community guidelines"

                onPress={() =>
                  navigation.navigate(
                    "TermsConditions"
                  )
                }
              />

              <ProfileRow
                icon={
                  <Shield
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Privacy Policy"

                subtitle="Data collection and privacy information"

                onPress={() =>
                  navigation.navigate(
                    "PrivacyPolicy"
                  )
                }
              />

              <ProfileRow
                icon={
                  <MessageSquareMore
                    size={20}
                    color={
                      COLORS.accent
                    }
                  />
                }

                title="Feedback"

                subtitle="Share feedback and suggestions"

                onPress={() =>
                  navigation.navigate(
                    "Feedback"
                  )
                }
              />

              <ProfileRow
                icon={
                  <LogOut
                    size={20}
                    color="#ef4444"
                  />
                }

                title={
                  loggingOut
                    ? "Logging Out..."
                    : "Logout"
                }

                subtitle="Sign out from account"

                onPress={() => {

                  Alert.alert(

                    "Logout",

                    "Are you sure you want to logout?",

                    [

                      {
                        text: "Cancel",

                        style: "cancel",
                      },

                      {
                        text: "Logout",

                        style: "destructive",

                        onPress: async () => {

  try {

    setLoggingOut(
      true
    );

    await logout();

  } catch (error) {

    console.log(error);

  } finally {

    setLoggingOut(
      false
    );
  }

},
                      },
                    ]
                  );

                }}
              />

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

  businessCard: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius:
      SPACING.xxxl,

    padding:
      SPACING.lg,

    marginBottom:
      SPACING.xl,
  },

  businessRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  avatar: {
    width: 68,

    height: 68,

    borderRadius: 24,

    backgroundColor:
      "#e6efe9",

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.lg,

    flexShrink: 0,
  },

  avatarText: {
    fontSize: 26,

    fontWeight: "700",

    color:
      COLORS.primary,

    includeFontPadding:
      false,
  },

  infoSection: {
    flex: 1,
  },

  businessName: {
    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  businessMeta: {
    marginTop: 4,

    fontSize:
      TYPOGRAPHY.caption,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  actionRow: {
    flexDirection: "row",

    alignItems: "center",

    flexWrap: "wrap",

    marginTop:
      SPACING.md,

    gap:
      SPACING.sm,
  },

  verifiedBadge: {
    backgroundColor:
      "#e8f5e9",

    borderRadius: 999,

    paddingHorizontal:
      SPACING.md,

    paddingVertical:
      SPACING.xs,
  },

  verifiedText: {
    color: "#2e7d32",

    fontSize:
      TYPOGRAPHY.small,

    fontWeight: "700",

    includeFontPadding:
      false,
  },

  actionButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,

    borderRadius: 999,

    paddingHorizontal:
      SPACING.md,

    paddingVertical:
      SPACING.xs,
  },

  actionButtonText: {
    color:
      COLORS.textPrimary,

    fontSize:
      TYPOGRAPHY.small,

    fontWeight: "700",

    includeFontPadding:
      false,
  },

  statsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap:
      SPACING.md,

    marginBottom:
      SPACING.xl,
  },

  section: {
    marginBottom:
      SPACING.xl,
  },

  sectionTitle: {
    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.md,

    includeFontPadding:
      false,
  },

  sectionContent: {
    gap:
      SPACING.md,
  },
});