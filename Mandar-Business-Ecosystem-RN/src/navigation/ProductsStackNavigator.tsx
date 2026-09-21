import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import MyProductsScreen from "../screens/MyProductsScreen";

import AddProductScreen from "../screens/AddProductScreen";

import EditProductScreen from "../screens/EditProductScreen";

const Stack =
  createNativeStackNavigator();

export default function ProductsStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation: "fade",
      }}
    >

      <Stack.Screen
        name="MyProductsMain"
        component={MyProductsScreen}
      />

      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
      />

      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
      />

    </Stack.Navigator>
  );
}