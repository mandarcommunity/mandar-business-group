import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import {
  ArrowLeft,
} from "lucide-react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { updateProduct } from "../services/product.service";
import { getAccessToken } from "../utils/storage";

import ProductImageUpload from "../components/products/ProductImageUpload";
import ProfileSectionCard from "../components/profile/ProfileSectionCard";
import PrimaryButton from "../components/shared/PrimaryButton";
import MultiSelectDropdown from "../components/shared/MultiSelectSearchDropdown";
import CharacterCountInput from "../components/shared/CharacterCountInput";
import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";
import { useIndustries } from "../hooks/useIndustries";

export default function EditProductScreen() {
  const { industries: INDUSTRIES } = useIndustries();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const product = route.params?.product;

  const [productName, setProductName] = useState(product?.name || "");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(product?.category ? [product?.category] : []);
  const [industryInput, setIndustryInput] = useState("");
  const [description, setDescription] = useState(product?.description || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<ProductImage[]>((product?.images || []).map((uri: string) => ({ uri })));

  async function handleEditProduct() {
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
    setSaving(true);

    try {
      const token = await getAccessToken();
      const productData = {
        name: productName,
        category: selectedIndustries[0],
        description,
        images: images.map(i => i.uri),
        base64Images: images.map(i => i.base64).filter(Boolean),
      };

      await updateProduct(token as string, product.id, productData);
      
      setSaving(false);
      navigation.goBack();
    } catch (err: any) {
      console.log("Error updating product:", err);
      setError("Failed to update product. Please try again.");
      setSaving(false);
    }
  }

  const [hasError] = useState(false);

  const productNameLimit = 120;
  const descriptionLimit = 500;

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Unable to load product"

          description="Please try again after some time."

          buttonText="Retry"
        />

      </SafeAreaView>

    );
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

          style={styles.backButton}
        >

          <ArrowLeft
            size={20}
            color={
              COLORS.textPrimary
            }
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>

          Edit Product

        </Text>

      </View>

      {/* CONTENT */}
      <KeyboardAvoidingView
        style={styles.flex}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }

        keyboardVerticalOffset={
          Platform.OS === "ios"
            ? 0
            : 20
        }
      >

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          automaticallyAdjustKeyboardInsets

          keyboardShouldPersistTaps="handled"

          keyboardDismissMode="interactive"

          contentInsetAdjustmentBehavior="always"

          contentContainerStyle={
            styles.contentContainer
          }
        >

          <ProfileSectionCard
            title="Product Details"

            subtitle="Update your business product information."
          >

            {/* IMAGES */}
            <ProductImageUpload images={images} onChange={setImages} />

            {/* PRODUCT NAME */}
            <CharacterCountInput
              label="Product Name"

              value={productName}

              onChangeText={
                setProductName
              }

              limit={
                productNameLimit
              }

              warningLimit={100}

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

              onChangeText={
                setDescription
              }

              limit={
                descriptionLimit
              }

              warningLimit={850}

              multiline

              placeholder="Write product description..."
            />

          </ProfileSectionCard>

          {/* BUTTON */}
          <View
            style={
              styles.buttonWrapper
            }
          >

            <PrimaryButton
              text={
                saving
                  ? "Saving..."
                  : "Save Product"
              }

              disabled={
                saving ||
                !productName.trim() ||
                selectedIndustries.length === 0 ||
                !description.trim()
              }

              onPress={handleEditProduct}
            />

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

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

    justifyContent: "center",

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

    paddingBottom:
      140,
  },

  buttonWrapper: {
    paddingTop:
      SPACING.lg,

    paddingBottom:
      80,
  },

});