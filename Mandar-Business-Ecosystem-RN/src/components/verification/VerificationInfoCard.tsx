import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Building2,
  BriefcaseBusiness,
  MapPin,
  User,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface VerificationInfoCardProps {

  businessName: string;

  ownerName: string;

  industry: string;

  businessType: string;

  address: string;
}

interface InfoRowProps {

  icon: any;

  label: string;

  value: string;
}

function InfoRow({

  icon: Icon,

  label,

  value,

}: InfoRowProps) {

  return (

    <View style={styles.infoRow}>

      {/* ICON */}
      <View style={styles.iconWrapper}>

        <Icon
          size={18}
          color={
            COLORS.textPrimary
          }
        />

      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        <Text style={styles.label}>

          {label}

        </Text>

        <Text
          style={styles.value}
        >

          {value}

        </Text>

      </View>

    </View>

  );
}

export default function VerificationInfoCard({

  businessName,

  ownerName,

  industry,

  businessType,

  address,

}: VerificationInfoCardProps) {

  return (

    <View style={styles.card}>

      <InfoRow
        icon={Building2}
        label="Business Name"
        value={businessName}
      />

      <InfoRow
        icon={User}
        label="Contact Person"
        value={ownerName}
      />

      <InfoRow
        icon={BriefcaseBusiness}
        label="Industry & Type"
        value={`${industry} • ${businessType}`}
      />

      <InfoRow
        icon={MapPin}
        label="Business Address"
        value={address}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginBottom:
      SPACING.xl,
  },

  iconWrapper: {
    width: 48,

    height: 48,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  content: {
    flex: 1,

    marginLeft:
      SPACING.lg,

    minWidth: 0,
  },

  label: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,

    lineHeight: 18,
  },

  value: {
    marginTop:
      SPACING.sm,

    fontSize: 15,

    lineHeight: 24,

    fontWeight: "600",

    color:
      COLORS.textPrimary,

    flexShrink: 1,
  },

});