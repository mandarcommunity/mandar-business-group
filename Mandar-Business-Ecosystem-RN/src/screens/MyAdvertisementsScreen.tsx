import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from "react-native";

import {
  useState,
  useCallback,
} from "react";

import { getMyAdvertisements, deleteAdvertisement } from "../services/advertisement.service";
import { getAccessToken } from "../utils/storage";

import {
ArrowLeft,
Plus,
} from "lucide-react-native";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
SafeAreaView,
} from "react-native-safe-area-context";

import AdvertisementCard from "../components/advertisements/AdvertisementCard";

import AdvertisementUsageCard from "../components/advertisements/AdvertisementUsageCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
COLORS,
SPACING,
} from "../theme";

// Removed initialAdvertisements

export default function MyAdvertisementsScreen() {

const navigation =
useNavigation<any>();

const [
  advertisements,
  setAdvertisements,
] = useState<any[]>([]);

const fetchAds = async () => {
  try {
    setIsLoading(true);
    const token = await getAccessToken();
    const res = await getMyAdvertisements(token as string);
    setAdvertisements(res.data.data.map((ad: any) => {
      const daysLeft = Math.ceil((new Date(ad.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      const expiryText = daysLeft > 0 ? `Expires in ${daysLeft} days` : daysLeft === 0 ? "Expires today" : "Expired";
      
      return {
        ...ad,
        id: ad.id,
        image: ad.image_url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        title: ad.title,
        industry: ad.industries?.join(", ") || "General",
        postedTime: new Date(ad.created_at).toLocaleDateString(),
        expiryText,
        status: ad.status,
        description: ad.description
      };
    }));
  } catch (err) {
    console.log(err);
    setHasError(true);
  } finally {
    setIsLoading(false);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchAds();
  }, [])
);

const [
  isLoading,
  setIsLoading
] = useState(false);

const [
  hasError,
  setHasError
] = useState(false);

const [
deletingId,

setDeletingId,

] = useState<string | null>(
null
);

const [
addPressed,

setAddPressed,

] = useState(false);

/* LOADING */
if (isLoading) {

return (

  <SafeAreaView
    edges={["top"]}
    style={styles.container}
  >

    <LoadingState
      title="Loading advertisements..."
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
      title="Unable to load advertisements"

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

    {/* LEFT */}
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
        My Advertisements
      </Text>

    </View>

    {/* CREATE BUTTON */}
    <TouchableOpacity
      activeOpacity={0.85}

      onPress={() => {

        setAddPressed(true);

        setTimeout(() => {

          setAddPressed(
            false
          );

        }, 180);

        navigation.navigate(
          "CreateAdvertisement"
        );
      }}

      style={[

        styles.addButton,

        addPressed &&
          styles.activeAddButton,

      ]}
    >

      <Plus
        size={20}
        color={COLORS.white}
      />

    </TouchableOpacity>

  </View>

  {/* CONTENT */}
  <View style={styles.contentWrapper}>

    <ScrollView
      showsVerticalScrollIndicator={
        false
      }

      contentContainerStyle={
        styles.contentContainer
      }
    >

      {/* USAGE */}
      <AdvertisementUsageCard
        used={
          advertisements.length
        }

        limit={3}
      />

      {/* EMPTY */}
      {!advertisements.length ? (

        <View
          style={
            styles.emptyWrapper
          }
        >

          <EmptyState
            title="No advertisements yet"

            description="Create your first advertisement to start promoting your business."
          />

        </View>

      ) : (

        <>
          {/* ADS */}
          {advertisements.map(
            (ad) => (

              <AdvertisementCard
                key={ad.id}

                image={ad.image}

                title={ad.title}

                industry={
                  ad.industry
                }

                postedTime={
                  ad.postedTime
                }

                expiryText={
                  ad.expiryText
                }

                status={
                  ad.status
                }

                description={
                  ad.description
                }

                onShare={async () => {
                  try {
                    await Share.share({
                      message: `Check out this advertisement: ${ad.title}`,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}

                onEdit={() =>
                  navigation.navigate(
                    "EditAdvertisement",
                    { ad }
                  )
                }

                onDelete={async () => {

                  setDeletingId(
                    ad.id
                  );

                  try {
                    const token = await getAccessToken();
                    await deleteAdvertisement(token as string, ad.id);
                    setAdvertisements(
                      (prev) =>
                        prev.filter(
                          (
                            item
                          ) =>
                            item.id !==
                            ad.id
                        )
                    );
                  } catch (err) {
                    console.log(err);
                  } finally {
                    setDeletingId(
                      null
                    );
                  }
                }}
              />

            )
          )}

          {deletingId && (

            <Text
              style={
                styles.deletingText
              }
            >

              Removing advertisement...

            </Text>

          )}

        </>

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
flexDirection: "row",

alignItems: "center",

justifyContent:
  "space-between",

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

addButton: {
width: 42,

height: 42,

borderRadius: 16,

backgroundColor:
  "rgba(255,255,255,0.12)",

alignItems: "center",

justifyContent: "center",

},

activeAddButton: {
transform: [
{
scale: 0.92,
},
],

opacity: 0.85,

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
  SPACING.lg,

gap: SPACING.md,

flexGrow: 1,

},

emptyWrapper: {
flex: 1,

justifyContent:
  "center",

paddingTop:
  SPACING.xxxl,

},

deletingText: {
textAlign: "center",

fontSize: 12,

fontWeight: "600",

color:
  COLORS.textSecondary,

marginTop:
  SPACING.sm,

},
});