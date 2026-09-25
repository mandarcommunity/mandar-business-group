import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Linking,
  Share,
  Alert,
  ToastAndroid,
} from "react-native";

import {
  useMemo,
  useState,
  useCallback,
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

import DirectoryCard from "../components/directory/DirectoryCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import { COLORS, SPACING } from "../theme";
import { getSavedBusinesses } from "../services/business.service";
import { getAccessToken, getBookmarkedBusinesses, saveBookmarkedBusinesses } from "../utils/storage";
import { useFocusEffect } from "@react-navigation/native";

export default function SavedBusinessesScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [savedBusinesses, setSavedBusinesses] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchSavedDirectory = async () => {
    try {
      const token = await getAccessToken();
      
      
      const bookmarks = await getBookmarkedBusinesses();
        setSavedBusinesses(bookmarks);
        const idsToFetch = Object.keys(bookmarks).filter(id => bookmarks[id]);
      if (idsToFetch.length === 0) {
        setBusinesses([]);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }
      
      const res = await getSavedBusinesses(idsToFetch, token as string);
      const mappedBusinesses = (res.data || []).map((b: any) => ({
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
      }));
      setBusinesses(mappedBusinesses);
      
      setHasError(false);
    } catch (error: any) {
      console.log("Error fetching saved directory:", error.response?.data || error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedDirectory();
    }, [])
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchSavedDirectory();
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

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(
      (business) => {
        if (!savedBusinesses[business.id]) return false;

        const searchValue = search.toLowerCase();
        return (
          business.businessName.toLowerCase().includes(searchValue) ||
          business.personName.toLowerCase().includes(searchValue) ||
          business.industry.toLowerCase().includes(searchValue) ||
          business.location.toLowerCase().includes(searchValue)
        );
      }
    );
  }, [search, businesses, savedBusinesses]);

/* LOADING */
if (isLoading) {

return (

  <SafeAreaView
    edges={["top"]}
    style={styles.container}
  >

    <LoadingState
      title="Loading saved businesses..."
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

      <Text style={styles.headerTitle}>
        Saved Businesses
      </Text>

    </View>

  </View>

  {/* CONTENT */}
  <View style={styles.contentWrapper}>

    <ScrollView
      showsVerticalScrollIndicator={false}
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

          placeholder="Search saved businesses..."

          placeholderTextColor={
            COLORS.textMuted
          }

          style={styles.searchInput}
        />

      </View>

      {/* RESULTS */}
      {!!filteredBusinesses.length && (

        <Text
          style={
            styles.resultsText
          }
        >

          {
            filteredBusinesses.length
          } saved businesses

        </Text>

      )}

      {/* EMPTY */}
      {!filteredBusinesses.length ? (

        <View
          style={
            styles.emptyWrapper
          }
        >

          <EmptyState
            title="No saved businesses"

            description="Saved businesses will appear here for quick access."
          />

        </View>

      ) : (

        <View
          style={
            styles.cardsWrapper
          }
        >

          {filteredBusinesses.map((business) => (
              <DirectoryCard
                key={business.id}
                image={business.image}
                personName={business.personName}
                businessName={business.businessName}
                industry={business.industry}
                location={business.location}
                verified={business.verified}
                saved={savedBusinesses[business.id]}
                description={business.description}
                onBookmark={() => toggleBookmark(business.id)}
                onShare={() => handleShare(business)}
                onWhatsapp={() => handleWhatsapp(business.whatsapp)}
                onCall={() => handleCall(business.phone)}
              />
          ))}

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

searchBar: {
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

marginBottom:
  0,

},

searchInput: {
flex: 1,

fontSize: 14,

color:
  COLORS.textPrimary,

},

resultsText: {
  fontSize: 13,

  fontWeight: "600",

  color:
    COLORS.textSecondary,

  marginTop: SPACING.xs,
},

cardsWrapper: {
gap: SPACING.lg,
},

emptyWrapper: {
  paddingTop:
    SPACING.xxxl,
},
});