import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authContextType, authContext } from "../store/auth-context";

function WelcomeScreen() {
  console.log('welcome screen is here')
  const [fetchMessage, setFetchMessage] = useState("");
  const { token } = useContext<authContextType>(authContext);

  useEffect(() => {
    // axios
    //   .get(
    //     `https://user-authentication-proj-774eb-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`
    //   )
    //   .then((response) => {
    //     setFetchMessage(response.data);
    //   });
  }, [
    // token
  ]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
