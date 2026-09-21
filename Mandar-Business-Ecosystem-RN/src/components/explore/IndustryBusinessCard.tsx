import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  MessageCircleMore,
  Share2,
} from "lucide-react-native";

import ProductPreviewCard from "./ProductPreviewCard";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface Product {
  id: string;

  name: string;

  image: string;
}

interface IndustryBusinessCardProps {

  businessName: string;

  ownerName: string;

  location: string;

  description: string;

  image: string;

  verified?: boolean;

  products: Product[];

  onCatalogPress?: () => void;

  onChatPress?: () => void;

  onSharePress?: () => void;
}

export default function IndustryBusinessCard({
  businessName,
  ownerName,
  location,
  description,
  image,
  verified,
  products,
  onCatalogPress,
  onChatPress,
  onSharePress,
}: IndustryBusinessCardProps) {

  return (
    <View style={styles.card}>

      {/* TOP */}
      <View style={styles.topSection}>

        {/* IMAGE */}
        <Image
          source={{ uri: image }}
          style={styles.businessImage}
        />

        {/* INFO */}
        <View style={styles.infoSection}>

          {/* BUSINESS */}
          <View style={styles.businessRow}>

            <Text
              numberOfLines={1}
              style={styles.businessName}
            >
              {businessName}
            </Text>

            {verified && (

              <BadgeCheck
                size={16}
                color="#2E8B57"
              />

            )}

          </View>

          {/* OWNER */}
          <Text
            numberOfLines={1}
            style={styles.ownerName}
          >
            by {ownerName}
          </Text>

          {/* LOCATION */}
          <View style={styles.locationRow}>

            <MapPin
              size={14}
              color={
                COLORS.textSecondary
              }
            />

            <Text
              numberOfLines={1}
              style={styles.location}
            >
              {location}
            </Text>

          </View>

        </View>

      </View>

      {/* DESCRIPTION */}
      <Text
        numberOfLines={3}
        style={styles.description}
      >
        {description}
      </Text>

      {/* PRODUCTS */}
      <View style={styles.productsSection}>

        <View style={styles.productsHeader}>

          <Text style={styles.productsTitle}>
            Popular Products
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onCatalogPress}
            style={styles.catalogButton}
          >

            <Text style={styles.catalogButtonText}>
              Visit Catalog
            </Text>

            <ChevronRight
              size={16}
              color={COLORS.accent}
            />

          </TouchableOpacity>

        </View>

        {/* PRODUCTS LIST */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >

          {products.map(
            (product) => (

              <ProductPreviewCard
                key={product.id}
                image={product.image}
                name={product.name}
              />

            )
          )}

        </ScrollView>

      </View>

      {/* ACTIONS */}
      <View style={styles.actionsRow}>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onChatPress}
          style={styles.primaryAction}
        >

          <MessageCircleMore
            size={18}
            color={COLORS.white}
          />

          <Text style={styles.primaryActionText}>
            Chat
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onSharePress}
          style={styles.secondaryAction}
        >

          <Share2
            size={18}
            color={COLORS.textPrimary}
          />

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: 30,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding: SPACING.lg,
  },

  topSection: {
    flexDirection: "row",

    alignItems: "center",
  },

  businessImage: {
    width: 72,

    height: 72,

    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  infoSection: {
    flex: 1,

    marginLeft: SPACING.md,
  },

  businessRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  businessName: {
    flex: 1,

    fontSize: 16,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  ownerName: {
    marginTop: 4,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.accent,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  location: {
    flex: 1,

    marginLeft: 5,

    fontSize: 12,

    color:
      COLORS.textSecondary,
  },

  description: {
    marginTop: SPACING.lg,

    fontSize: 13,

    lineHeight: 20,

    color:
      COLORS.textSecondary,
  },

  productsSection: {
    marginTop: SPACING.xl,
  },

  productsHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: SPACING.md,
  },

  productsTitle: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  catalogButton: {
    flexDirection: "row",

    alignItems: "center",
  },

  catalogButtonText: {
    fontSize: 12,

    fontWeight: "700",

    color: COLORS.accent,
  },

  actionsRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: SPACING.xl,

    gap: SPACING.sm,
  },

  primaryAction: {
    flex: 1,

    height: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.accent,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,
  },

  primaryActionText: {
    fontSize: 14,

    fontWeight: "700",

    color: COLORS.white,
  },

  secondaryAction: {
    width: 52,

    height: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },
});