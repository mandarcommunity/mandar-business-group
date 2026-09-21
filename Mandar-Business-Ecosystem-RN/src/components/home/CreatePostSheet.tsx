import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import BottomSheetModal from "../shared/BottomSheetModal";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface CreatePostSheetProps {
  visible: boolean;

  onClose: () => void;
}

export default function CreatePostSheet({
  visible,
  onClose,
}: CreatePostSheetProps) {

  const navigation = useNavigation<any>();

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
    >

      <Text style={styles.title}>
        Create Post
      </Text>

      <Text style={styles.subtitle}>
        Choose what you would like to post.
      </Text>

      <View style={styles.actions}>

        {/* REQUIREMENT */}
        <Pressable
          style={styles.card}

          onPress={() => {

            onClose();

setTimeout(() => {

  navigation.navigate(
    "CreateRequirement"
  );

}, 200);
          }}
        >

          <Text style={styles.cardTitle}>
            Requirement
          </Text>

          <Text style={styles.cardSubtitle}>
            Find suppliers, services or business opportunities.
          </Text>

        </Pressable>

        {/* ADVERTISEMENT */}
        <Pressable
          style={styles.card}

          onPress={() => {

            onClose();

setTimeout(() => {

  navigation.navigate(
    "CreateAd"
  );

}, 200);
          }}
        >

          <Text style={styles.cardTitle}>
            Advertisement
          </Text>

          <Text style={styles.cardSubtitle}>
            Promote your business, products or services.
          </Text>

        </Pressable>

      </View>

    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  subtitle: {
    marginTop: SPACING.sm,

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    lineHeight: 22,
  },

  actions: {
    marginTop: SPACING.xl,

    gap: SPACING.md,
  },

  card: {
    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: 22,

    padding: SPACING.lg,
  },

  cardTitle: {
    fontSize: TYPOGRAPHY.body,

    fontWeight: "700",

    color: COLORS.textPrimary,
  },

  cardSubtitle: {
    marginTop: SPACING.xs,

    fontSize: TYPOGRAPHY.caption,

    color: COLORS.textSecondary,

    lineHeight: 18,
  },
});