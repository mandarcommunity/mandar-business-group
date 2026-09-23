import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Svg, {
  Circle,
} from "react-native-svg";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface RequirementUsageCardProps {
  used: number;

  limit: number;
}


  const getNextMonthDate = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);
    return nextMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

export default function RequirementUsageCard({
  used,
  limit,
}: RequirementUsageCardProps) {

  const remaining =
    limit - used;

  const progress =
    remaining / limit;

  const size = 74;

  const strokeWidth = 7;

  const radius =
    (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference *
    (1 - progress);

  const progressColor =
    progress === 0
      ? "#c0c0c0" // Grey for 0
      : progress >= 0.7
      ? "#2e8b57" // Green
      : progress >= 0.4
      ? "#d4a017" // Yellow
      : "#d44848"; // Red

  return (
    <View style={styles.card}>

      {/* LEFT */}
      <View style={styles.leftSection}>

        <Text style={styles.title}>
          Monthly Requirement Usage
        </Text>

        <Text style={styles.subtitle}>
          Your requirement limit resets on {getNextMonthDate()}.
        </Text>

        <Text style={styles.remainingText}>
          {remaining} of {limit} remaining
        </Text>

      </View>

      {/* PROGRESS RING */}
      <View style={styles.circleWrapper}>

        <Svg
          width={size}
          height={size}
        >

          {/* BACKGROUND */}
          <Circle
            stroke="#e9e4dc"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          {/* PROGRESS */}
          <Circle
            stroke={progressColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              strokeDashoffset
            }
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />

        </Svg>

        <View style={styles.circleContent}>

          <Text
            style={[
              styles.circleNumber,
              {
                color:
                  progressColor,
              },
            ]}
          >
            {remaining}/{limit}
          </Text>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.surface,

    borderRadius: 28,

    borderWidth: 1,

    borderColor: COLORS.border,

    padding: SPACING.lg,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  leftSection: {
    flex: 1,

    paddingRight: SPACING.lg,
  },

  title: {
    fontSize: 15,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 18,

    color: COLORS.textSecondary,
  },

  remainingText: {
    marginTop: SPACING.md,

    fontSize: 13,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  circleWrapper: {
    width: 74,

    height: 74,

    alignItems: "center",

    justifyContent: "center",
  },

  circleContent: {
    position: "absolute",

    alignItems: "center",

    justifyContent: "center",
  },

  circleNumber: {
    fontSize: 12,

    fontWeight: "800",
  },
});