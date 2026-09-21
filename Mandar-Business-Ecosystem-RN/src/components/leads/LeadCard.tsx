import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";

import { useState } from "react";

import {
  Clock3,
  MapPin,
  Share2,
  X,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface LeadCardProps {

  personName: string;

  businessName: string;

  title: string;

  description: string;

  industry: string;

  location: string;

  postedTime: string;

  urgent?: boolean;

  bulk?: boolean;

  longTerm?: boolean;

  loading?: boolean;

  isOwner?: boolean;

  onQuoteNow?: () => void;

  onShare?: () => void;
}

export default function LeadCard({

  personName,
  businessName,
  title,
  description,
  industry,
  location,
  postedTime,
  urgent,
  bulk,
  longTerm,
  loading = false,
  isOwner,
  onQuoteNow,
  onShare,

}: LeadCardProps) {

  const [showFullView, setShowFullView] = useState(false);

  return (

    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.headerContent}>

          <Text
            numberOfLines={1}
            style={styles.personName}
          >

            {personName}

          </Text>

          <Text
            numberOfLines={1}
            style={styles.businessName}
          >

            {businessName}

          </Text>

        </View>

        <View style={styles.timeBadge}>

          <Clock3
            size={13}
            color={COLORS.accent}
          />

          <Text style={styles.timeText}>

            {postedTime}

          </Text>

        </View>

      </View>

      {/* TITLE */}
      <Text
        numberOfLines={2}
        style={styles.title}
      >

        {title}

      </Text>

      {/* DESCRIPTION */}
      <View>
        <Text
          numberOfLines={3}
          style={styles.description}
        >
          {description}
        </Text>
        {description.length > 120 && (
          <TouchableOpacity onPress={() => setShowFullView(true)} style={{ marginTop: 6 }}>
            <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 13 }}>Read More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* TAGS */}
      {(urgent || bulk || longTerm) && (

        <View style={styles.tagsRow}>

          {urgent && (

            <View
              style={[
                styles.tag,
                styles.urgentTag,
              ]}
            >

              <Text
                style={[
                  styles.tagText,
                  styles.urgentText,
                ]}
              >

                Urgent

              </Text>

            </View>

          )}

          {bulk && (

            <View style={styles.tag}>

              <Text style={styles.tagText}>

                Bulk Requirement

              </Text>

            </View>

          )}

          {longTerm && (

            <View style={styles.tag}>

              <Text style={styles.tagText}>

                Long-Term

              </Text>

            </View>

          )}

        </View>

      )}

      {/* META */}
      <View style={styles.metaSection}>

        {/* INDUSTRY */}
        <View style={styles.industryBadge}>

          <Text style={styles.industryText}>

            {industry}

          </Text>

        </View>

        {/* LOCATION */}
        <View style={styles.locationRow}>

          <MapPin
            size={15}
            color={COLORS.textSecondary}
          />

          <Text style={styles.locationText}>

            {location}

          </Text>

        </View>

      </View>

      {/* ACTIONS */}
      <View style={styles.actionsRow}>

        {/* QUOTE */}
        {!isOwner && (
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={loading}
            onPress={onQuoteNow}
            style={[
              styles.quoteButton,
              loading && styles.disabledButton,
            ]}
          >
            <Text style={styles.quoteText}>
              {loading ? "Opening..." : "Send Quote"}
            </Text>
          </TouchableOpacity>
        )}

        {/* SHARE */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onShare}
          style={styles.shareButton}
        >
          <Share2
            size={18}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={showFullView} animationType="slide" transparent={true} onRequestClose={() => setShowFullView(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.fullViewContainer}>
            <View style={styles.fullViewHeader}>
              <Text style={styles.fullViewTitle}>Lead Details</Text>
              <TouchableOpacity onPress={() => setShowFullView(false)} style={styles.closeButton}>
                <X size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.fullViewScroll}>
              <Text style={styles.title}>{title}</Text>
              
              <View style={[styles.header, { marginTop: 16 }]}>
                <View style={styles.headerContent}>
                  <Text style={styles.personName}>{personName}</Text>
                  <Text style={styles.businessName}>{businessName}</Text>
                </View>
                <View style={styles.timeBadge}>
                  <Clock3 size={13} color={COLORS.accent} />
                  <Text style={styles.timeText}>{postedTime}</Text>
                </View>
              </View>

              <Text style={[styles.description, { marginTop: 16 }]}>{description}</Text>
              
              <View style={[styles.metaSection, { marginTop: 24 }]}>
                <View style={styles.industryBadge}>
                  <Text style={styles.industryText}>{industry}</Text>
                </View>
                <View style={styles.locationRow}>
                  <MapPin size={15} color={COLORS.textSecondary} />
                  <Text style={styles.locationText}>{location}</Text>
                </View>
              </View>
              
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 32,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding: SPACING.xl,
  },

  header: {
    flexDirection: "row",

    alignItems: "flex-start",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.lg,
  },

  headerContent: {
    flex: 1,

    paddingRight:
      SPACING.md,
  },

  personName: {
    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  businessName: {
    marginTop: 5,

    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  timeBadge: {
    height: 34,

    paddingHorizontal:
      SPACING.md,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,
  },

  timeText: {
    fontSize: 11,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  title: {
    fontSize: 20,

    lineHeight: 30,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  description: {
    marginTop:
      SPACING.md,

    fontSize:
      TYPOGRAPHY.body,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

  tagsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,

    marginTop:
      SPACING.lg,
  },

  tag: {
    height: 34,

    paddingHorizontal:
      SPACING.md,

    borderRadius: 999,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  urgentTag: {
    backgroundColor:
      "#fde8e8",
  },

  tagText: {
    fontSize: 11,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  urgentText: {
    color: "#dc2626",
  },

  metaSection: {
    marginTop:
      SPACING.xl,

    gap: SPACING.md,
  },

  industryBadge: {
    alignSelf: "flex-start",

    height: 34,

    paddingHorizontal:
      SPACING.md,

    borderRadius: 999,

    backgroundColor:
      "#f6ead7",

    alignItems: "center",

    justifyContent: "center",
  },

  industryText: {
    fontSize: 12,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,
  },

  locationText: {
    flex: 1,

    fontSize: 13,

    lineHeight: 20,

    color:
      COLORS.textSecondary,
  },

  actionsRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.sm,

    marginTop:
      SPACING.xl,
  },

  quoteButton: {
    flex: 1,

    height: 54,

    borderRadius: 20,

    backgroundColor:
      COLORS.primary,

    alignItems: "center",

    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.7,
  },

  quoteText: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.white,
  },

  shareButton: {
    width: 54,

    height: 54,

    borderRadius: 20,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  fullViewContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "85%",
  },
  fullViewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  fullViewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  fullViewScroll: {
    padding: SPACING.xl,
  },
});