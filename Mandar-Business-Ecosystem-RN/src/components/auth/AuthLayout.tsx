import {
  ReactNode,
} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  COLORS,
} from "../../theme";

interface AuthLayoutProps {

  children: ReactNode;
}

export default function AuthLayout({

  children,

}: AuthLayoutProps) {

  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <KeyboardAvoidingView
        style={styles.flex}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }

        keyboardVerticalOffset={
          20
        }
      >

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          keyboardShouldPersistTaps="handled"

          keyboardDismissMode="interactive"

          contentContainerStyle={
            styles.content
          }
        >

          {children}

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  flex: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
  },

});