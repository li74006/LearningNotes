import { StyleSheet, View, Text } from "react-native";
import Single_Dialogue from "./Single_Dialogue";

export default function ChatRoom() {
  const isSelf = true;

  return (
    <View>
      <Single_Dialogue />
    </View>
  );

  const styles = StyleSheet.create({
    container: {},
  });
}
