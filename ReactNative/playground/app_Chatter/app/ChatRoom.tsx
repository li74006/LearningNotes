import { FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import Single_Dialogue from "../components/Single_Text";
import { Stack } from "expo-router";

import { HeaderHeightContext } from "@react-navigation/elements";

import ChatRoomData from "../assets/dummy-data/Chats";
import Single_ChatInput from "../components/Single_ChatInput";
import Single_HomeHeader from "../components/Single_HomeHeader";

export default function ChatRoom() {
  const styles = StyleSheet.create({
    container: {
      height: "100%",
    },
  });

  const route = useRoute();

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerTitle: Single_HomeHeader,
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={102}
      >
        <FlatList
          data={ChatRoomData.messages}
          renderItem={({ item }) => <Single_Dialogue data_Dialogue={item} />}
          // inverted // 反转 FlatList 数据
        />
        <Single_ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
