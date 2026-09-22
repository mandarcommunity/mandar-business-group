import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Scale,
  BriefcaseBusiness,
  BadgeCheck,
  Users,
  Shield,
  Smartphone,
  Mail,
} from "lucide-react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  COLORS,
  SPACING,
} from "../theme";

const sections = [

  {
    icon: BriefcaseBusiness,

    title:
      "Business Responsibility",

    points: [

      "Businesses are responsible for the accuracy of all information shared on the platform",

      "Fake, misleading or fraudulent activities are strictly prohibited",

      "Businesses must only upload authentic products, services and business details",

      "Businesses are fully responsible for their transactions and communications with other users",
    ],
  },

  {
    icon: BadgeCheck,

    title:
      "Verification Policy",

    points: [

      "Verification badges are provided only after manual review",

      "Submission of documents does not guarantee approval",

      "Paxzillion Solutions LLP reserves the right to reject, suspend or remove verification at any time",

      "Fake verification submissions may result in account restriction or removal",
    ],
  },

  {
    icon: Users,

    title:
      "Community Guidelines",

    points: [

      "Respectful business communication is required at all times",

      "Spam, harassment, abuse or illegal activity is prohibited",

      "Users must not post harmful, offensive or misleading content",

      "Accounts violating platform policies may be suspended or permanently removed",
    ],
  },

  {
    icon: Shield,

    title:
      "Privacy & Data Usage",

    points: [

      "User information may be displayed within the business ecosystem",

      "Verification documents are used only for verification and security purposes",

      "Paxzillion Solutions LLP does not sell user personal data to third parties",

      "Users are responsible for maintaining account security and protecting login credentials",
    ],
  },

  {
    icon: Smartphone,

    title:
      "Account & Platform Access",

    points: [

      "Users must be at least 18 years old to use this platform",

      "The platform may be updated, modified or temporarily unavailable without prior notice",

      "Paxzillion Solutions LLP reserves the right to suspend or terminate accounts violating platform policies",
    ],
  },

  {
    icon: Mail,

    title:
      "Contact Information",

    points: [

      "For support, policy or legal related queries contact:",

      "support@mandarcommunity.in",

      "Last Updated: June 2026",
    ],
  },

];

export default function TermsConditionsScreen() {

  return (

    <SafeAreaView
      edges={["top"]}

      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <Text
          style={styles.headerTitle}
        >

          Terms & Conditions

        </Text>

        <Text
          style={
            styles.headerSubtitle
          }
        >

          Policies, responsibilities
          and community guidelines.

        </Text>

      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.content
        }
      >

        {/* HERO */}
        <View style={styles.heroCard}>

          <View
            style={
              styles.heroIcon
            }
          >

            <Scale
              size={28}
              color={COLORS.accent}
            />

          </View>

          <Text
            style={
              styles.heroTitle
            }
          >

            Platform Terms

          </Text>

          <Text
            style={
              styles.heroDescription
            }
          >

            Mandar Business is
            operated by Paxzillion
            Solutions LLP.

            {"\n\n"}

            By accessing and using
            this platform, users
            agree to follow all
            platform policies,
            business guidelines and
            applicable laws.

          </Text>

        </View>

        {/* SECTIONS */}
        {sections.map(
          (section) => {

            const Icon =
              section.icon;

            return (

              <View
                key={section.title}

                style={
                  styles.sectionCard
                }
              >

                {/* TOP */}
                <View
                  style={
                    styles.sectionTop
                  }
                >

                  <View
                    style={
                      styles.sectionIcon
                    }
                  >

                    <Icon
                      size={20}
                      color={
                        COLORS.accent
                      }
                    />

                  </View>

                  <Text
                    style={
                      styles.sectionTitle
                    }
                  >

                    {section.title}

                  </Text>

                </View>

                {/* POINTS */}
                <View
                  style={
                    styles.pointsWrapper
                  }
                >

                  {section.points.map(
                    (
                      point,
                      index
                    ) => (

                      <View
                        key={`${section.title}-${index}`}

                        style={
                          styles.pointRow
                        }
                      >

                        <View
                          style={
                            styles.bullet
                          }
                        />

                        <Text
                          style={
                            styles.pointText
                          }
                        >

                          {point}

                        </Text>

                      </View>

                    )
                  )}

                </View>

              </View>

            );
          }
        )}

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  header: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  headerSubtitle: {
    marginTop:
      SPACING.xs,

    fontSize: 13,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  content: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.sm,

    paddingBottom:
      SPACING.xxxl,
  },

  heroCard: {
    borderRadius: 30,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  heroIcon: {
    width: 72,

    height: 72,

    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  heroTitle: {
    marginTop:
      SPACING.lg,

    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  heroDescription: {
    marginTop:
      SPACING.md,

    fontSize: 14,

    lineHeight: 26,

    color:
      COLORS.textSecondary,
  },

  sectionCard: {
    marginTop:
      SPACING.xl,

    borderRadius: 28,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.xl,
  },

  sectionTop: {
    flexDirection: "row",

    alignItems: "center",
  },

  sectionIcon: {
    width: 50,

    height: 50,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.md,
  },

  sectionTitle: {
    flex: 1,

    fontSize: 17,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  pointsWrapper: {
    marginTop:
      SPACING.xl,

    gap:
      SPACING.lg,
  },

  pointRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  bullet: {
    width: 8,

    height: 8,

    borderRadius: 999,

    backgroundColor:
      COLORS.accent,

    marginTop: 8,

    marginRight:
      SPACING.md,
  },

  pointText: {
    flex: 1,

    fontSize: 13,

    lineHeight: 24,

    color:
      COLORS.textSecondary,
  },

});