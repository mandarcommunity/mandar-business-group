import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  UserCheck,
  Baby,
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
    icon: Database,

    title:
      "Information We Collect",

    content: [

      "Full Name",

      "Mobile Number",

      "Email Address",

      "Business Information",

      "Verification Documents",

      "Product, Catalog and Advertisement Data",

      "Feedback and Support Information",
    ],
  },

  {
    icon: Eye,

    title:
      "How We Use Information",

    content: [

      "Account creation and login authentication",

      "Business verification and trust management",

      "Platform security and fraud prevention",

      "Improving platform experience and business networking",

      "Customer support and communication",
    ],
  },

  {
    icon: UserCheck,

    title:
      "Data Sharing",

    content: [

      "Paxzillion Solutions LLP does not sell user personal data to third parties",

      "Certain business details may be visible publicly within the business ecosystem",

      "Verification documents are used only for verification and security purposes",
    ],
  },

  {
    icon: Lock,

    title:
      "Security",

    content: [

      "Reasonable security measures are used to protect user data",

      "Users are responsible for maintaining account security and protecting login credentials",

      "Unauthorized access, abuse or misuse of the platform is prohibited",
    ],
  },

  {
    icon: ShieldCheck,

    title:
      "User Rights",

    content: [

      "Users may request profile updates or account deletion",

      "Users may contact support for data related concerns",

      "Users may stop using the platform at any time",
    ],
  },

  {
    icon: Baby,

    title:
      "Children’s Privacy",

    content: [

      "This platform is not intended for users under 18 years of age",
    ],
  },

  {
    icon: Mail,

    title:
      "Contact Information",

    content: [

      "For privacy or policy related queries contact:",

      "support@paxzillionsolutions.com",

      "Last Updated: June 2026",
    ],
  },

];

export default function PrivacyPolicyScreen() {

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

          Privacy Policy

        </Text>

        <Text
          style={
            styles.headerSubtitle
          }
        >

          How we collect, use and
          protect your data.

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

        {/* INTRO */}
        <View style={styles.heroCard}>

          <View
            style={
              styles.heroIcon
            }
          >

            <ShieldCheck
              size={28}
              color={COLORS.accent}
            />

          </View>

          <Text
            style={
              styles.heroTitle
            }
          >

            Your Privacy Matters

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

            This Privacy Policy
            explains how user data is
            collected, used and
            protected while using the
            platform.

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

                {/* CONTENT */}
                <View
                  style={
                    styles.pointsWrapper
                  }
                >

                  {section.content.map(
                    (
                      item,
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

                          {item}

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