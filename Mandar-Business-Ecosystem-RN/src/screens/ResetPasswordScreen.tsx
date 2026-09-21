import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigation,
  useRoute,
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

import {
  resetPassword,
} from "../services/auth.service";

export default function ResetPasswordScreen() {

  const navigation =
    useNavigation<any>();

  const insets =
    useSafeAreaInsets();

    const route =
  useRoute<any>();

const email =
  route.params?.email;

const otp =
  route.params?.otp;

  const [
    password,

    setPassword,

  ] = useState("");

  const [
    confirmPassword,

    setConfirmPassword,

  ] = useState("");

  const [
    updating,

    setUpdating,

  ] = useState(false);

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const passwordValid =
    useMemo(() => {

      return (
        password.length >= 8
      );

    }, [password]);

  const passwordsMatch =
    useMemo(() => {

      return (
        password ===
          confirmPassword &&
        confirmPassword.length > 0
      );

    }, [
      password,
      confirmPassword,
    ]);

  const canSubmit =
    passwordValid &&
    passwordsMatch;

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading password reset..."
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
          title="Unable to reset password"

          description="Something went wrong while updating your password."

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
          title="Reset Password"

          subtitle="Create a new secure password for your business account."
        />

        {/* INFO */}
        <View style={styles.infoCard}>

          <Text style={styles.infoText}>

            Your password reset request
            has been verified through
            your registered email.

          </Text>

        </View>

        {/* FORM */}
        <View style={styles.form}>

          <PrimaryInput
            value={password}

            onChangeText={
              setPassword
            }

            placeholder="New Password"

            secureTextEntry

            autoCapitalize="none"
          />

          <PrimaryInput
            value={
              confirmPassword
            }

            onChangeText={
              setConfirmPassword
            }

            placeholder="Confirm Password"

            secureTextEntry

            autoCapitalize="none"
          />

        </View>

        {/* VALIDATION */}
        <View
          style={
            styles.validationWrapper
          }
        >

          <Text
            style={[

              styles.validationText,

              passwordValid &&
                styles.validText,

            ]}
          >

            • Minimum 8 characters

          </Text>

          <Text
            style={[

              styles.validationText,

              passwordsMatch &&
                styles.validText,

            ]}
          >

            • Passwords match

          </Text>

        </View>

        {/* PASSWORD NOTE */}
        <View style={styles.noteWrapper}>

          <Text style={styles.noteText}>

            Use at least 8 characters
            including letters and
            numbers for better security.

          </Text>

        </View>

        {/* ACTION */}
        <View style={styles.bottomSection}>

          <PrimaryButton
            text={
              updating
                ? "Updating..."
                : "Update Password"
            }

            disabled={
              !canSubmit ||
              updating
            }

            onPress={async () => {

  try {

    if (!canSubmit)
      return;

    setUpdating(true);

    const response =
      await resetPassword(

        email,

        otp,

        password
      );

    console.log(
      response
    );

    alert(
      "Password updated successfully"
    );

    navigation.navigate(
      "Login"
    );

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    alert(

      error?.response?.data
        ?.message ||

      "Password reset failed"
    );

  } finally {

    setUpdating(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.goBack()
            }

            style={styles.backButton}
          >

            <Text style={styles.backText}>

              Back

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

  form: {
    marginTop:
      SPACING.xl,

    gap:
      SPACING.md,
  },

  validationWrapper: {
    marginTop:
      SPACING.md,

    gap:
      SPACING.xs,
  },

  validationText: {
    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textMuted,
  },

  validText: {
    color:
      COLORS.success,
  },

  noteWrapper: {
    marginTop:
      SPACING.sm,
  },

  noteText: {
    fontSize: 12,

    lineHeight: 22,

    color:
      COLORS.textMuted,
  },

  bottomSection: {
    marginTop:
      SPACING.xxxl,
  },

  backButton: {
    marginTop:
      SPACING.lg,

    alignItems: "center",
  },

  backText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

});