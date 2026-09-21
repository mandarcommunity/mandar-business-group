import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import VerificationStatusCard
from "../components/verification/VerificationStatusCard";

import VerificationBenefits
from "../components/verification/VerificationBenefits";

import PrimaryButton
from "../components/shared/PrimaryButton";

import LoadingState
from "../components/states/LoadingState";

import ErrorState
from "../components/states/ErrorState";

import EmptyState
from "../components/states/EmptyState";

import {
  dummyBusinesses,
} from "../data/dummyBusinesses";

import {
  COLORS,
  SPACING,
} from "../theme";

import { getBusinessById } from "../services/business.service";
import { getAccessToken } from "../utils/storage";

export default function VerificationStatusScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const businessId =
    route.params?.businessId;

  const [
    isLoading,
    setIsLoading
  ] = useState(true);

  const [
    hasError,
    setHasError
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [business, setBusiness] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchBusiness = async () => {
        try {
          setIsLoading(true);
          const token = await getAccessToken();
          const res = await getBusinessById(businessId, token as string);
          
          const data = res.data;
          if (data) {
            let status = data.verification_status || "unverified";
            
            // Map our DB statuses to what the UI expects if they differ.
            // Expected UI statuses usually are "verified", "pending", "rejected", "not_verified"
            if (status === "unverified") status = "not_verified";
            
            setBusiness({
              ...data,
              verificationStatus: status,
              rejectionReason: data.verification_rejection_reason || null
            });
          }
          setHasError(false);
        } catch (err) {
          console.error("Error fetching business verification:", err);
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      };

      if (businessId) {
        fetchBusiness();
      } else {
        setIsLoading(false);
      }
    }, [businessId])
  );

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading verification status..."
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
          title="Something went wrong"

          description="Unable to fetch business verification status."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
  }

  /* EMPTY */
  if (!business) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <EmptyState
          title="Business not found"

          description="The selected business does not exist or may have been removed."
        />

      </SafeAreaView>

    );
  }

  const verificationStatus = business.verificationStatus || "unverified";
  const isVerified = verificationStatus === "verified";
  const isPending = verificationStatus === "pending";
  const isRejected = verificationStatus === "rejected";
  const isNotVerified = verificationStatus === "unverified" || verificationStatus === "not_verified";

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

          <View style={styles.headerTextWrapper}>

            <Text
              numberOfLines={1}

              style={
                styles.headerTitle
              }
            >

              Business Verification

            </Text>

            <Text
              numberOfLines={1}

              style={
                styles.headerSubtitle
              }
            >

              Build trust through verified identity

            </Text>

          </View>

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

          contentContainerStyle={
            styles.content
          }
        >

          {/* STATUS */}
          <VerificationStatusCard
            status={
              verificationStatus
            }
          />

          {/* BENEFITS */}
          <View style={styles.section}>

            <Text
              style={
                styles.heading
              }
            >

              Verification Benefits

            </Text>

            <VerificationBenefits />

          </View>

          {/* NOTE */}
          <View
            style={
              styles.noteCard
            }
          >

            <Text
              style={
                styles.noteTitle
              }
            >

              Verification Review

            </Text>

            <Text
              style={
                styles.noteText
              }
            >

              Verification requests are
              manually reviewed to
              maintain trust and
              authenticity across the
              business ecosystem.

            </Text>

          </View>

          {/* PENDING */}
          {isPending && (

            <View
              style={
                styles.pendingCard
              }
            >

              <Text
                style={
                  styles.pendingTitle
                }
              >

                Verification Under Review

              </Text>

              <Text
                style={
                  styles.pendingText
                }
              >

                Your submitted
                documents are currently
                being reviewed by our
                team. Verification
                usually takes 24-48
                hours.

              </Text>

            </View>

          )}

          {/* VERIFIED */}
          {isVerified && (

            <View
              style={
                styles.verifiedCard
              }
            >

              <Text
                style={
                  styles.verifiedTitle
                }
              >

                Business Verified

              </Text>

              <Text
                style={
                  styles.verifiedText
                }
              >

                Your business is now
                verified and trusted
                within the community
                ecosystem.

              </Text>

            </View>

          )}

          {/* REJECTED */}
          {isRejected && (

            <View
              style={
                styles.rejectedCard
              }
            >

              <Text style={styles.rejectedTitle}>
                Verification Rejected
              </Text>
              <Text style={styles.rejectedText}>
                Unfortunately, your verification request was declined.
              </Text>
              {business.rejectionReason && (
                <View style={{ marginTop: 10, padding: 10, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: 8 }}>
                  <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>Reason for Rejection:</Text>
                  <Text style={{ color: '#d32f2f', marginTop: 4 }}>{business.rejectionReason}</Text>
                </View>
              )}
            </View>

          )}

          {/* ACTION */}
          {(isNotVerified || isRejected) && (
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                text={
                  isRejected
                    ? "Re-apply for Verification"
                    : "Get Verified"
                }
                onPress={() =>
                  navigation.navigate(
                    "VerificationSubmission",
                    { businessId: business.id }
                  )
                }
              />
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

  headerTextWrapper: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  headerSubtitle: {
    marginTop: 2,

    fontSize: 12,

    color:
      "rgba(255,255,255,0.72)",
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
    padding:
      SPACING.lg,

    paddingBottom:
      SPACING.xxxl,
  },

  section: {
    marginTop:
      SPACING.xxxl,
  },

  heading: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,
  },

  noteCard: {
    marginTop:
      SPACING.xxxl,

    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  noteTitle: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.sm,
  },

  noteText: {
    fontSize: 13,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

  pendingCard: {
    marginTop:
      SPACING.xxxl,

    borderRadius: 28,

    backgroundColor:
      "#fff8e8",

    borderWidth: 1,

    borderColor:
      "#facc15",

    padding:
      SPACING.xl,
  },

  pendingTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#a16207",

    marginBottom:
      SPACING.sm,
  },

  pendingText: {
    fontSize: 13,

    lineHeight: 24,

    color: "#854d0e",
  },

  verifiedCard: {
    marginTop:
      SPACING.xxxl,

    borderRadius: 28,

    backgroundColor:
      "#ecfdf3",

    borderWidth: 1,

    borderColor:
      "#22c55e",

    padding:
      SPACING.xl,
  },

  verifiedTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#15803d",

    marginBottom:
      SPACING.sm,
  },

  verifiedText: {
    fontSize: 13,

    lineHeight: 24,

    color: "#166534",
  },

  rejectedCard: {
    marginTop:
      SPACING.xxxl,

    borderRadius: 28,

    backgroundColor:
      "#fef2f2",

    borderWidth: 1,

    borderColor:
      "#ef4444",

    padding:
      SPACING.xl,
  },

  rejectedTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#b91c1c",

    marginBottom:
      SPACING.sm,
  },

  rejectedText: {
    fontSize: 13,

    lineHeight: 24,

    color: "#991b1b",
  },

  buttonWrapper: {
    marginTop:
      SPACING.xxxl,
  },

});