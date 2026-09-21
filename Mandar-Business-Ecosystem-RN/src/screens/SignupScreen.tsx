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

import { signupUser }
from "../services/auth.service";

import {

  saveAccessToken,

  saveRefreshToken,

  saveUser,

} from "../utils/storage";

export default function SignupScreen() {

  const navigation =
    useNavigation<any>();

  const insets =
    useSafeAreaInsets();

  const [
    fullName,

    setFullName,

  ] = useState("");

  const [
    mobile,

    setMobile,

  ] = useState("");

  const [
    email,

    setEmail,

  ] = useState("");

  const [
    password,

    setPassword,

  ] = useState("");

  const [
    inviteCode,

    setInviteCode,

  ] = useState("");

  const [
    creating,

    setCreating,

  ] = useState(false);

  const [
    isLoading,
  ] = useState(false);

  const [
    hasError,
  ] = useState(false);

  const emailValid =
    useMemo(() => {

      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );

    }, [email]);

  const passwordValid =
    useMemo(() => {

      return (
        password.length >= 8
      );

    }, [password]);

  const mobileValid =
    useMemo(() => {

      return (
        mobile.length === 10
      );

    }, [mobile]);

  const inviteCodeValid =
    inviteCode.trim().length >
    0;

  const canContinue =
    fullName.trim().length >
      2 &&
    emailValid &&
    passwordValid &&
    mobileValid &&
    inviteCodeValid;

  /* LOADING */
  if (isLoading) {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <LoadingState
          title="Preparing signup..."
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
          title="Unable to create account"

          description="Something went wrong while creating your account."

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
          title="Start Your Journey Now"

          subtitle="Build your trusted business identity and connect with verified businesses."
        />

        {/* FORM */}
        <View style={styles.form}>

          {/* FULL NAME */}
          <PrimaryInput
            value={fullName}

            onChangeText={
              setFullName
            }

            placeholder="Full Name"

            autoCapitalize="words"
          />

          {/* MOBILE */}
          <PrimaryInput
            value={
              mobile
                ? `+91 ${mobile}`
                : "+91 "
            }

            onChangeText={(
              text
            ) => {

              const formatted =
                text
                  .replace(
                    "+91",
                    ""
                  )
                  .replace(
                    /[^0-9]/g,
                    ""
                  );

              if (
                formatted.length <= 10
              ) {

                setMobile(
                  formatted
                );
              }
            }}

            placeholder="Mobile Number"

            keyboardType="phone-pad"
          />

          {!mobileValid &&
            mobile.length > 0 && (

            <Text
              style={
                styles.errorText
              }
            >

              Enter valid 10 digit mobile number

            </Text>

          )}

          {/* EMAIL */}
          <PrimaryInput
            value={email}

            onChangeText={
              setEmail
            }

            placeholder="Email Address"

            keyboardType="email-address"

            autoCapitalize="none"
          />

          {!emailValid &&
            email.length > 0 && (

            <Text
              style={
                styles.errorText
              }
            >

              Enter valid email address

            </Text>

          )}

          {/* PASSWORD */}
          <PrimaryInput
            value={password}

            onChangeText={
              setPassword
            }

            placeholder="Password"

            secureTextEntry

            autoCapitalize="none"
          />

          {password.length > 0 &&
            !passwordValid && (

            <Text
              style={
                styles.errorText
              }
            >

              Password must be at least 8 characters

            </Text>

          )}

          {/* INVITE CODE */}
          <PrimaryInput
            value={inviteCode}

            onChangeText={(
              text
            ) =>

              setInviteCode(
                text.toUpperCase()
              )
            }

            placeholder="Community Invite Code"

            autoCapitalize="characters"
          />

          {!inviteCodeValid &&
            inviteCode.length > 0 && (

            <Text
              style={
                styles.errorText
              }
            >

              Community invite code is required

            </Text>

          )}

          {/* INFO */}
          <View style={styles.infoCard}>

            <Text style={styles.infoText}>

              Your email will be used
              for account verification
              and password recovery.

            </Text>

          </View>

        </View>

        {/* ACTIONS */}
        <View
          style={
            styles.bottomSection
          }
        >

          <PrimaryButton
            text={
              creating
                ? "Creating Account..."
                : "Continue"
            }

            disabled={
              !canContinue ||
              creating
            }

            onPress={async () => {

  try {

    if (!canContinue)
      return;

    setCreating(true);

    const response =
  await signupUser({

    fullName,

    mobile,

    email,

    password,

    inviteCode,
  });

await saveAccessToken(

  response.data
    .accessToken
);

await saveRefreshToken(

  response.data
    .refreshToken
);

await saveUser(

  response.data
    .user
);

navigation.navigate(
  "SetupBusiness"
);

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    alert(

      error?.response?.data
        ?.message ||

      "Signup failed"
    );

  } finally {

    setCreating(false);
  }

}}
          />

          <Pressable
            onPress={() =>
              navigation.navigate(
                "Login"
              )
            }

            style={
              styles.loginButton
            }
          >

            <Text
              style={
                styles.loginText
              }
            >

              Already have an account?

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
      SPACING.lg,

    gap:
      SPACING.md,
  },

  errorText: {
    marginTop:
      -SPACING.xs,

    marginLeft:
      SPACING.sm,

    fontSize: 12,

    lineHeight: 18,

    fontWeight: "600",

    color: "#ef4444",
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
      SPACING.sm,
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

  paddingBottom:
    SPACING.lg,
},

  loginButton: {
    marginTop:
      SPACING.lg,

    alignItems: "center",
  },

  loginText: {
    color:
      COLORS.accent,

    fontSize:
      TYPOGRAPHY.body,

    fontWeight: "600",
  },

});