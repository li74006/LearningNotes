import { FlatList, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import Single_Dialogue from "./Single_Text";

import ChatRoomData from "../assets/dummy-data/Chats";
import Single_ChatInput from "./Single_ChatInput";

export default function ChatRoom() {
  const isSelf = true;
  const styles = StyleSheet.create({
    container: {
      height: "100%",
    },
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={102}>
      <View style={styles.container}>
        <FlatList
          data={ChatRoomData.messages}
          renderItem={({ item }) => <Single_Dialogue data_Dialogue={item} />}
          // inverted // 反转 FlatList 数据
        />
        <Single_ChatInput />
      </View>
    </KeyboardAvoidingView>
  );
}
