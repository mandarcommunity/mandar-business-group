import { Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useState,
} from "react";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";

import AuthHeader from "../components/auth/AuthHeader";

import PrimaryInput from "../components/auth/PrimaryInput";

import PrimaryButton from "../components/auth/PrimaryButton";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import { loginUser }
from "../services/auth.service";

import {
  useAuth,
} from "../context/AuthContext";

export default function LoginScreen() {

  const navigation =
    useNavigation<any>();

  const insets =
    useSafeAreaInsets();

    const { login } =
  useAuth();

  const [
    email,

    setEmail,

  ] = useState("");

  const [
    password,

    setPassword,

  ] = useState("");

  const [
    isLoading,

    setIsLoading,

  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length >= 6;

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Signing in..."
        />

      </SafeAreaView>

    );

  }

  /* ERROR */
  if (hasError) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ErrorState
          title="Login failed"

          description="Please check your credentials and try again."

          buttonText="Retry"
        />

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        keyboardDismissMode="interactive"

        enableOnAndroid

        enableAutomaticScroll

        extraScrollHeight={40}

        keyboardOpeningTime={0}

        contentContainerStyle={[

          styles.content,

          {
            paddingBottom:
              insets.bottom +
              40,
          },

        ]}
      >

        {/* HEADER */}
        <AuthHeader
          title="Welcome to Mandar Community"

          subtitle="The exclusive B2B network for the Mandar Jain Sangh."
        />

        {/* FORM */}
        <View
          style={styles.form}
        >

          <PrimaryInput
            value={email}

            onChangeText={
              setEmail
            }

            placeholder="Mobile Number or Email"

            keyboardType="email-address"

            autoCapitalize="none"
          />

          <PrimaryInput
            value={password}

            onChangeText={
              setPassword
            }

            placeholder="Password"

            secureTextEntry

            autoCapitalize="none"
          />

        </View>

        {/* FORGOT */}
        <Pressable
          onPress={() =>
            navigation.navigate(
              "ForgotPassword"
            )
          }

          style={styles.forgotWrapper}
        >

          <Text style={styles.forgotText}>

            Forgot Password?

          </Text>

        </Pressable>

        {/* INFO */}
        <View style={styles.infoCard}>

          <Text style={styles.infoText}>

            Password recovery and
            account verification are
            managed securely through
            your registered email.

          </Text>

        </View>

        {/* ACTIONS */}
        <View style={styles.bottomSection}>

          <PrimaryButton
            text="Login"

            disabled={!isFormValid}

            onPress={async () => {

  try {

    if (!isFormValid)
      return;

    setIsLoading(true);

    const response =
      await loginUser({

        email,

        password,
      });

    await login({

  user:
    response.data.user,

  accessToken:
    response.data
      .accessToken,

  refreshToken:
    response.data
      .refreshToken,
});

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    Alert.alert("Login Failed", 

      error?.response?.data
        ?.message ||

      "Login failed"
    );

  } finally {

    setIsLoading(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.navigate(
                "Signup"
              )
            }

            style={styles.signupButton}
          >

            <Text style={styles.signupText}>

              Create New Account

            </Text>

          </Pressable>

        </View>

      </KeyboardAwareScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  content: {
    flexGrow: 1,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.xl,
  },

  form: {
    marginTop:
      SPACING.xl,

    gap: SPACING.md,
  },

  forgotWrapper: {
    alignSelf: "flex-end",

    marginTop:
      SPACING.sm,
  },

  forgotText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

  infoCard: {
    borderRadius: 18,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding:
      SPACING.lg,

    marginTop:
      SPACING.xl,
  },

  infoText: {
    fontSize: 12,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  bottomSection: {
    marginTop:
      SPACING.xxxl,
  },

  signupButton: {
    marginTop:
      SPACING.lg,

    alignItems: "center",
  },

  signupText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

});