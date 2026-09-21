import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ProductImageUpload from "../components/products/ProductImageUpload";

import ProfileSectionCard from "../components/profile/ProfileSectionCard";

import PrimaryButton from "../components/shared/PrimaryButton";

import PrimaryInput from "../components/shared/PrimaryInput";

import CharacterCountInput from "../components/shared/CharacterCountInput";

import MultiSelectDropdown
from "../components/shared/MultiSelectSearchDropdown";

import {
  COLORS,
  SPACING,
} from "../theme";

import {
  INDUSTRIES,
} from "../constants/industries";
import { createProduct } from "../services/product.service";
import { getMyBusiness } from "../services/business.service";
import { getAccessToken } from "../utils/storage";

export default function AddProductScreen() {

  const navigation =
    useNavigation<any>();

  const insets =
    useSafeAreaInsets();

  const [
    productName,

    setProductName,

  ] = useState("");

  const [
    industryInput,

    setIndustryInput,

  ] = useState("");

  const [
    selectedIndustries,

    setSelectedIndustries,

  ] = useState<ProductImage[]>([]);

  const [
    description,

    setDescription,

  ] = useState("");

  const [
    loading,

    setLoading,

  ] = useState(false);

  const [images, setImages] = useState<ProductImage[]>([]);

  const [
    error,
    setError,
  ] = useState("");

  const descriptionLimit = 500;

  async function handleAddProduct() {

    if (!productName.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!selectedIndustries.length) {
      setError("Please select at least one industry.");
      return;
    }

    if (!description.trim()) {
      setError("Product description is required.");
      return;
    }

    if (!images.length) {
      setError("Please select at least one product image.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = await getAccessToken();
      const myBusinessRes = await getMyBusiness(token as string);
      const myBusiness = myBusinessRes.data;

      if (!myBusiness || !myBusiness.id) {
        setError("You must have a business profile to add products.");
        setLoading(false);
        return;
      }

      const productData = {
        name: productName,
        category: selectedIndustries[0],
        description,
        business_id: myBusiness.id,
        images: images.map(i => i.uri),
          base64Images: images.map(i => i.base64).filter(Boolean), 
      };

      await createProduct(token as string, productData);
      
      setLoading(false);
      navigation.goBack();
    } catch (err: any) {
      console.log("Error adding product:", err);
      setError("Failed to add product. Please try again.");
      setLoading(false);
    }
  }

  return (

    <SafeAreaView
      edges={["top"]}
      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>

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
            color={
              COLORS.textPrimary
            }
          />

        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >

          Add Product

        </Text>

      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={[

          styles.contentContainer,

          {
            paddingBottom:
              insets.bottom +
              120,
          },

        ]}
      >

        <ProfileSectionCard
          title="Product Details"

          subtitle="Add a product visible in search and business discovery."
        >

          {/* IMAGE */}
          <ProductImageUpload images={images} onChange={setImages} />

          {/* PRODUCT NAME */}
          <PrimaryInput
            value={productName}

            onChangeText={
              setProductName
            }

            placeholder="Product Name"
          />

          {/* INDUSTRIES */}
          <MultiSelectDropdown
            label="Industries"

            placeholder="Search Industries"

            data={INDUSTRIES}

            value={industryInput}

            onChangeValue={
              setIndustryInput
            }

            selectedItems={
              selectedIndustries
            }

            onChangeSelectedItems={
              setSelectedIndustries
            }
          />

          {/* DESCRIPTION */}
          <CharacterCountInput
            label="Product Description"
            value={description}
            onChangeText={setDescription}
            limit={descriptionLimit}
            multiline
            numberOfLines={4}
            placeholder="Write product description..."
          />

          {/* ERROR */}
          {!!error && (

            <Text
              style={
                styles.errorText
              }
            >

              {error}

            </Text>

          )}

        </ProfileSectionCard>

      </ScrollView>

      {/* BOTTOM ACTION */}
      <View
        style={[

          styles.bottomAction,

          {
            paddingBottom:
              insets.bottom +
              SPACING.lg,
          },

        ]}
      >

        <PrimaryButton
          text={
            loading
              ? "Adding..."
              : "Add Product"
          }

          onPress={
            handleAddProduct
          }

          disabled={loading}
        />

      </View>

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
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.md,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 16,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent:
      "center",

    marginRight:
      SPACING.md,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  contentContainer: {
    padding:
      SPACING.lg,
  },

  bottomAction: {
    position: "absolute",

    left: 0,

    right: 0,

    bottom: 0,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,
  },

  errorText: {
    marginTop: 4,

    fontSize: 12,

    fontWeight: "600",

    color: "#ef4444",
  },

});