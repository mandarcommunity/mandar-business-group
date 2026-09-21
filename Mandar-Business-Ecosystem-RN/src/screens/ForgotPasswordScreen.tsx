import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useState,
} from "react";

import AuthLayout from "../components/auth/AuthLayout";

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
  sendResetOtp,
} from "../services/auth.service";

export default function ForgotPasswordScreen() {

  const navigation =
    useNavigation<any>();

  const [
    email,

    setEmail,

  ] = useState("");

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    submitting,

    setSubmitting,

  ] = useState(false);

  /* LOADING */
  if (isLoading) {

    return (

      <AuthLayout>

        <LoadingState
          title="Preparing password recovery..."
        />

      </AuthLayout>

    );
  }

  /* ERROR */
  if (hasError) {

    return (

      <AuthLayout>

        <ErrorState
          title="Unable to continue"

          description="Something went wrong while processing your request."

          buttonText="Try Again"
        />

      </AuthLayout>

    );
  }

  return (
    <AuthLayout>

      <View style={styles.container}>

        {/* HEADER */}
        <AuthHeader
          title="Forgot Password"

          subtitle="Reset your password securely using your registered email address."
        />

        {/* INFO */}
        <View style={styles.infoCard}>

          <Text style={styles.infoText}>

            Enter your registered
            email address. A secure
            verification code will be
            sent to your email.

          </Text>

        </View>

        {/* FORM */}
        <View>

          <PrimaryInput
  value={email}

  onChangeText={
    setEmail
  }

  placeholder="Registered Email Address"

  keyboardType="email-address"

  autoCapitalize="none"

  underlineColorAndroid="transparent"
/>
          {!!email && (

            <Text
              style={styles.emailPreview}
            >

              Verification code will be sent to:
              {" "}
              {email}

            </Text>

          )}

        </View>

        {/* ACTION */}
        <View style={styles.bottomSection}>

          <PrimaryButton
            text={
              submitting
                ? "Sending..."
                : "Continue"
            }

            disabled={
              !email.trim() ||
              submitting
            }

            onPress={async () => {

  try {

    if (!email.trim())
      return;

    setSubmitting(true);

    const response =
      await sendResetOtp(
        email
      );

    console.log(
      response
    );

    navigation.navigate(

      "OtpVerification",

      {
        email,
      }
    );

  } catch (error: any) {

    console.log(

      error?.response?.data ||

      error
    );

    alert(

      error?.response?.data
        ?.message ||

      "Failed to send OTP"
    );

  } finally {

    setSubmitting(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.navigate(
                "Login"
              )
            }

            style={styles.backButton}
          >

            <Text style={styles.backText}>

              Back to Login

            </Text>

          </Pressable>

        </View>

      </View>

    </AuthLayout>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.xxxl,

    paddingBottom:
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

    marginBottom:
      SPACING.xl,
  },

  infoText: {
    fontSize: 12,

    lineHeight: 22,

    color:
      COLORS.textSecondary,
  },

  emailPreview: {
    marginTop:
      SPACING.sm,

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.accent,
  },

  bottomSection: {
    marginTop: "auto",
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