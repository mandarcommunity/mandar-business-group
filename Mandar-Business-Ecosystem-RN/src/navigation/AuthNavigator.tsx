import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen
from "../screens/LoginScreen";

import SignupScreen
from "../screens/SignupScreen";

import SetupBusinessScreen
from "../screens/SetupBusinessScreen";

import ForgotPasswordScreen
from "../screens/ForgotPasswordScreen";

import OtpVerificationScreen
from "../screens/OtpVerificationScreen";

import ResetPasswordScreen
from "../screens/ResetPasswordScreen";

const Stack =
  createNativeStackNavigator();

export default function AuthNavigator() {

  return (

    <Stack.Navigator

      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen

        name="Login"

        component={
          LoginScreen
        }
      />

      <Stack.Screen

        name="Signup"

        component={
          SignupScreen
        }
      />

      <Stack.Screen

        name="SetupBusiness"

        component={
          SetupBusinessScreen
        }
      />

      <Stack.Screen

        name="ForgotPassword"

        component={
          ForgotPasswordScreen
        }
      />

      <Stack.Screen

        name="OtpVerification"

        component={
          OtpVerificationScreen
        }
      />

      <Stack.Screen

        name="ResetPassword"

        component={
          ResetPasswordScreen
        }
      />

    </Stack.Navigator>
  );
}