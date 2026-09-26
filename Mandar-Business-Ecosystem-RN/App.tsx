import "react-native-gesture-handler";

import { Text, TextInput } from "react-native";

// Disable global font scaling to prevent UI breakage on devices with large system fonts
// @ts-ignore
if (Text.defaultProps == null) Text.defaultProps = {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;


import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

import RootNavigator
from "./src/navigation/RootNavigator";

import { AuthProvider } from "./src/context/AuthContext";
import { usePushNotifications } from "./src/hooks/usePushNotifications";

export default function App() {
  usePushNotifications();

  return (

    <SafeAreaProvider>

      <AuthProvider>

        <RootNavigator />

      </AuthProvider>

    </SafeAreaProvider>

  );

}