import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useEffect,
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

import PrimaryButton from "../components/auth/PrimaryButton";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

import {

  verifyResetOtp,

  sendResetOtp,

} from "../services/auth.service";

export default function OtpVerificationScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const insets =
    useSafeAreaInsets();

  const email =
    route.params?.email || "";

  const [otp, setOtp] =
    useState("");

  const [
    resendTimer,

    setResendTimer,

  ] = useState(30);

  const [
    verifying,

    setVerifying,

  ] = useState(false);

  const [
    resending,

    setResending,

  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const [
    isLoading,
  ] = useState(false);

  const [
    otpFocused,

    setOtpFocused,

  ] = useState(false);

  /* TIMER */
  useEffect(() => {

    if (resendTimer <= 0) {
      return;
    }

    const timer =
      setInterval(() => {

        setResendTimer(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [resendTimer]);

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Loading verification..."
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
          title="Verification failed"

          description="Something went wrong while verifying your request."

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
          title="Email Verification"

          subtitle="Enter the verification code sent to your email address."
        />

        {/* INFO */}
        <View style={styles.infoCard}>

          <Text style={styles.infoText}>

            A secure 6-digit
            verification code has
            been sent to:

          </Text>

          {!!email && (

            <Text
              style={styles.emailText}
            >

              {email}

            </Text>

          )}

        </View>

        {/* OTP BOX */}
        <View style={styles.otpWrapper}>

          <View
            style={styles.inputWrapper}
          >

            {/* FAKE PLACEHOLDER */}
            {otp.length === 0 &&
              !otpFocused && (

              <Text
                style={
                  styles.fakePlaceholder
                }
              >

                Enter 6-digit Code

              </Text>

            )}

            <TextInput
              value={otp}

              onChangeText={(
                text
              ) => {

                const formatted =
                  text.replace(
                    /[^0-9]/g,
                    ""
                  );

                if (
                  formatted.length <=
                  6
                ) {

                  setOtp(
                    formatted
                  );
                }
              }}

              onFocus={() =>
                setOtpFocused(
                  true
                )
              }

              onBlur={() =>
                setOtpFocused(
                  false
                )
              }

              keyboardType="number-pad"

              maxLength={6}

              underlineColorAndroid="transparent"

              placeholder=""

              caretHidden={false}

              selectionColor={
                COLORS.accent
              }

              style={[

                styles.otpInput,

                otpFocused &&
                  styles.focusedOtpInput,

                otp.length === 6 &&
                  styles.activeOtpInput,

              ]}
            />

          </View>

          <Text
            style={
              styles.otpCounter
            }
          >

            {otp.length}/6 digits

          </Text>

        </View>

        {/* RESEND */}
        <Pressable
          disabled={
            resendTimer > 0 ||
            resending
          }

          onPress={async () => {

  try {

    setResending(true);

    await sendResetOtp(
      email
    );

    setResendTimer(30);

    alert(
      "OTP resent successfully"
    );

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    alert(

      error?.response?.data
        ?.message ||

      "Failed to resend OTP"
    );

  } finally {

    setResending(false);
  }

}}

          style={
            styles.resendWrapper
          }
        >

          <Text
            style={[

              styles.resendText,

              (
                resendTimer > 0 ||
                resending
              ) &&
                styles.disabledResendText,

            ]}
          >

            {resending
              ? "Sending..."
              : resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : "Resend Code"}

          </Text>

        </Pressable>

        {/* NOTE */}
        <View style={styles.noteWrapper}>

          <Text style={styles.noteText}>

            The verification code
            will expire in a few
            minutes for security
            reasons.

          </Text>

        </View>

        {/* ACTION */}
        <View style={styles.bottomSection}>

          <PrimaryButton
            text={
              verifying
                ? "Verifying..."
                : "Verify Code"
            }

            disabled={
              otp.length !== 6 ||
              verifying
            }

            onPress={async () => {

  try {

    if (otp.length !== 6)
      return;

    setVerifying(true);

    const response =
      await verifyResetOtp(

        email,

        otp
      );

    console.log(
      response
    );

    navigation.navigate(

      "ResetPassword",

      {

        email,

        otp,
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

      "Invalid OTP"
    );

  } finally {

    setVerifying(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.navigate(
                "ForgotPassword"
              )
            }

            style={styles.backButton}
          >

            <Text style={styles.backText}>

              Change Email Address

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

  emailText: {
    marginTop:
      SPACING.sm,

    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.accent,
  },

  otpWrapper: {
    marginTop:
      SPACING.xl,
  },

  inputWrapper: {
    position: "relative",
  },

  fakePlaceholder: {
    position: "absolute",

    alignSelf: "center",

    top: 18,

    fontSize: 16,

    color:
      COLORS.textMuted,

    zIndex: 1,
  },

  otpInput: {
    height: 58,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 18,

    paddingHorizontal:
      SPACING.lg,

    fontSize: 22,

    fontWeight: "700",

    letterSpacing: 8,

    textAlign: "center",

    textAlignVertical:
      "center",

    includeFontPadding:
      false,

    color:
      COLORS.textPrimary,
  },

  focusedOtpInput: {
    borderColor:
      COLORS.accent,
  },

  activeOtpInput: {
    borderColor:
      COLORS.primary,
  },

  otpCounter: {
    marginTop:
      SPACING.sm,

    textAlign: "center",

    fontSize: 12,

    fontWeight: "600",

    color:
      COLORS.textSecondary,
  },

  resendWrapper: {
    marginTop:
      SPACING.lg,

    alignSelf: "center",
  },

  resendText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

  disabledResendText: {
    opacity: 0.5,
  },

  noteWrapper: {
    marginTop:
      SPACING.md,

    alignItems: "center",
  },

  noteText: {
    textAlign: "center",

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