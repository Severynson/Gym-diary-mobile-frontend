import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { authContext, authContextType } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  console.log("Login screen is here");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authCtx = useContext<authContextType>(authContext);

  async function loginHandler({ email, password }) {
    console.log("Trying to login at least!");
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      console.log("token is: ", token);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticated(false);
    }
  }

  if (isAuthenticated) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
