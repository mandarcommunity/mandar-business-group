import {
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
View,
Share,
} from "react-native";

import {
useEffect,
useState,
} from "react";

import { getMyRequirements, deleteRequirement, updateRequirementStatus } from "../services/requirement.service";
import { getAccessToken } from "../utils/storage";

import {
ArrowLeft,
Plus,
} from "lucide-react-native";

import {
useNavigation,
useFocusEffect,
} from "@react-navigation/native";
import { useCallback } from "react";

import {
SafeAreaView,
} from "react-native-safe-area-context";

import RequirementCard from "../components/requirements/RequirementCard";

import RequirementUsageCard from "../components/requirements/RequirementUsageCard";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
COLORS,
SPACING,
} from "../theme";

const initialRequirements = [
{
id: "1",

title:
  "Packaging Box Supplier Needed",

industry:
  "Packaging",

postedTime:
  "2h ago",

expiryText:
  "Expires in 12 days",

status:
  "Active" as const,

description:
  "Need corrugated packaging boxes for textile business operations in Surat.",

},

{
id: "2",

title:
  "Cotton Fabric Wholesaler Required",

industry:
  "Textile",

postedTime:
  "1 day ago",

expiryText:
  "Requirement fulfilled",

status:
  "Fulfilled" as const,

description:
  "Looking for cotton fabric wholesalers for bulk textile manufacturing.",

},
];

export default function MyRequirementsScreen() {

const navigation =
useNavigation<any>();

const [
requirements,

setRequirements,

] = useState<any[]>([]);

const [
isLoading,
setIsLoading,
] = useState(true);

const [
hasError,
setHasError,
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

const [
fulfillingId,

setFulfillingId,

] = useState<string | null>(
null
);

const fetchRequirements = async () => {
  try {
    setIsLoading(true);
    const token = await getAccessToken();
    const res = await getMyRequirements(token as string);
    const formattedReqs = res.data.data.map((req: any) => {
      const createdDate = new Date(req.created_at);
      const expiryDate = new Date(createdDate);
      expiryDate.setDate(expiryDate.getDate() + 30);
      const now = new Date();
      const diffTime = expiryDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let expiryText = "";
      if (req.status === "Active") {
        if (daysLeft > 0) {
          expiryText = `Expires in ${daysLeft} days`;
        } else if (daysLeft === 0) {
          expiryText = "Expires today";
        } else {
          expiryText = "Expired";
        }
      }
      return { ...req, expiryText };
    });
    setRequirements(formattedReqs);
  } catch (err) {
    console.log(err);
    setHasError(true);
  } finally {
    setIsLoading(false);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchRequirements();
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
      title="Loading requirements..."
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
      title="Unable to load requirements"

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
        My Requirements
      </Text>

    </View>

    {/* POST BUTTON */}
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
          "CreateRequirement"
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

  {/* CONTENT WRAPPER */}
  <View style={styles.contentWrapper}>

    <ScrollView
      showsVerticalScrollIndicator={
        false
      }

      contentContainerStyle={
        styles.contentContainer
      }
    >

      {/* USAGE CARD */}
      <RequirementUsageCard
        used={
          requirements.length
        }

        limit={5}
      />

      {/* EMPTY */}
      {!requirements.length ? (

        <View
          style={
            styles.emptyWrapper
          }
        >

          <EmptyState
            title="No requirements posted"

            description="Post your first requirement to start getting business leads."
          />

        </View>

      ) : (

        <>
          {/* REQUIREMENTS */}
          {requirements.map(
            (
              requirement
            ) => (

              <RequirementCard
                key={
                  requirement.id
                }
                image={
                  requirement.image_url
                }

                title={
                  requirement.title
                }

                industry={
                  requirement.industries?.join(", ") || "General"
                }

                postedTime={
                  new Date(requirement.created_at).toLocaleDateString()
                }

                expiryText={
                  requirement.expiryText || ""
                }

                status={
                  requirement.status
                }

                description={
                  requirement.description
                }

                onShare={async () => {
                  try {
                    await Share.share({ message: `I have a requirement for ${requirement.title} on Mandar Community Ecosystem.\n\nhttps://mandarcommunity.in/req/${requirement.slug || requirement.id}` });
                  } catch (error) {
                    console.error("Share error:", error);
                  }
                }}

                onEdit={() =>
                  navigation.navigate(
                    "EditRequirement",
                    { requirement }
                  )
                }

                onDelete={async () => {

                  setDeletingId(
                    requirement.id
                  );

                  try {
                    const token = await getAccessToken();
                    await deleteRequirement(token as string, requirement.id);
                    setRequirements(
                      (prev) =>
                        prev.filter(
                          (
                            item
                          ) =>
                            item.id !==
                            requirement.id
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

                onFulfilled={async () => {

                  setFulfillingId(
                    requirement.id
                  );

                  try {
                    const token = await getAccessToken();
                    await updateRequirementStatus(token as string, requirement.id, "Fulfilled");
                    
                    setRequirements(
                      (prev) =>
                        prev.map(
                          (
                            item
                          ) => {

                            if (
                              item.id ===
                              requirement.id
                            ) {

                              return {

                                ...item,

                                status:
                                  "Fulfilled" as const,
                              };
                            }

                            return item;
                          }
                        )
                    );
                  } catch (err) {
                    console.log(err);
                  } finally {
                    setFulfillingId(
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
                styles.actionText
              }
            >

              Removing requirement...

            </Text>

          )}

          {fulfillingId && (

            <Text
              style={
                styles.actionText
              }
            >

              Updating requirement status...

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

color:
  COLORS.white,

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

actionText: {
textAlign: "center",

fontSize: 12,

fontWeight: "600",

color:
  COLORS.textSecondary,

marginTop:
  SPACING.sm,

},
});