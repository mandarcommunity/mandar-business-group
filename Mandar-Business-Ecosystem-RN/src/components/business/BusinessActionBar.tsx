import {
  Linking,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Phone,
  Share2,
  ShoppingBag,
} from "lucide-react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface BusinessActionBarProps {

  phone: string;

  whatsapp: string;

  businessName?: string;
  businessId?: string;
  slug?: string;
  onCatalogPress?: () => void;
}

export default function BusinessActionBar({

  phone,

  whatsapp,

  businessName,

  onCatalogPress,
  businessId,
  slug,
}: BusinessActionBarProps) {

  /* CALL */
  const handleCall = async () => {

    try {

      await Linking.openURL(
        `tel:${phone}`
      );

    } catch (error) {

      console.log(
        "Call failed",
        error
      );
    }
  };

  /* WHATSAPP */
  const handleWhatsApp =
    async () => {

      try {

        const formattedNumber =
          whatsapp.replace(
            /\s+/g,
            ""
          );

        await Linking.openURL(
          `https://wa.me/${formattedNumber}`
        );

      } catch (error) {

        console.log(
          "WhatsApp failed",
          error
        );
      }
    };

  /* SHARE */
  const handleShare =
    async () => {

      try {

        await Share.share({

          message: `Check out ${businessName || "this business"}, Contact details: Phone: ${phone || "N/A"}, WhatsApp: ${whatsapp || "N/A"} on Mandar Community Ecosystem!\n\nhttps://mandarcommunity.in/biz/${slug || businessId}` /* Note: using businessId here as slug might not be available in props yet, we should use slug if we have it, else fallback to id */,

        });

      } catch (error) {

        console.log(
          "Share failed",
          error
        );
      }
    };

  return (

    <View style={styles.container}>

      {/* CALL */}
      <TouchableOpacity
        activeOpacity={0.9}

        onPress={handleCall}

        style={styles.iconButton}
      >

        <Phone
          size={20}
          color={
            COLORS.textPrimary
          }
        />

      </TouchableOpacity>

      {/* WHATSAPP */}
      <TouchableOpacity
        activeOpacity={0.9}

        onPress={handleWhatsApp}

        style={styles.iconButton}
      >

        <FontAwesome
  name="whatsapp"
  size={22}
  color="#25D366"
/>

      </TouchableOpacity>

      {/* CATALOG */}
      <TouchableOpacity
        activeOpacity={0.9}

        onPress={onCatalogPress}

        style={styles.iconButton}
      >

        <ShoppingBag
          size={20}
          color={
            COLORS.textPrimary
          }
        />

      </TouchableOpacity>

      {/* SHARE */}
      <TouchableOpacity
        activeOpacity={0.9}

        onPress={handleShare}

        style={styles.iconButton}
      >

        <Share2
          size={20}
          color={
            COLORS.textPrimary
          }
        />

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.md,

    width: "100%",
  },

  iconButton: {
    flex: 1,

    height: 52,

    borderRadius: 16,

    backgroundColor:
      COLORS.surfaceSecondary,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",
  },
});