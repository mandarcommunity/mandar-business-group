import "react-native-gesture-handler";

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