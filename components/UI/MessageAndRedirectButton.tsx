import { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface MessageAndRedirectButtonProps {
  children: string | JSX.Element | ReactNode;
  redirectLink: string;
  redirectPageName?: string;
}

export default function MessageAndRedirectButton({
  children,
  redirectLink,
  redirectPageName,
}: MessageAndRedirectButtonProps): JSX.Element {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

  function goToSomePageHandler() {
    navigate(redirectLink);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.message}>{children}</Text>
        <Button onPress={goToSomePageHandler}>
          <>
            <Text>
              Go to {redirectPageName || redirectLink}
              <Ionicons name="arrow-forward" />
            </Text>
          </>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
