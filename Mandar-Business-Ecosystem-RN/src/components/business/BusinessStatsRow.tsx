import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface BusinessStatsRowProps {

  catalogCount: number;

  responseRate: string;

  yearsActive: string;
}

interface StatCardProps {

  label: string;

  value: string | number;
}

function StatCard({

  label,

  value,

}: StatCardProps) {

  return (
    <View style={styles.statCard}>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>

    </View>
  );
}

export default function BusinessStatsRow({

  catalogCount,

  responseRate,

  yearsActive,

}: BusinessStatsRowProps) {

  return (
    <View style={styles.container}>

      <StatCard
        label="Products"
        value={catalogCount}
      />

      <StatCard
        label="Response"
        value={responseRate}
      />

      <StatCard
        label="Active Years"
        value={yearsActive}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",

    gap: SPACING.md,
  },

  statCard: {
    flex: 1,

    minHeight: 108,

    borderRadius: 22,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingVertical:
      SPACING.lg,

    paddingHorizontal:
      SPACING.md,

    alignItems: "center",

    justifyContent: "center",
  },

  value: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  label: {
    marginTop: SPACING.xs,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },
});