import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
  Alert,
} from "react-native";

import {
  ArrowLeft,
  MessageCircleMore,
  MapPin,
  BadgeCheck,
  Share2,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import { useEffect, useState } from "react";
import { getBusinessById } from "../services/business.service";
import { getBusinessProducts } from "../services/product.service";
import { getAccessToken, getUser } from "../utils/storage";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import CatalogProductCard from "../components/explore/CatalogProductCard";
import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";

export default function BusinessCatalogScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const businessId = route.params?.businessId;

  const [shared, setShared] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [business, setBusiness] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!businessId) {
        setHasError(true);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const token = await getAccessToken();
        const user = await getUser();
        
        const businessRes = await getBusinessById(businessId, token as string);
        const productsRes = await getBusinessProducts(token as string, businessId);
        
        console.log("CATALOG BUSINESS RES:", JSON.stringify(businessRes));
        
        const data = businessRes.data;
        setBusiness({
          id: data.id,
          isOwner: user?.id === data.user_id,
          businessName: data.business_name || "",
          ownerName: data.contact_person || data.user?.full_name || "",
          industry: data.industries?.join(", ") || "",
          city: data.city || "",
          state: data.state || "",
          location: data.city && data.state ? `${data.city}, ${data.state}` : data.city || data.state || "",
          description: data.description || "",
          profileImage: data.profile_image || "",
          verified: data.verified || false,
        });
        
        setProducts(productsRes.data.data || []);
      } catch (error) {
        console.log("Error fetching business catalog:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [businessId]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        edges={["top"]}
        style={styles.container}
      >

        <LoadingState
          title="Loading catalog..."
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
          title="Unable to load catalog"

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

              {business.businessName}

            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >

              Business catalog and product showcase.

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

          contentContainerStyle={
            styles.content
          }
        >

          {/* BUSINESS HEADER */}
          <View style={styles.businessCard}>

            {/* TOP */}
            <View style={styles.businessTop}>

              <View style={styles.logoWrapper}>
                {business.profileImage ? (
                  <Image
                    source={{ uri: business.profileImage }}
                    style={{ width: "100%", height: "100%", borderRadius: 32 }}
                  />
                ) : (
                  <Text style={styles.logoText}>
                    {business.businessName
                      ? business.businessName.charAt(0).toUpperCase()
                      : "?"}
                  </Text>
                )}
              </View>

              <View style={styles.businessInfo}>

                <View
                  style={styles.nameRow}
                >

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

                  {business.verified && (

                    <BadgeCheck
                      size={17}
                      color="#2E8B57"
                    />

                  )}

                </View>

                <Text
                  style={styles.ownerName}
                >

                  by {business.ownerName}

                </Text>

                <View
                  style={
                    styles.locationRow
                  }
                >

                  <MapPin
                    size={14}
                    color={
                      COLORS.textSecondary
                    }
                  />

                  <Text
                    numberOfLines={1}
                    style={
                      styles.location
                    }
                  >

                    {
                      business.location
                    }

                  </Text>

                </View>

              </View>

            </View>

            {/* DESCRIPTION */}
            <View>
              <Text 
                style={styles.description}
                numberOfLines={isDescriptionExpanded ? undefined : 3}
              >
                {business.description}
              </Text>
              {business.description && business.description.length > 100 && (
                <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                  <Text style={{ color: COLORS.primary, marginTop: 4, fontFamily: TYPOGRAPHY.medium }}>
                    {isDescriptionExpanded ? "Read less" : "Read more"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* ACTIONS */}
            <View style={styles.actionsRow}>

              {/* CHAT */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  if (business.isOwner) {
                    Alert.alert("Notice", "You cannot chat with yourself.");
                    return;
                  }
                  setChatting(true);
                  navigation.navigate("Chats");
                }}
                style={[
                  styles.primaryAction,
                  chatting && styles.activeButton,
                ]}
              >
                <MessageCircleMore
                  size={18}
                  color={COLORS.white}
                />
                <Text style={styles.primaryActionText}>
                  Chat
                </Text>
              </TouchableOpacity>

              {/* SHARE */}
              <TouchableOpacity
                activeOpacity={0.85}

                onPress={async () => {
                  setShared(true);
                  try {
                    await Share.share({ message: `Check out the product "${item.name}" on Mandar Community Ecosystem!\n\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });
                  } catch (error) {
                    console.log(error);
                  }
                  setTimeout(() => setShared(false), 2000);
                }}

                style={[
                  styles.secondaryAction,
                  shared && styles.activeButton,
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

          {/* PRODUCTS */}
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>

              Product Catalog

            </Text>

            {!products.length ? (

              <EmptyState
                title="No products added"

                description="Products added by this business will appear here."
              />

            ) : (

              <View style={styles.productsList}>

                {products.map(
                  (product) => (

                    <CatalogProductCard
                      key={product.id}
                      image={
                        product.images?.[0] || product.image
                      }
                      images={
                        product.images
                      }
                      name={
                        product.name
                      }
                      description={
                        product.description
                      }
                      onChatPress={() => {
                        if (business.isOwner) {
                          Alert.alert("Notice", "You cannot chat with yourself.");
                          return;
                        }
                        navigation.navigate("Chats");
                      }}
                      onSharePress={async () => {
                        try {
                          await Share.share({ message: `Check out the product "${item.name}" on Mandar Community Ecosystem!\n\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });
                        } catch (error: any) {
                          Alert.alert(error.message);
                        }
                      }}
                    />

                  )
                )}

              </View>

            )}

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

  businessCard: {
    borderRadius: 30,

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

  businessTop: {
    flexDirection: "row",

    alignItems: "center",
  },

  logoWrapper: {
    width: 78,

    height: 78,

    borderRadius: 26,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  logoText: {
    fontSize: 28,

    fontWeight: "700",

    color: COLORS.accent,

    includeFontPadding:
      false,
  },

  businessInfo: {
    flex: 1,

    marginLeft: SPACING.lg,

    minWidth: 0,
  },

  nameRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  businessName: {
    flex: 1,

    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  ownerName: {
    marginTop: 4,

    fontSize:
      TYPOGRAPHY.caption,

    fontWeight: "600",

    color: COLORS.accent,

    includeFontPadding:
      false,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  location: {
    flex: 1,

    marginLeft: 5,

    fontSize:
      TYPOGRAPHY.caption,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  description: {
    marginTop: SPACING.xl,

    fontSize:
      TYPOGRAPHY.body,

    lineHeight: 22,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  actionsRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: SPACING.xl,

    gap: SPACING.sm,
  },

  primaryAction: {
    flex: 1,

    minHeight: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.accent,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    paddingHorizontal:
      SPACING.lg,
  },

  primaryActionText: {
    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "700",

    color: COLORS.white,

    includeFontPadding:
      false,
  },

  secondaryAction: {
    width: 52,

    height: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },

  activeButton: {
    borderColor:
      COLORS.accent,
  },

  section: {
    marginBottom:
      SPACING.xl,
  },

  sectionTitle: {
    fontSize:
      TYPOGRAPHY.heading,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,

    includeFontPadding:
      false,
  },

  productsList: {
    gap: SPACING.lg,
  },
});