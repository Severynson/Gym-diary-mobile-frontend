import { useContext, useState } from "react";
import { Alert, View } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import MessageAndRedirectButton from "../components/UI/MessageAndRedirectButton";
import { authContext, authContextType } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  console.log("Signup screen is here");
  const [userInProcesOfCreacting, setUserInProcessOfCreating] =
    useState<boolean>(false);
  const [userCreatedSuccessful, setUserCreatedSuccessful] =
    useState<boolean>(false);

  const authCtx = useContext<authContextType>(authContext);

  async function signupHandler({ email, password }) {
    setUserInProcessOfCreating(true);
    try {
      const wasUserCreatedSuccessful: boolean = await createUser(
        email,
        password
      );
      setUserCreatedSuccessful(wasUserCreatedSuccessful);
      setUserInProcessOfCreating(false);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your input or try again later!"
      );
      setUserCreatedSuccessful(false);
      setUserInProcessOfCreating(false);
    }
  }

  if (userInProcesOfCreacting)
    return <LoadingOverlay message="Creating user..." />;

  if (userCreatedSuccessful)
    return (
      <MessageAndRedirectButton redirectLink="Login" redirectPageName="Login Page">
        User was created successful! Log in now:
      </MessageAndRedirectButton>
    );

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
