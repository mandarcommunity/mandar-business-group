import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
  Share,
} from "react-native";

import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ArrowLeft, Plus } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import ProductCard from "../components/products/ProductCard";
import ProductUsageCard from "../components/products/ProductUsageCard";
import EmptyState from "../components/states/EmptyState";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";

import { COLORS, SPACING } from "../theme";
import { getAccessToken, getUser } from "../utils/storage";
import { getMyProducts, deleteProduct } from "../services/product.service";

export default function MyProductsScreen() {
  const navigation = useNavigation<any>();

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addPressed, setAddPressed] = useState(false);
  const [productLimit, setProductLimit] = useState(15);

  const fetchProducts = async () => {
    try {
      const token = await getAccessToken();
      const user = await getUser();
      if (user?.product_limit) {
        setProductLimit(user.product_limit);
      }
      
      const res = await getMyProducts(token as string);
      setProducts(res.data.data);
      setHasError(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingId(id);
              const token = await getAccessToken();
              await deleteProduct(token as string, id);
              setProducts((prev) => prev.filter((p) => p.id !== id));
            } catch (error) {
              console.log("Error deleting product:", error);
              Alert.alert("Error", "Could not delete product");
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  /* LOADING */
  if (isLoading && !isRefreshing) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <LoadingState title="Loading products..." />
      </SafeAreaView>
    );
  }

  /* ERROR */
if (hasError) {

return (

  <SafeAreaView
    edges={["top"]}
    style={styles.container}
  >

    <ErrorState
      title="Unable to load products"

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

  {/* BLUE HEADER */}
  <View style={styles.header}>

    {/* LEFT */}
    <View style={styles.headerLeft}>

      <TouchableOpacity
        activeOpacity={0.85}

        onPress={() =>
          navigation.goBack()
        }

        style={styles.backButton}
      >

        <ArrowLeft
          size={20}
          color={COLORS.white}
        />

      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        My Products
      </Text>

    </View>

    {/* ADD BUTTON */}
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        if (products.length >= productLimit) {
          Alert.alert("Limit Reached", `You have reached the maximum limit of ${productLimit} products.`);
          return;
        }
        setAddPressed(true);
        navigation.navigate("AddProduct");
        setTimeout(() => setAddPressed(false), 200);
      }}

      style={[

        styles.addButton,

        addPressed &&
          styles.activeAddButton,

      ]}
    >

      <Plus
        size={20}
        color={COLORS.white}
      />

    </TouchableOpacity>

  </View>

  {/* CONTENT WRAPPER */}
  <View style={styles.contentWrapper}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.primary}
          colors={[COLORS.primary]}
        />
      }
    >

      <View style={{ marginBottom: SPACING.xl }}>
        <ProductUsageCard used={products.length} limit={productLimit} />
      </View>

      {/* EMPTY */}
      {!products.length ? (

        <View
          style={
            styles.emptyWrapper
          }
        >

          <EmptyState
            title="No products added"

            description="Add your first product to showcase your business catalog."
          />

        </View>

      ) : (

        <>
          {products.map(
            (product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                images={product.images}
                name={product.name}
                category={product.category}

                description={
                  product.description
                }

                onShare={async () => {
                  try {
                    await Share.share({ message: `Check out my product ${item.name} on Mandar Community Ecosystem!\n\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });
                  } catch (error: any) {
                    Alert.alert(error.message);
                  }
                }}

                onEdit={() =>
                  navigation.navigate("EditProduct", { product })
                }

                onDelete={() => handleDelete(product.id)}
              />

            )
          )}

          {deletingId && (

            <Text
              style={
                styles.deletingText
              }
            >

              Removing product...

            </Text>

          )}

        </>

      )}

    </ScrollView>

  </View>

</SafeAreaView>

);
}

const styles = StyleSheet.create({

container: {
flex: 1,

backgroundColor:
  COLORS.primary,

},

header: {
flexDirection: "row",

alignItems: "center",

justifyContent:
  "space-between",

paddingHorizontal:
  SPACING.lg,

paddingTop:
  SPACING.md,

paddingBottom:
  SPACING.lg,

backgroundColor:
  COLORS.primary,

},

headerLeft: {
flexDirection: "row",

alignItems: "center",

},

backButton: {
width: 42,

height: 42,

borderRadius: 16,

backgroundColor:
  "rgba(255,255,255,0.12)",

alignItems: "center",

justifyContent: "center",

marginRight:
  SPACING.md,

},

headerTitle: {
fontSize: 18,

fontWeight: "700",

color:
  COLORS.white,

},

addButton: {
width: 42,

height: 42,

borderRadius: 16,

backgroundColor:
  "rgba(255,255,255,0.12)",

alignItems: "center",

justifyContent: "center",

},

activeAddButton: {
transform: [
{
scale: 0.92,
},
],

opacity: 0.85,

},

contentWrapper: {
flex: 1,

backgroundColor:
  COLORS.background,

borderTopLeftRadius: 26,

borderTopRightRadius: 26,

overflow: "hidden",

},

contentContainer: {
padding: SPACING.lg,

paddingBottom:
  SPACING.lg,

gap: SPACING.md,

flexGrow: 1,

},

emptyWrapper: {
flex: 1,

justifyContent:
  "center",

paddingTop:
  SPACING.xxxl,

},

deletingText: {
textAlign: "center",

fontSize: 12,

fontWeight: "600",

color:
  COLORS.textSecondary,

marginTop:
  SPACING.sm,

},
});