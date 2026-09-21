import {
  useEffect,
  useState,
} from "react";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Globe,
  Mail,
  MapPin,
  User,
} from "lucide-react-native";

import BusinessActionBar from "../components/business/BusinessActionBar";

import BusinessStatsRow from "../components/business/BusinessStatsRow";

import {
  COLORS,
  SPACING,
} from "../theme";

import { getBusinessById } from "../services/business.service";
import { getBusinessProducts } from "../services/product.service";
import {
  getAccessToken,
} from "../utils/storage";

const calculateYearsActive = (createdAt: string | undefined) => {
  if (!createdAt) return "0.1+";
  const start = new Date(createdAt);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = diffDays / 365.25;
  
  let fraction = Math.floor(years * 10) / 10;
  if (fraction === 0) fraction = 0.1;
  
  return fraction.toString() + "+";
};

export default function BusinessProfileScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const businessId =
    route.params?.businessId;

  const [

  business,

  setBusiness,

] = useState<any>(null);

const [

  isLoading,

  setIsLoading,

] = useState(true);

const [

  hasError,

  setHasError,

] = useState(false);

  const [
    aboutExpanded,

    setAboutExpanded,

  ] = useState(false);

  const [
    openingWebsite,

    setOpeningWebsite,

  ] = useState(false);

  const [
    openingEmail,

    setOpeningEmail,

  ] = useState(false);

  const [
    openingCatalog,

    setOpeningCatalog,

  ] = useState(false);

  const fetchBusinessProfile = async () => {
    if (!businessId) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const token = await getAccessToken();
      const response = await getBusinessById(businessId, token as string);
      const data = response.data;
      const productsRes = await getBusinessProducts(token as string, businessId);
      const productCount = productsRes?.data?.data?.length || 0;

      setBusiness({
        id: data.id,
        businessName: data.business_name || "",
        ownerName: data.contact_person || data.user?.full_name || "",
        industry: data.industries?.join(", ") || "",
        businessType: data.business_types?.join(", ") || "",
        city: data.city || "",
        state: data.state || "",
        profileImage: data.profile_image || "",
        verified: data.verified || false,
        phone: data.mobile || data.user?.mobile || "",
        whatsapp: data.mobile || data.user?.mobile || "",
        about: data.description || "",
        fullAddress: [data.address, data.city, data.state].filter(Boolean).join(", "),
        email: data.email || data.user?.email || "",
        website: data.website || "",
          slug: data.slug,
        catalogCount: productCount.toString(),
        responseRate: "100%",
        yearsActive: calculateYearsActive(data.created_at),
      });
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessProfile();
  }, [businessId]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading business profile..."
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
          title="Unable to load business"

          description="Please try again after some time."

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

          description="This business may have been removed or is no longer available."
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
            Business Profile
          </Text>

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

          {/* HEADER CARD */}
          <View style={styles.headerCard}>

            {/* TOP */}
            <View style={styles.profileRow}>

              <Image
                source={{
                  uri:
                    business.profileImage,
                }}

                style={styles.profileImage}
              />

              <View
                style={styles.businessInfo}
              >

                <Text
                  style={
                    styles.businessName
                  }
                >
                  {
                    business.businessName
                  }
                </Text>

                <Text
                  style={styles.ownerName}
                >
                  Owner:{" "}
                  {
                    business.ownerName
                  }
                </Text>

                <Text style={styles.meta}>
                  {
                    business.industry
                  }
                  {" • "}
                  {
                    business.businessType
                  }
                </Text>

                <Text
                  style={
                    styles.location
                  }
                >
                  {
                    business.city
                  }
                  {", "}
                  {
                    business.state
                  }
                </Text>

              </View>

            </View>

            {/* VERIFIED + ACTIONS */}
            <View style={styles.bottomRow}>

              {business.verified && (

                <View
                  style={
                    styles.verifiedBadge
                  }
                >

                  <BadgeCheck
                    size={16}
                    color={
                      COLORS.accent
                    }
                  />

                  <Text
                    style={
                      styles.verifiedText
                    }
                  >
                    Verified Business
                  </Text>

                </View>

              )}

              <BusinessActionBar
                phone={business.phone}

                whatsapp={
                  business.whatsapp
                }

                businessName={business.businessName}
                businessId={business.id}
                slug={business.slug}

                onCatalogPress={() => {

                  setOpeningCatalog(
                    true
                  );

                  setTimeout(() => {

                    setOpeningCatalog(
                      false
                    );

                    navigation.navigate(
                      "BusinessCatalog",

                      {
                        businessId:
                          business.id,
                      }
                    );

                  }, 400);

                }}
              />

            </View>

          </View>

          {/* ABOUT */}
          <View style={styles.section}>

            <Text style={styles.heading}>
              About Business
            </Text>

            <View style={styles.card}>

              <Text
                style={
                  styles.description
                }
              >

                {aboutExpanded ||
                business.about.length <= 180
                  ? business.about
                  : `${business.about.slice(0, 180)}...`}

              </Text>

              {business.about.length >
                180 && (

                <TouchableOpacity
                  activeOpacity={0.85}

                  onPress={() =>
                    setAboutExpanded(
                      !aboutExpanded
                    )
                  }
                >

                  <Text
                    style={
                      styles.readMoreText
                    }
                  >

                    {aboutExpanded
                      ? "Read Less"
                      : "Read More"}

                  </Text>

                </TouchableOpacity>

              )}

            </View>

          </View>

          {/* BUSINESS DETAILS */}
          <View style={styles.section}>

            <Text style={styles.heading}>
              Business Details
            </Text>

            <View style={styles.card}>

              {/* OWNER */}
              <View
                style={
                  styles.detailRow
                }
              >

                <View
                  style={
                    styles.detailIcon
                  }
                >

                  <User
                    size={18}
                    color={
                      COLORS.textPrimary
                    }
                  />

                </View>

                <View style={styles.detailContent}>

                  <Text
                    style={
                      styles.detailLabel
                    }
                  >
                    Contact Person
                  </Text>

                  <Text
                    style={
                      styles.detailValue
                    }
                  >
                    {
                      business.ownerName
                    }
                  </Text>

                </View>

              </View>

              {/* INDUSTRY */}
              <View
                style={
                  styles.detailRow
                }
              >

                <View
                  style={
                    styles.detailIcon
                  }
                >

                  <BriefcaseBusiness
                    size={18}
                    color={
                      COLORS.textPrimary
                    }
                  />

                </View>

                <View style={styles.detailContent}>

                  <Text
                    style={
                      styles.detailLabel
                    }
                  >
                    Industry
                  </Text>

                  <Text
                    style={
                      styles.detailValue
                    }
                  >
                    {
                      business.industry
                    }
                  </Text>

                </View>

              </View>

              {/* BUSINESS TYPE */}
              <View
                style={
                  styles.detailRow
                }
              >

                <View
                  style={
                    styles.detailIcon
                  }
                >

                  <Building2
                    size={18}
                    color={
                      COLORS.textPrimary
                    }
                  />

                </View>

                <View style={styles.detailContent}>

                  <Text
                    style={
                      styles.detailLabel
                    }
                  >
                    Business Type
                  </Text>

                  <Text
                    style={
                      styles.detailValue
                    }
                  >
                    {
                      business.businessType
                    }
                  </Text>

                </View>

              </View>

              {/* ADDRESS */}
              <View
                style={[
                  styles.detailRow,

                  styles.detailLastRow,
                ]}
              >

                <View
                  style={
                    styles.detailIcon
                  }
                >

                  <MapPin
                    size={18}
                    color={
                      COLORS.textPrimary
                    }
                  />

                </View>

                <View style={styles.detailContent}>

                  <Text
                    style={
                      styles.detailLabel
                    }
                  >
                    Business Address
                  </Text>

                  <Text
                    style={
                      styles.detailValue
                    }
                  >
                    {
                      business.fullAddress
                    }
                  </Text>

                </View>

              </View>

            </View>

          </View>

          {/* CONTACT */}
          <View style={styles.section}>

            <Text style={styles.heading}>
              Contact Information
            </Text>

            <View style={styles.card}>

              {/* EMAIL */}
              <TouchableOpacity
                activeOpacity={0.85}

                onPress={async () => {

                  try {

                    setOpeningEmail(
                      true
                    );

                    await Linking.openURL(
                      `mailto:${business.email}`
                    );

                  } finally {

                    setOpeningEmail(
                      false
                    );

                  }

                }}

                style={
                  styles.contactRow
                }
              >

                <Mail
                  size={18}
                  color={
                    COLORS.textPrimary
                  }
                />

                <Text
                  style={
                    styles.contactText
                  }
                >

                  {openingEmail
                    ? "Opening email..."
                    : business.email}

                </Text>

              </TouchableOpacity>

              {/* WEBSITE */}
              <TouchableOpacity
                activeOpacity={0.85}

                onPress={async () => {

                  try {

                    setOpeningWebsite(
                      true
                    );

                    await Linking.openURL(
                      `https://${business.website}`
                    );

                  } finally {

                    setOpeningWebsite(
                      false
                    );

                  }

                }}

                style={
                  styles.contactRow
                }
              >

                <Globe
                  size={18}
                  color={
                    COLORS.textPrimary
                  }
                />

                <Text
                  style={
                    styles.contactText
                  }
                >

                  {openingWebsite
                    ? "Opening website..."
                    : business.website}

                </Text>

              </TouchableOpacity>

            </View>

          </View>

          {/* STATS */}
          <View style={styles.section}>

            <Text style={styles.heading}>
              Business Stats
            </Text>

            <BusinessStatsRow
              catalogCount={
                business.catalogCount
              }

              responseRate={
                business.responseRate
              }

              yearsActive={
                business.yearsActive
              }
            />

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

  content: {
    padding: SPACING.lg,

    paddingBottom:
      SPACING.xxxl,

    gap: SPACING.xl,
  },

  headerCard: {
    borderRadius: 30,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding: SPACING.xl,

    overflow: "hidden",
  },

  profileRow: {
    flexDirection: "row",

    alignItems: "center",

    flexWrap: "wrap",
  },

  profileImage: {
    width: 84,

    height: 84,

    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  businessInfo: {
    flex: 1,

    minWidth: 0,

    marginLeft:
      SPACING.lg,
  },

  businessName: {
    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  ownerName: {
    marginTop: 4,

    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  meta: {
    marginTop: 6,

    fontSize: 13,

    color:
      COLORS.textSecondary,
  },

  location: {
    marginTop: 4,

    fontSize: 13,

    color:
      COLORS.textSecondary,
  },

  bottomRow: {
    marginTop: SPACING.xl,
  },

  verifiedBadge: {
    height: 36,

    alignSelf: "flex-start",

    paddingHorizontal:
      SPACING.md,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    marginBottom:
      SPACING.lg,
  },

  verifiedText: {
    fontSize: 12,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  section: {
    gap: SPACING.lg,
  },

  heading: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  card: {
    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding: SPACING.xl,
  },

  description: {
    fontSize: 14,

    lineHeight: 28,

    color:
      COLORS.textSecondary,
  },

  detailRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginBottom:
      SPACING.lg,
  },

  detailLastRow: {
    marginBottom: 0,
  },

  detailIcon: {
    width: 44,

    height: 44,

    borderRadius: 16,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  detailValue: {
    marginTop: 4,

    fontSize: 15,

    lineHeight: 24,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  contactRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.md,

    paddingVertical:
      SPACING.md,
  },

  contactText: {
    flex: 1,

    fontSize: 14,

    lineHeight: 22,

    color:
      COLORS.textPrimary,
  },

  readMoreText: {
    marginTop:
      SPACING.md,

    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.accent,
  },
});