import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import IconButton from "./components/UI/IconButton";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthContextProvider, { authContext } from "./store/auth-context";

preventAutoHideAsync();

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator();

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = (): JSX.Element => {
  const { logout } = useContext(authContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerLeft: ({ tintColor: color }) => (
            <IconButton
              icon="arrow-back"
              {...{ color }}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

const Root: FC = (): JSX.Element => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const { authenticate } = useContext(authContext);

  useEffect(() => {
    (async function etchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      storedToken && authenticate(storedToken);
      setAppIsReady(true);
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
};

function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

export default App;
